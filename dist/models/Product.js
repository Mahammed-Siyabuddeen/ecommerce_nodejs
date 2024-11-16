"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: { type: String, text: true, required: true, },
    description: { type: String, text: true, required: true },
    price: { type: Number, required: true },
    mrp: { type: Number, required: true },
    category_id: { type: mongoose_1.default.Types.ObjectId, text: true, required: true },
    brand: { type: String, required: true },
    stock_quantity: { type: Number, required: true },
    created_at: { type: Date, default: new Date() },
    imagesUrl: { type: [String], required: true },
    sizes: { type: [String] },
    ratings: {
        average: { type: Number, default: 0 },
        count: { type: Number, default: 0 }
    },
});
exports.productModel = mongoose_1.default.model('Products', productSchema);
