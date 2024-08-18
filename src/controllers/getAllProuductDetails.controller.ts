
import { Request, Response } from "express";
import { productModel } from "../models/Product";
import { orderItemsModel } from "../models/orderItems.model";

export const getallProductDetails = async (req: Request, res: Response) => {
    try {
        const products = await productModel.aggregate([
            {
                $lookup: {
                    from: 'orderitems',
                    localField: '_id',
                    foreignField: 'product_id',
                    as: 'orders'
                },
            },
            {
                $unwind: {
                    path: "$orders",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $group: {

                    _id: "$_id",
                    name: { $first: "$name" },
                    price: { $first: "$price" },
                    stock_quantity: { $first: "$stock_quantity" },
                    orderQuantity: { $sum: '$orders.quantity' },
                    totalSale: { $sum: { $multiply: ["$orders.price", "$orders.quantity"] } },
                    imagesUrl: { $first: "$imagesUrl" },
                }
            },
            {
                $project: {
                    _id: 1,
                    price: 1,
                    name: 1,
                    stock_quantity: 1,
                    orderQuantity: 1,
                    totalSale: 1,
                    imagesUrl: 1,
                }
            },
        ])
        res.status(200).json(products)
    }
    catch (error: unknown) {
        if (error instanceof Error)
            return res.status(400).send(error.message)
        res.status(400).send("something wrong")
    }
}