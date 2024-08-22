import { NextFunction, Request, Response } from "express"
import { OAuth2Client } from "google-auth-library";
import jwt, { JwtPayload } from 'jsonwebtoken'


interface authMiddlewareType extends JwtPayload {
    user_id: string,
    email: string,
}
export interface customerRequest extends Request {
    user?: authMiddlewareType
}
const client = new OAuth2Client();
const userAuth = async (req: customerRequest, res: Response, next: NextFunction) => {
    try {
        const data = req.header('Authorization');
        if (!data) throw new Error('please login')
        const token = data.split(" ")[1]
        if (token.length < 500) {
            const decod = jwt.verify(token, process.env.JWT_SCRECET_KEY as string) as authMiddlewareType;
            req.user = decod
            if (!req.user)
                throw new Error('please login')
        } else {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID
            })
            const payload = ticket.getPayload();
            if (!payload?.email?.length) throw new Error('please login')
        }
        next();
    } catch (error) {
        console.log(error);

        res.status(403).json({ message: "please login" });
    }
}

export default userAuth