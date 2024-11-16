"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const orderShcema = new mongoose_1.default.Schema({
    user_id: { type: mongoose_1.default.Types.ObjectId, required: true },
    address_id: { type: mongoose_1.default.Types.ObjectId, required: true },
    payment_id: { type: mongoose_1.default.Types.ObjectId, required: true },
    total_amount: { type: Number, required: true },
    status: { type: String, default: 'ordered' },
    create_at: { type: Date, default: new Date() },
});
exports.orderModel = mongoose_1.default.model('orders', orderShcema);
