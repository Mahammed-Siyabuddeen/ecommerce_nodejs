import nodemailer, { TransportOptions } from 'nodemailer'
const transporter=nodemailer.createTransport({
    host:"smtp.gmail.com",
    post:465,
    secure:false,
    auth:{
        user:process.env.EMAIL,
        pass:process.env.EMail_PASS
    }

} as TransportOptions)

interface prop{
    email:string,
    subject:string,

}
export const sendEmail=async(data:prop)=>await transporter.sendMail({
    from:process.env.EMAIL,
    to:data.email,
    subject:data.subject,
    html:`<h1>congratulations your Order placed successfully</h1><br>see your order <a href='${process.env.CLIENT_URL}/orders' >click</a>`
})