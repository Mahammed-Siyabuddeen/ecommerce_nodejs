"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const customerSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true },
    auth_type: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, },
    password: { type: String },
    phone_number: { type: [String] },
});
exports.CustomerModel = mongoose_1.default.model("customers", customerSchema);
