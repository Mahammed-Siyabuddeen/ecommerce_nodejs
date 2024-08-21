import { NextFunction, Request, Response } from "express"
import { OAuth2Client } from "google-auth-library";
import jwt, { JwtPayload } from 'jsonwebtoken'


interface authMiddlewareType extends JwtPayload {
    admin_id: string,
    email: string,
}
export interface customerRequest extends Request {
    user?: authMiddlewareType
}
const client = new OAuth2Client();
const adminAuth = async (req: customerRequest, res: Response, next: NextFunction) => {
    try {
        const data = req.header('adminAuthorization');
        if (!data) throw new Error('please login');
        const token = data.split(" ")[1];
        const decod = jwt.verify(token, process.env.ADMIN_JWT_SCRECET_KEY as string) as authMiddlewareType;
        req.user = decod
        if (!req.user)
            throw new Error('please login')
        next();
    } catch (error: unknown) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message })
        res.status(400).json({ message: "please login" })
    }
}

export default adminAuth