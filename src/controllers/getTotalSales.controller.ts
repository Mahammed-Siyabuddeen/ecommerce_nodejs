import { Request, Response } from "express";
import { orderModel } from "../models/order.model";

export const getTotalSales = async (req: Request, res: Response) => {
    try {
        const data=await orderModel.aggregate([
            {
                $group:{
                    _id: null, 
                    totalSales:{$sum:'$total_amount'}
                }
            }
        ])
        console.log(data[0].totalSales);
        
        res.status(200).json(data[0].totalSales)
    }
    catch (error: unknown) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message })
        res.status(400).json({message:"something wrong"})
    }
}  