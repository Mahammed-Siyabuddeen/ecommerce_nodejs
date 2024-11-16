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
exports.orderProduct = void 0;
const order_model_1 = require("../models/order.model");
const mongoose_1 = __importDefault(require("mongoose"));
const orderProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.body;
        const orderProducts = yield order_model_1.orderModel.aggregate([
            {
                $match: { user_id: new mongoose_1.default.Types.ObjectId(user_id) }
            },
            {
                $lookup: {
                    from: 'orderitems',
                    localField: '_id',
                    foreignField: 'order_id',
                    as: 'orderItems'
                }
            },
            {
                $unwind: '$orderItems'
            },
            {
                $project: {
                    _id: 1,
                    create_at: 1,
                    address_id: 1,
                    status: 1,
                    totalPrice: '$total_amount',
                    quantity: "$orderItems.quantity",
                    product_id: "$orderItems.product_id",
                    orderItemId: '$orderItems._id'
                }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'product_id',
                    foreignField: '_id',
                    as: 'products'
                }
            },
            { $unwind: '$products' },
            {
                $project: {
                    _id: 1, created_at: 1, status: 1, totalPrice: 1, quantity: 1, product_id: 1, address_id: 1, orderItemId: 1,
                    productName: '$products.name',
                    productImage: '$products.imagesUrl'
                }
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
        ]);
        console.log(orderProducts, user_id);
        res.status(200).json(orderProducts);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message });
        res.status(400).json({ message: "something wrong" });
    }
});
exports.orderProduct = orderProduct;
