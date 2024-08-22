import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { CustomerModel } from "../models/customers.model";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

interface BodyData {
    first_name: string,
    last_name?: string,
    phone_number: string,
    email: string,
    password: string
}
export const Signup = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    try {
        const { first_name, last_name, phone_number, email, password }: BodyData = req.body
        const customerAlreadyExsist = await CustomerModel.find({ email })
        if (customerAlreadyExsist.length) return res.status(400).send("user already exists with this email");

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const doc = await CustomerModel.create({
            first_name,
            phone_number,
            email: email,
            password: hash,
            last_name,
            auth_type: 'self'
        })
        const token = jwt.sign({ email: doc.email, user_id: doc._id }, 'shihab', { expiresIn: '1h' })
            
        res.status(201).cookie('token',token,{ httpOnly: true }).json({ _id: doc._id, first_name, last_name, phone_number, email, token })

    } 
    catch (error: unknown) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message })
        res.status(400).json({message:"something wrong"})
    }
}