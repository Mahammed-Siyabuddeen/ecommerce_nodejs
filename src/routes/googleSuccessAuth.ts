import { Request, Response, Router } from "express";
import { OAuth2Client } from "google-auth-library";
import { CustomerModel } from "../models/customers.model";


const router = Router()

router.post('/', async (req: Request, res: Response) => {
    try {
        console.log('helo',req.body);

        const { clientId, credential } = req.body
        const client = new OAuth2Client()
        const ticket = await client.verifyIdToken({ idToken: credential, audience: clientId })
        const payload = ticket.getPayload()

        if (!payload) return res.status(401).send('error')

        const { email, name, given_name, family_name } = payload

        const customerAlreadyExsist = await CustomerModel.find({ email })
        
        if (!customerAlreadyExsist.length) {
            const db = await CustomerModel.create({
                first_name: name,
                last_name: family_name || given_name,
                email,
                auth_type: 'google'
            })
            return res.status(201).json({_id:db._id,first_name:name,last_name:family_name || given_name,email,token:credential})
        }
        
        return res.status(201).json({_id:customerAlreadyExsist[0]._id,first_name:name,last_name:family_name || given_name,email,token:credential})


    } catch (error) {
        console.log(error);

        res.status(401).send('error')
    }



})
export default router