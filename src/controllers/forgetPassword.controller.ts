import { Request, Response } from "express";
import { CustomerModel } from "../models/customers.model";
import jwt from "jsonwebtoken";
import { orderModel } from "../models/order.model";
import { sendResetLink } from "../utils/sendResetLink.config";

export const forgetPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        const user = await CustomerModel.findOne({ email });

        if (!user) throw new Error("Email not exists you can signup")
        const token = jwt.sign({ user_id: user._id }, process.env.JWT_SCRECET_KEY as string, { expiresIn: '10m' })
        console.log(user,token);
        
        sendResetLink({ email, token }).catch((error) => console.log(error))
        res.status(204).send();
    }
    catch (error: unknown) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message })
        res.status(400).json({message:"something wrong"})
    }
}  