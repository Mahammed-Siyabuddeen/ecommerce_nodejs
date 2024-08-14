import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { CustomerModel } from "../models/customers.model";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
interface Idata {
    email: string,
    password: string
}
const SignIn = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    console.log(req.body);
    
    if (!errors.isEmpty())
        return res.status(400).json({ error: errors.array() });

    try {
        const { email, password }: Idata = req.body
        const user = await CustomerModel.findOne({ email })
        if (!user) throw new Error('this email is not found' )
        if(!user.password) throw new Error('login trough google')
        
        const isCorrect =await bcrypt.compare(password, user.password)
        if (!isCorrect) throw new Error('password is incorrect' )

        const token = jwt.sign({ email, user_id: user._id }, process.env.JWT_SCRECET_KEY as string, { expiresIn: '1hr' })
        res.status(200).cookie('token',token,{ httpOnly: true }).json({ _id: user._id, first_name: user.first_name, email: user.email, password: null, token })

    } catch (error: unknown) {
        if (error instanceof Error)
            return res.status(400).json({message:error.message})
        res.status(400).json({message:'please try again'})
    }

}

export default SignIn