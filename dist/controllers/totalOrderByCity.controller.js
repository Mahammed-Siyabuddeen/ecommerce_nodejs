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
exports.totalOrderByCity = void 0;
const order_model_1 = require("../models/order.model");
const totalOrderByCity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield order_model_1.orderModel.aggregate([
            {
                $lookup: {
                    from: "addresses",
                    localField: "address_id",
                    foreignField: "_id",
                    as: 'address'
                },
            },
            { $unwind: "$address" },
            {
                $group: {
                    _id: {
                        city: "$address.city"
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $project: { _id: 0, city: "$_id.city", count: 1 }
            }
        ]);
        res.status(200).json(count);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message });
        res.status(400).json({ message: "something wrong" });
    }
});
exports.totalOrderByCity = totalOrderByCity;
