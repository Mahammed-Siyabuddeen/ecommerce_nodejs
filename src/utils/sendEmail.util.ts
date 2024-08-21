import { transporter } from "./transporter.util";

interface prop {
    email: string,
    subject: string,

}
export const sendEmail = async (data: prop) => await transporter.sendMail({
    from: process.env.EMAIL,
    to: data.email,
    subject: data.subject,
    html: `<h1>congratulations your Order placed successfully</h1><br>see your order <a href='${process.env.CLIENT_URL}/orders' >click</a>`
})