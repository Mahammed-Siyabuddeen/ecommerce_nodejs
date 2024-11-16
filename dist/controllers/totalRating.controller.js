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
exports.totalRating = void 0;
const review_model_1 = require("../models/review.model");
const mongoose_1 = __importDefault(require("mongoose"));
const totalRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('totalrating', req.params);
        const { product_id } = req.params;
        const rating = yield review_model_1.reviewModel.find({ product_id: new mongoose_1.default.Types.ObjectId(product_id) }, { _id: 0, rating: 1 });
        const totalRating = rating.reduce((total, item) => total + item.rating, 0) / rating.length;
        const roundTotal = parseFloat(totalRating.toFixed(1));
        res.status(200).json(roundTotal);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message });
        res.status(400).json({ message: "something wrong" });
    }
});
exports.totalRating = totalRating;
