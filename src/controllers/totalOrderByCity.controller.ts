import { Request, Response } from "express";
import { addressModel } from "../models/address.model";
import { orderModel } from "../models/order.model";

export const totalOrderByCity = async (req: Request, res: Response) => {
    try {
        const count=await orderModel.aggregate([
            {
                $lookup:{
                    from:"addresses",
                    localField:"address_id",
                    foreignField:"_id",
                    as:'address'
                },
            },
            {$unwind:"$address"},
            {
                $group:{
                    _id:{
                        city:"$address.city"
                    },
                   count:{$sum:1}
                }
            },
            {
                $project:{_id:0,city:"$_id.city",count:1}
            }
        ])
        res.status(200).json(count)
    }
    catch (error: unknown) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message })
        res.status(400).json({message:"something wrong"})
    }
}  