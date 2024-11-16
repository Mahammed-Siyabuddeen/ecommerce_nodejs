"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOrders = void 0;
const order_model_1 = require("../models/order.model");
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_model_1.orderModel.aggregate([
            {
                $lookup: {
                    from: 'customers1',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'userdetails'
                }
            },
            { $unwind: '$userdetails' },
            {
                $lookup: {
                    from: 'orderitems',
                    localField: '_id',
                    foreignField: 'order_id',
                    as: 'orderitems'
                }
            },
            { $unwind: '$orderitems' },
            {
                $lookup: {
                    from: 'products',
                    localField: 'orderitems.product_id',
                    foreignField: '_id',
                    as: 'productDetials'
                }
            },
            { $unwind: '$productDetials' },
            {
                $project: {
                    order_id: "_id",
                    create_at: 1,
                    status: 1,
                    customer_name: "$userdetails.first_name",
                    cutstomer_id: "$userdetails._id",
                    customer_email: "$userdetails.email",
                    product_name: "$productDetials.name",
                    product_id: "$productDetials._id",
                    product_imagurl: "$productDetials.imagesUrl",
                    product_quantity: "$orderitems.quantity",
                    product_total: { $multiply: ["$orderitems.quantity", "$orderitems.price"] },
                    demo: 'my love'
                }
            },
            { $sort: { create_at: -1 } }
        ]);
        res.status(200).json(orders);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message });
        res.status(400).json({ message: "something wrong" });
    }
});
exports.getAllOrders = getAllOrders;
