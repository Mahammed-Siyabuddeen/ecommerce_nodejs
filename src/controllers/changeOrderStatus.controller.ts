import { Request, Response } from "express";
import { orderModel } from "../models/order.model";

export const changeorderstatus = async (req: Request, res: Response) => {
    try {
        const {order_id,status}=req.body;

        const product=await orderModel.findByIdAndUpdate(order_id,{status},{new:true});
        console.log('change orderstatus',product);
        
        res.status(200).json(product)
    }
    catch (error: unknown) {
        if (error instanceof Error)
            return res.status(400).send(error.message)
        res.status(400).send("something wrong")
    }
}