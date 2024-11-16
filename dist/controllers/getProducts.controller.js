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
exports.getproducts = void 0;
const Product_1 = require("../models/Product");
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const getproducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, category, price, brand, rating, size } = req.query;
        console.log(req.query);
        let products;
        let query = {};
        if (name)
            query.$text = { $search: name };
        if (category)
            query.category_id = new mongoose_2.default.Types.ObjectId(category);
        if (price)
            query.price = { $lt: price };
        if (brand)
            query.brand = brand;
        if (rating)
            query["ratings.average"] = rating;
        if (size)
            query.sizes = { $in: [size] };
        console.log(query);
        products = yield Product_1.productModel.find(query).limit(10).exec();
        console.log(products);
        return res.status(200).json(products);
    }
    catch (error) {
        if (error instanceof mongoose_1.Error)
            return res.status(400).json({ message: error.message });
        res.status(400).json({ message: "something wrong" });
    }
});
exports.getproducts = getproducts;
