import { Request, Response, Router } from "express";
import Stripe from "stripe";
import { orderModel } from "../models/order.model";
import { cartItemModel } from "../models/cartItem.model";
import { productModel } from "../models/Product";
import mongoose from "mongoose";

export const webHook = async (req: Request, res: Response) => {
  const endpointSecrect = 'whsec_47e85aae365be541f520655b2865b40664942b8df4d2eca90a86522c94ba1047'
  const sig = req.headers['stripe-signature'] as string | undefined
  let event: Stripe.Event;
  // try {
  //   // event = stripe.webhooks.constructEvent(req.body.id, sig as string, endpointSecrect)
  // } catch (error) {
  //   console.log(`Webhook Error: ${error instanceof Error ? error.message : error}`);
  //   return res.status(400).send(`Webhook Error: ${error}`);
  // }
  switch (req.body.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = req.body.data.object;
      // console.log();

      console.log('PaymentIntent was successful!', paymentIntent);
      // Fulfill the purchase, e.g., update the order in your database

      const cartItems = await cartItemModel.find({ cart_id: paymentIntent.metadata.cart_id })
      const prouducts = await productModel.find({
        _id: {
          $in:[cartItems.map((item:any)=>new mongoose.Types.ObjectId(item.product_id))]
        }
      },{_id:1,price:1}).exec()

      const data=cartItemModel.aggregate([
        {
          $match:{cart_id:paymentIntent.metadata.cart_id}
        }
      ])

      console.log(cartItems);

      break;
    // Handle other event types as needed
    default:
      console.log(`Unhandled event type ${req.body.type}`);
  }
}
