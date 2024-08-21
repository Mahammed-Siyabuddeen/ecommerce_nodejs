import nodemailer, { TransportOptions } from 'nodemailer'
import { transporter } from './transporter.util'

interface prop {
    email: string,
    token: string,

}

export const sendResetLink = async (data: prop) => await transporter.sendMail({
    from: process.env.EMAIL,
    to: data.email,
    subject: "Reset Password",
    html: ` <p>Click on the following link to reset your password</p>
      <a href="${process.env.CLIENT_URL}/reset-password/${data.token}">${process.env.CLIENT_URL}/reset-password/${data.token}</a>
      <p>The link will expire in 10 minutes.</p>`
})