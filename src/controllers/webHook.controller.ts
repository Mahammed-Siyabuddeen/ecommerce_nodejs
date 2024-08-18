import { Request, Response, Router } from "express";
import Stripe from "stripe";
import { orderModel } from "../models/order.model";
import { cartItemModel } from "../models/cartItem.model";
import { productModel } from "../models/Product";
import mongoose from "mongoose";
import { orderItemsModel } from "../models/orderItems.model";
import { addressModel } from "../models/address.model";
import { paymentModel } from "../models/payment.model";

export const webHook = async (req: Request, res: Response) => {
  console.log('webhook comming');
  const endpointSecrect = 'whsec_47e85aae365be541f520655b2865b40664942b8df4d2eca90a86522c94ba1047'
  const sig = req.headers['stripe-signature'] as string | undefined
  let event: Stripe.Event;

  switch (req.body.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = req.body.data.object;
      // console.log();

      console.log('PaymentIntent was successful!',paymentIntent.metadata);
      // Fulfill the purchase, e.g., update the order in your database

      try {
        const { user_id, cart_id,cartItem_id, name, street, city, state, country, zipcode, phone } = paymentIntent.metadata;

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

        const paymentData = await paymentModel.create({
          transaction_id: req.body.id,
          amount: paymentIntent.amount,
        })

        let conditionMatch:{_id?:mongoose.Types.ObjectId,cart_id?:mongoose.Types.ObjectId}={};
        if(cartItem_id){
          conditionMatch._id=new mongoose.Types.ObjectId(cartItem_id)
        }else{
          conditionMatch.cart_id=new mongoose.Types.ObjectId(cart_id)

        }
        const cartData =await cartItemModel.aggregate([
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
              _id: 0,
              product_id: 1,
              quantity: 1,
              price: '$products.price',
              total: { $multiply: ["$products.price", "$quantity"] },
            }
          }
        ])

        const promiseData =await Promise.all([addressData,paymentData,cartData])

        console.log('promiseData',promiseData);
        const mainData=promiseData[2]
        const uploadData=await mainData.map(async(item)=>{
          return await orderModel.create({
            user_id:user_id,
            address_id:promiseData[0]._id,
            payment_id:promiseData[1]._id,
            total_amount:item.total
          }).then(async(data)=>{
           return await orderItemsModel.create({
            order_id:data._id,
            price:item.price,
            product_id:item.product_id,
            quantity:item.quantity
           })
            
          })
        })
        const finaledata=await Promise.all(uploadData)
        console.log('finale data',finaledata);
        
      } catch (error) {
        console.log('switch catch error', error);

        res.status(400).json(error)
      }

      break;
    // Handle other event types as needed
    default:
      console.log(`Unhandled event type ${req.body.type}`);
  }
}


