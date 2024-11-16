"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderItemsModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const orderItemSchema = new mongoose_1.default.Schema({
    price: { type: Number, require: true },
    quantity: { type: Number, require: true },
    order_id: { type: mongoose_1.default.Types.ObjectId, required: true },
    product_id: { type: mongoose_1.default.Types.ObjectId, required: true },
    create_at: { type: Date, default: new Date() },
});
exports.orderItemsModel = mongoose_1.default.model('orderItems', orderItemSchema);
