"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const paymentSchema = new mongoose_1.default.Schema({
    amount: { type: Number, required: true },
    transaction_id: { type: String, required: true },
    create_at: { type: Date, default: new Date() },
});
exports.paymentModel = mongoose_1.default.model('payment', paymentSchema);
