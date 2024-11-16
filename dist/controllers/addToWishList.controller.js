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
exports.addTowishList = void 0;
const wishlist_model_1 = require("../models/wishlist.model");
const mongoose_1 = __importDefault(require("mongoose"));
const addTowishList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, product_id } = req.body;
        const exists = yield wishlist_model_1.wishListModel.findOne({ user_id: new mongoose_1.default.Types.ObjectId(user_id), product_id: new mongoose_1.default.Types.ObjectId(product_id) });
        console.log(exists);
        if (exists)
            throw new Error('item already added');
        const db = new wishlist_model_1.wishListModel({
            user_id: new mongoose_1.default.Types.ObjectId(user_id),
            product_id: new mongoose_1.default.Types.ObjectId(product_id),
        });
        yield db.save();
        res.status(204).json({ message: 'added successfully' });
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message });
        res.status(400).json({ message: "something wrong" });
    }
});
exports.addTowishList = addTowishList;
