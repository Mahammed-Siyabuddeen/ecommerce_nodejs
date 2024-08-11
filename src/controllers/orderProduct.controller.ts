import { Request, Response } from "express";


export const orderProduct=async(req:Request,res:Response)=>{

    try {
    } catch (error:unknown) {
        if(error instanceof Error)
            return res.status(400).send(error.message)
        res.status(400).send("something wrong")
    }
}