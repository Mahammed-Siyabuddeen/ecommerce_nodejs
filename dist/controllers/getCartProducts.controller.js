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
const express_validator_1 = require("express-validator");
const cart_model_1 = require("../models/cart.model");
const mongoose_1 = __importDefault(require("mongoose"));
const getCartProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        console.log(req.body);
        if (!errors.isEmpty())
            throw new Error(errors.array().toString());
        const { user_id } = req.body;
        const products = yield cart_model_1.cartModel.aggregate([
            {
                $match: { user_id: new mongoose_1.default.Types.ObjectId(user_id) }
            },
            {
                $lookup: {
                    from: 'cartitems',
                    localField: '_id',
                    foreignField: 'cart_id',
                    as: 'items'
                }
            },
            {
                $unwind: '$items'
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'items.product_id',
                    foreignField: '_id',
                    as: 'products'
                }
            },
            {
                $unwind: '$products'
            },
            {
                $project: {
                    _id: 1,
                    quantity: "$items.quantity",
                    cartItem_id: '$items._id',
                    product_id: "$products._id",
                    name: "$products.name",
                    price: "$products.price",
                    brand: "$products.brand",
                    imagesUrl: "$products.imagesUrl",
                    total: { $multiply: ["$products.price", "$items.quantity"] },
                    stock_quantity: "$products.stock_quantity",
                }
            }
        ]);
        console.log(products);
        res.status(200).json(products);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message });
        res.status(400).json({ message: "something wrong" });
    }
});
exports.default = getCartProducts;
