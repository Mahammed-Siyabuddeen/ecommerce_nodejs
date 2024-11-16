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
exports.totalProductByCatergory = void 0;
const Product_1 = require("../models/Product");
const totalProductByCatergory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield Product_1.productModel.aggregate([
            {
                $lookup: {
                    from: 'categories',
                    localField: "category_id",
                    foreignField: "_id",
                    as: "category"
                }
            },
            { $unwind: "$category" },
            {
                $project: {
                    _id: 0,
                    stock_quantity: 1,
                    category: "$category.name",
                }
            },
            {
                $group: {
                    _id: {
                        category: "$category"
                    },
                    totalProdct: { $sum: "$stock_quantity" },
                }
            },
            {
                $project: {
                    _id: 0,
                    category: "$_id.category",
                    totalProdct: 1,
                }
            }
        ]);
        res.status(200).json(data);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message });
        res.status(400).json({ message: "something wrong" });
    }
});
exports.totalProductByCatergory = totalProductByCatergory;
