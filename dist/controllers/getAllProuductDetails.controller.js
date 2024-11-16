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
exports.getallProductDetails = void 0;
const Product_1 = require("../models/Product");
const getallProductDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product_1.productModel.aggregate([
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
        ]);
        res.status(200).json(products);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message });
        res.status(400).json({ message: "something wrong" });
    }
});
exports.getallProductDetails = getallProductDetails;
