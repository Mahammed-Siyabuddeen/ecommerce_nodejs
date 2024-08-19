import twilio from 'twilio'
const client=twilio(process.env.TWILIO_SID as string,process.env.TWILIO_TOKEN as string);

interface prop{
    phone:string
}
export const sendSms=async(data:prop)=>await client.messages.create({
    from:process.env.SMS_NUMBER,
    to:data.phone,
    body:`congratulations your order successfully completed. Please check ${process.env.CLIENT_URL}/orders `
})