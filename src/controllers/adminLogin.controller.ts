import { Request, Response } from "express";
import { adminModel } from "../models/admin.model";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
export const adminLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const admin = await adminModel.findOne({ email: email })
        if (!admin) throw new Error("invalid Admin");
        const isCorrect = await bcrypt.compare(password, admin.password);
        if (!isCorrect) throw new Error('password is incorrect')
        const token = jwt.sign({ email: email, admin_id: admin._id }, process.env.ADMIN_JWT_SCRECET_KEY as string, { expiresIn: '1h' })
        res.status(200).json({ name: admin.name, email,token })

    }
    catch (error: unknown) {
        if (error instanceof Error)
            return res.status(400).send(error.message)
        res.status(400).send("something wrong")
    }
}