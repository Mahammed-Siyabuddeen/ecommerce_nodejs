import { Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { CustomerModel } from "../models/customers.model";
import bcrypt from 'bcrypt'

interface TokenType extends JwtPayload{
    user_id:string,
}
export const resetPassword = async (req: Request, res: Response) => {
    try {
        const {token}=req.params;
        const {password}=req.body;
        console.log(token);
        const decoded=jwt.verify(token,process.env.JWT_SCRECET_KEY as string)as TokenType;

        if(!decoded) throw new Error("token is invalid");
        const user=await CustomerModel.findById(decoded.user_id);
        if(!user) throw new Error("user is not found");

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        user.password=hashPassword;
        await user.save();
        const newToken = jwt.sign({ email: user.email, user_id: user._id }, 'shihab', { expiresIn: '1h' })
        // res.status(201).json({ _id: user._id, first_name, last_name, phone_number, email, token })
        res.status(200).json({ _id: user._id, first_name:user.first_name, last_name:user.last_name, phone_number:user.phone_number, email:user.email, token})
        
    }
    catch (error: unknown) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message+', please retry'})
        res.status(400).send("something wrong")
    }
}  