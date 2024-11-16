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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const transporter_util_1 = require("./transporter.util");
const sendEmail = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield transporter_util_1.transporter.sendMail({
        from: process.env.EMAIL,
        to: data.email,
        subject: data.subject,
        html: `<h1>congratulations your Order placed successfully</h1><br>see your order <a href='${process.env.CLIENT_URL}/orders' >click</a>`
    });
});
exports.sendEmail = sendEmail;
