import { Request, Response } from "express";
import Stripe from "stripe";
import { orderModel } from "../models/order.model";
import { cartItemModel } from "../models/cartItem.model";
import { productModel } from "../models/Product";
import mongoose from "mongoose";
import { orderItemsModel } from "../models/orderItems.model";
import { addressModel } from "../models/address.model";
import { paymentModel } from "../models/payment.model";
import { sendEmail } from "../utils/sendEmail.util";
import { CustomerModel } from "../models/customers.model";
import { sendSms } from "../utils/sendSms..util";

export const webHook = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string | undefined
  let event: Stripe.Event;

  switch (req.body.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = req.body.data.object;

      console.log('PaymentIntent was successful!', paymentIntent.metadata);
      // Fulfill the purchase, e.g., update the order in your database

      try {
        const { user_id, cart_id, cartItem_id, name, street, city, state, country, zipcode, phone } = paymentIntent.metadata;

        // insert address data
        const addressData = await addressModel.create({
          name,
          street,
          city,
          state,
          country,
          zipcode,
          phone,
          user_id: new mongoose.Types.ObjectId(user_id)
        })

        // insert payment data
        const paymentData = await paymentModel.create({
          transaction_id: req.body.id,
          amount: paymentIntent.amount,
        })

        let conditionMatch: { _id?: mongoose.Types.ObjectId, cart_id?: mongoose.Types.ObjectId } = {};
        if (cartItem_id) {
          conditionMatch._id = new mongoose.Types.ObjectId(cartItem_id)
        } else {
          conditionMatch.cart_id = new mongoose.Types.ObjectId(cart_id)

        }

        // fecth cartdata through cart_id || cartitem_id
        const cartData = await cartItemModel.aggregate([
          {
            $match: conditionMatch,
          },
          {
            $lookup: {
              from: "products",
              localField: "product_id",
              foreignField: "_id",
              as: "products"
            }
          },
          {
            $unwind: '$products'
          },
          {
            $project: {
              _id: 1,
              product_id: 1,
              quantity: 1,
              price: '$products.price',
              total: { $multiply: ["$products.price", "$quantity"] },
            }
          }
        ])

        const promiseData = await Promise.all([addressData, paymentData, cartData])

        const mainData = promiseData[2]

        // insert arrayof orders and orderitem
        const uploadData = mainData.map(async (item) => {
          const order = await orderModel.create({
            user_id: user_id,
            address_id: promiseData[0]._id,
            payment_id: promiseData[1]._id,
            total_amount: item.total
          })
          await orderItemsModel.create({
            order_id: order._id,
            price: item.price,
            product_id: item.product_id,
            quantity: item.quantity
          });
        })
        await Promise.all(uploadData);

        // change arrayof products quantity
        const promiseUpdateQuanity = mainData.map((item) => productModel.findByIdAndUpdate(
          { _id: item.product_id },
          { $inc: { "stock_quantity": -item.quantity } }
        ))
        await Promise.all(promiseUpdateQuanity);

        // delete items from cartitems
        const promiseToDeleteCartItems = mainData.map((item) => cartItemModel.findByIdAndDelete({ _id: item._id }))

        await Promise.all(promiseToDeleteCartItems)

        // send email to customer
        const email: string | null = await CustomerModel.findById(user_id, { email: 1, _id: 0 })
        if (!email) return;
        await sendEmail({ email: (email), subject: 'Paircare Order' }).catch((err) => console.log('error in emal sending'))
        const d = '+91' + phone.toString()

        // send sms to customer
        sendSms({ phone: d }).then((d) => console.log(d)).catch((err) => { })

      } catch (error) {
        console.log('switch catch error', error);
        res.status(400).json(error)
      }

      break;
    default:
      console.log(`Unhandled event type ${req.body.type}`);
  }
}


