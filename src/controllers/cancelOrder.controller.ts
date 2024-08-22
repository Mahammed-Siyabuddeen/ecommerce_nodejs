import { Request, Response } from "express";
import { reviewModel } from "../models/review.model";
import mongoose from "mongoose";
import { categoryModel } from "../models/category.model";
import { orderModel } from "../models/order.model";

export const cancelOrder = async (req: Request, res: Response) => {
    try {
       const {order_id}=req.body;
       await orderModel.findOneAndUpdate({_id:order_id},{$set:{status:'canceled'}});
       res.status(204).send();
    }
    catch (error: unknown) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message })
        res.status(400).json({message:"something wrong"})
    }
}