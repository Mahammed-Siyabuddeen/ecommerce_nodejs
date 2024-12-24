import { Request, Response } from "express";
import { orderModel } from "../models/order.model";
import mongoose from "mongoose";


export const orderProduct = async (req: Request, res: Response) => {
    try {
        const { user_id }:{user_id:string} = req.body;
        const orderProducts = await orderModel.aggregate([
            {
                $match: { user_id: new mongoose.Types.ObjectId(user_id) }
            },
            {
                $lookup:{
                    from:'orderitems',
                    localField:'_id',
                    foreignField:'order_id',
                    as:'orderItems'
                }
            },
            {
                $unwind:'$orderItems'
            },
            {
                $project:{
                    _id:1,
                    create_at:1,
                    address_id:1,
                    status:1,
                    totalPrice:'$total_amount',
                    quantity:"$orderItems.quantity",
                    product_id:"$orderItems.product_id",
                    orderItemId:'$orderItems._id'
                }
            },
            {
                $lookup:{
                    from:'products',
                    localField:'product_id',
                    foreignField:'_id',
                    as:'products'
                }
            },
            {$unwind:'$products'},
            {
                $project:{
                    _id:1,create_at:1,
                    status:1,
                    totalPrice:1,
                    quantity:1,product_id:1,
                    address_id:1,
                    orderItemId:1,
                    productName:'$products.name',
                    productImage:'$products.imagesUrl'
                }
            },
            {
                $lookup:{
                    from:'addresses',
                    localField:'address_id',
                    foreignField:'_id',
                    as:'address'
                }
            },
            {$unwind:'$address'},
        ]).sort({"create_at":-1})
        console.log(orderProducts);
        
        res.status(200).json(orderProducts)
    }
    catch (error: unknown) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message })
        res.status(400).json({message:"something wrong"})
    }
}