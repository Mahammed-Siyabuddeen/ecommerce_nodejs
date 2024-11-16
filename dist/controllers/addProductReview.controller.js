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
exports.addProductReview = void 0;
const orderItems_model_1 = require("../models/orderItems.model");
const Product_1 = require("../models/Product");
const review_model_1 = require("../models/review.model");
const mongoose_1 = __importDefault(require("mongoose"));
const addProductReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, orderItem_id, rating, comment } = req.body;
        const orderItem = yield orderItems_model_1.orderItemsModel.findById(orderItem_id);
        if (!orderItem)
            throw new Error("orderItem not valid");
        const db = new review_model_1.reviewModel({
            user_id: new mongoose_1.default.Types.ObjectId(user_id),
            product_id: orderItem.product_id,
            rating,
            comment
        });
        const setrating = yield Product_1.productModel.findByIdAndUpdate(orderItem.product_id, [
            {
                $set: {
                    "ratings.count": { $add: ["$ratings.count", 1] },
                    "ratings.average": {
                        $divide: [
                            { $add: [{ $multiply: ["$ratings.average", "$ratings.count"] }, rating] },
                            { $add: ["$ratings.count", 1] }
                        ]
                    }
                }
            }
        ], { new: true });
        console.log(setrating);
        db.save();
        res.status(204).send();
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message });
        res.status(400).json({ message: "something wrong" });
    }
});
exports.addProductReview = addProductReview;
