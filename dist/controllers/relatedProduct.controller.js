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
exports.relatedProduct = void 0;
const Product_1 = require("../models/Product");
const mongoose_1 = __importDefault(require("mongoose"));
const relatedProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('related product', req.query);
        const { category_id, product_id } = req.query;
        const products = yield Product_1.productModel.find({
            category_id: new mongoose_1.default.Types.ObjectId(category_id),
            _id: { $ne: new mongoose_1.default.Types.ObjectId(product_id) }
        }).limit(8);
        res.status(200).json(products);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message });
        res.status(400).json({ message: "something wrong" });
    }
});
exports.relatedProduct = relatedProduct;
