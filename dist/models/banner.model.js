"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bannerModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bannerSchema = new mongoose_1.default.Schema({
    heading: { type: String, required: true, },
    sub_heading: { type: String, required: true, },
    product_id: { type: mongoose_1.default.Types.ObjectId, required: true },
    image_url: { type: String, required: true },
    created_at: { type: Date, default: new Date() },
});
exports.bannerModel = mongoose_1.default.model('banner', bannerSchema);
