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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_model_1 = require("../models/order.model");
const mongoose_1 = __importDefault(require("mongoose"));
const orderProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order_id, orderitem_id } = req.params;
        console.log("helo ", order_id, orderitem_id);
        const orderItemData = yield order_model_1.orderModel.aggregate([
            {
                $match: { _id: new mongoose_1.default.Types.ObjectId(order_id) }
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
            { $match: { 'orderItem._id': new mongoose_1.default.Types.ObjectId(orderitem_id) } },
            {
                $project: {
                    create_at: 1,
                    status: 1,
                    address: 1,
                    prouduct_id: '$orderItem.product_id',
                    totalPrice: { $multiply: ["$orderItem.price", "$orderItem.quantity"] },
                    quantity: "$orderItem.quantity"
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
            { $unwind: '$product' },
            { $project: {
                    productName: '$product.name',
                    productImage: '$product.imagesUrl',
                    product_id: '$product._id',
                    address: 1,
                    status: 1,
                    create_at: 1,
                    totalPrice: 1,
                    quantity: 1,
                } }
        ]);
        res.status(200).json(orderItemData[0]);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message });
        res.status(400).json({ message: "something wrong" });
    }
});
exports.default = orderProductById;
