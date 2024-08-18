import { Request, Response } from "express";
import { orderModel } from "../models/order.model";


export const getAllOrders = async(req: Request, res: Response) => {
    try {
        
        const orders=await orderModel.aggregate([
            {
                $lookup:{
                    from:'customers1',
                    localField:'user_id',
                    foreignField:'_id',
                    as:'userdetails'
                }
            },
            {$unwind:'$userdetails'},
            {
                $lookup:{
                    from:'orderitems',
                    localField:'_id',
                    foreignField:'order_id',
                    as:'orderitems'
                }
            },
            {$unwind:'$orderitems'},
            {
                $lookup:{
                    from:'products',
                    localField:'orderitems.product_id',
                    foreignField:'_id',
                    as:'productDetials'
                }
            },
            {$unwind:'$productDetials'},
            {
                $project:{
                    order_id:"_id",
                    create_at:1,
                    status:1,
                    customer_name:"$userdetails.first_name",
                    cutstomer_id:"$userdetails._id",
                    customer_email:"$userdetails.email",
                    product_name:"$productDetials.name",
                    product_id:"$productDetials._id",
                    product_imagurl:"$productDetials.imagesUrl",
                    product_quantity:"$orderitems.quantity",
                    product_total:{$multiply:["$orderitems.quantity","$orderitems.price"]},
                    demo:'my love'

                }
            },
            {$sort:{create_at:-1}}
        ])

        res.status(200).json(orders)
    }
    catch (error: unknown) {
        if (error instanceof Error)
            return res.status(400).send(error.message)
        res.status(400).send("something wrong")
    }
}