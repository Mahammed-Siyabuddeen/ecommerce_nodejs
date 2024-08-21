import { Request, Response } from "express";
import { orderModel } from "../models/order.model";
import mongoose from "mongoose";
import { orderItemsModel } from "../models/orderItems.model";


const orderProductById = async (req: Request, res: Response) => {
    try {
        const { order_id, orderitem_id } = req.params;
        console.log("helo ",order_id, orderitem_id);
        const orderItemData = await orderModel.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(order_id) }
            },
            {
                $lookup: {
                    from: 'addresses',
                    localField: 'address_id',
                    foreignField: '_id',
                    as: 'address'
                }
            },
            { $unwind: '$address' },
            {
                $lookup: {
                    from: 'orderitems',
                    localField: '_id',
                    foreignField: 'order_id',
                    as: 'orderItem'
                }
            },
            { $unwind: '$orderItem' },
            { $match: { 'orderItem._id': new mongoose.Types.ObjectId(orderitem_id) } },
            {
                $project: {
                    create_at:1,
                    status: 1,
                    address: 1,
                    prouduct_id: '$orderItem.product_id',
                    totalPrice:{$multiply:["$orderItem.price","$orderItem.quantity"]},
                    quantity:"$orderItem.quantity"
                }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'prouduct_id',
                    foreignField: '_id',
                    as: 'product'
                }
            },
            {$unwind:'$product'},
            {$project:{
                productName:'$product.name',
                productImage:'$product.imagesUrl',
                product_id:'$product._id',
                address:1,
                status:1,
                create_at:1,
                totalPrice:1,
                quantity:1,
            }}
        ])
        res.status(200).json(orderItemData[0])
    } catch (error: unknown) {
        if (error instanceof Error)
            return res.status(400).send(error.message)
        res.status(400).send("something wrong")
    }
}
export default orderProductById;