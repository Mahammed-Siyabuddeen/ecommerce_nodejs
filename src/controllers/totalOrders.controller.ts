import { Request, Response } from "express";
import { orderModel } from "../models/order.model";

export const totalOrders=async (req: Request, res: Response) => {
    try {
        const count=await orderModel.countDocuments();
        res.status(200).json(count)
    }
    catch (error: unknown) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message })
        res.status(400).send("something wrong")
    }
}  