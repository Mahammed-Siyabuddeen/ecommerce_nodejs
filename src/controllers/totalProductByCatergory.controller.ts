import { Request, Response } from "express";
import { orderModel } from "../models/order.model";
import { orderItemsModel } from "../models/orderItems.model";
import { productModel } from "../models/Product";

export const totalProductByCatergory=async (req: Request, res: Response) => {
    try {
        const data=await productModel.aggregate([
            {
                $lookup:{
                    from:'categories',
                    localField:"category_id",
                    foreignField:"_id",
                    as:"category"
                }
            },
            {$unwind:"$category"},
            {
                $project:{
                    _id:0,
                    stock_quantity:1,
                    category:"$category.name",
                }
            },
            {
                $group:{
                    _id:{
                        category:"$category"
                    },
                    totalProdct:{$sum:"$stock_quantity"},
                }
            },
            {
                $project:{
                    _id:0,
                  category:"$_id.category",
                  totalProdct:1,
                }
            }
        ])
        res.status(200).json(data)
    }
    catch (error: unknown) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message })
        res.status(400).send("something wrong")
    }
}  