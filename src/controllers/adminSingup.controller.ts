import { Request, Response } from "express";
import { adminModel } from "../models/admin.model";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
export const adminSignup = async (req: Request, res: Response) => {
    try {
        const { email, password, name } = req.body;
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(password, salt)
        const admin = await adminModel.create({ email, name, password: hashpassword })
        const token = jwt.sign({ email: email, admin_id: admin._id }, process.env.ADMIN_JWT_SCRECET_KEY as string, { expiresIn: '1h' })
        res.status(200).json({ name: admin.name, email, token })

    }
    catch (error: unknown) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message })
        res.status(400).json({message:"something wrong"})
    }
}