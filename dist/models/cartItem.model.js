"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartItemModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const cartItemSchema = new mongoose_1.default.Schema({
    cart_id: { type: mongoose_1.default.Types.ObjectId, required: true },
    product_id: { type: mongoose_1.default.Types.ObjectId, required: true },
    quantity: { type: Number, required: true },
    size: { type: String }
});
exports.cartItemModel = mongoose_1.default.model('cartitems', cartItemSchema);
