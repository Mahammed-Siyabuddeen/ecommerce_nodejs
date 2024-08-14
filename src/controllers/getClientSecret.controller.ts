import { Request, Response, } from "express";
import Stripe from "stripe";

export const getClientSecret = async (req: Request, res: Response) => {
    try {
       
        const stripe = new Stripe('sk_test_51PlwiKGBMIgRPdYIW7uCxvuoPgPv8hDDe6fRr4s3d95Sj3AzQglp6MU7UPXcYwTcwztlsQ42JuVrT395neBKpMa500pciZTsna')
        const { amount, cart_id, user_id,name, street,city,zipcode,state,country,phone } = req.body;
        console.log(req.body);
        const paymentIntents = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            automatic_payment_methods: { enabled: true },
            metadata: {
                user_id: user_id,
                cart_id: cart_id,
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
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error })

    }
}
