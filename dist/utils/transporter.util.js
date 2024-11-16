"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const user = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;
exports.transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    post: 465,
    secure: false,
    auth: {
        user: user,
        pass: pass
    }
});
