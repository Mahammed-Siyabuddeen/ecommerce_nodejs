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
exports.salesbymonth = void 0;
const order_model_1 = require("../models/order.model");
const salesbymonth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield order_model_1.orderModel.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: "$create_at" },
                        month: { $month: '$create_at' }
                    },
                    totalSales: { $sum: "$total_amount" }
                }
            },
            {
                $project: {
                    _id: 0,
                    date: "$_id.month",
                    totalSales: 1
                }
            }
        ]);
        console.log(count);
        res.status(200).json(count);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message });
        res.status(400).json({ message: "something wrong" });
    }
});
exports.salesbymonth = salesbymonth;
