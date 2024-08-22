import { Request, Response } from "express";
import { orderModel } from "../models/order.model";

export const salesbymonth=async (req: Request, res: Response) => {
    try {
        const count=await orderModel.aggregate([
            {
                $group:{
                    _id:{
                        year:{$year:"$create_at"},
                        month:{$month:'$create_at'}
                    },
                    totalSales:{$sum:"$total_amount"}
                }
            },
            {
                $project:{
                    _id:0,
                    date:"$_id.month",
                    totalSales:1
                }
            }
        ])
        console.log(count);
        
        res.status(200).json(count)
    }
    catch (error: unknown) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message })
        res.status(400).json({message:"something wrong"})
    }
}  