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
const Product_1 = require("../models/Product");
const multer_1 = __importDefault(require("multer"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const cloudinary_1 = require("cloudinary");
const uploadOnCloudinary_1 = __importDefault(require("../utils/uploadOnCloudinary"));
const fs_1 = __importDefault(require("fs"));
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
});
const ProductUpload = (0, multer_1.default)({ storage });
const AddProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.files)
            throw new Error('file multer error');
        const uploadedResult = yield (0, uploadOnCloudinary_1.default)(req.files);
        if (Array.isArray(req.files))
            req.files.map((file) => fs_1.default.unlink(file.path, () => { }));
        const { name, description, price, mrp, category_id, stock_quantity, sizes, brand } = req.body;
        const db = new Product_1.productModel({
            name,
            description,
            price: Number(price),
            mrp: Number(mrp),
            category_id,
            stock_quantity: Number(stock_quantity),
            imagesUrl: uploadedResult.map(file => file.secure_url),
            sizes: JSON.parse(sizes),
            brand
        });
        const product = yield db.save();
        res.status(201).json({
            _id: product._id,
            name: product.name,
            price: product.price,
            stock_quantity: product.stock_quantity,
            imagesUrl: product.imagesUrl
        });
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message });
        res.status(400).json({ message: "something wrong" });
    }
});
exports.default = AddProduct;
