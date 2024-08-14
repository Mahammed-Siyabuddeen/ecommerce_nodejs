import { Request, Response, Router } from "express";
import Stripe from "stripe";
import { orderModel } from "../models/order.model";
import { cartItemModel } from "../models/cartItem.model";
import { productModel } from "../models/Product";
import mongoose from "mongoose";
import { orderItemsModel } from "../models/orderItems.model";
import { addressModel } from "../models/address.model";

export const webHook = async (req: Request, res: Response) => {
  console.log('webhook comming');
  const endpointSecrect = 'whsec_47e85aae365be541f520655b2865b40664942b8df4d2eca90a86522c94ba1047'
  const sig = req.headers['stripe-signature'] as string | undefined
  let event: Stripe.Event;

  switch (req.body.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = req.body.data.object;
      // console.log();

      console.log('PaymentIntent was successful!',);
      // Fulfill the purchase, e.g., update the order in your database

      try {
        const { user_id, cart_id, name, street, city, state, country, zipcode, phone } = paymentIntent.metadata;
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
        const orderData = orderModel.create({ user_id, total_amount: paymentIntent.amount, address_id: addressData._id });
        const data = cartItemModel.aggregate([
          {
            $match: { cart_id: new mongoose.Types.ObjectId(cart_id) },
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
              _id: 0,
              product_id: 1,
              quantity: 1,
              price: '$products.price'
            }
          }
        ])
        const Promisedata = await Promise.all([orderData, data, addressData]);
        const orderData_id = Promisedata[0]._id;
        const orderItemData = Promisedata[1].map((item) => { return { ...item, order_id: orderData_id } });
        orderItemsModel.insertMany(orderItemData)
        console.log('hee data', Promisedata);

        res.status(200).json(orderItemData);
      } catch (error) {
        console.log('switch catch error',error);
        
        res.status(400).json(error)
      }

      break;
    // Handle other event types as needed
    default:
      console.log(`Unhandled event type ${req.body.type}`);
  }
}
