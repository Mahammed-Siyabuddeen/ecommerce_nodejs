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
exports.addBanner = void 0;
const banner_model_1 = require("../models/banner.model");
const mongoose_1 = __importDefault(require("mongoose"));
const uploadOnCloudinary_1 = __importDefault(require("../utils/uploadOnCloudinary"));
const fs_1 = __importDefault(require("fs"));
const addBanner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { heading, sub_heading, product_id } = req.body;
        if (!req.file)
            throw new Error('file multer error');
        const image_url = yield (0, uploadOnCloudinary_1.default)(req.file);
        fs_1.default.unlink(req.file.path, (err) => { });
        const db = new banner_model_1.bannerModel({
            product_id: new mongoose_1.default.Types.ObjectId(product_id),
            heading,
            sub_heading,
            image_url
        });
        yield db.save();
        res.status(200).json(db);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message });
        res.status(400).json({ message: "something wrong" });
    }
});
exports.addBanner = addBanner;
