import nodemailer, { TransportOptions } from 'nodemailer'
import dotenv from 'dotenv';
dotenv.config()
const user=process.env.EMAIL
const pass=process.env.EMAIL_PASS
export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    post: 465,
    secure: false,
    auth: {
        user: user,
        pass: pass
    }

} as TransportOptions)
