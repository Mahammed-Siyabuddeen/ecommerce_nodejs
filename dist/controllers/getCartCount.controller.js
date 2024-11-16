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
exports.getCartCount = void 0;
const cart_model_1 = require("../models/cart.model");
const mongoose_1 = __importDefault(require("mongoose"));
const getCartCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.body;
        const count = yield cart_model_1.cartModel.aggregate([
            {
                $match: { user_id: new mongoose_1.default.Types.ObjectId(user_id) }
            },
            {
                $lookup: {
                    from: 'cartitems',
                    localField: '_id',
                    foreignField: 'cart_id',
                    as: 'cartitems'
                }
            },
            {
                $project: {
                    total: { $size: "$cartitems" }
                }
            }
        ]);
        console.log(count);
        const documentCount = count.length > 0 ? count[0].total : 0;
        res.status(200).json(documentCount);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message });
        res.status(400).json({ message: "something wrong" });
    }
});
exports.getCartCount = getCartCount;
