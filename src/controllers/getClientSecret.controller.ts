import { Request, Response, } from "express";
import Stripe from "stripe";

export const getClientSecret = async (req: Request, res: Response) => {
    try {
       
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
        const { amount, cart_id,cartItem_id, user_id,name, street,city,zipcode,state,country,phone } = req.body;
        console.log(req.body);
        const paymentIntents = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            automatic_payment_methods: { enabled: true },
            metadata: {
                 user_id,
                 cart_id,
                cartItem_id,
                amount: amount,
                name,
                street,
                city,
                zipcode,
                state,
                country,
                phone
            }
        });
        console.log('get client id successfully');

        res.status(201).json({ clientSecret: paymentIntents.client_secret })
    }
    catch (error: unknown) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message })
        res.status(400).json({message:"something wrong"})
    }
}
