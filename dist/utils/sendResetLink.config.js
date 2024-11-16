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
exports.sendResetLink = void 0;
const transporter_util_1 = require("./transporter.util");
const sendResetLink = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield transporter_util_1.transporter.sendMail({
        from: process.env.EMAIL,
        to: data.email,
        subject: "Reset Password",
        html: ` <p>Click on the following link to reset your password</p>
      <a href="${process.env.CLIENT_URL}/reset-password/${data.token}">${process.env.CLIENT_URL}/reset-password/${data.token}</a>
      <p>The link will expire in 10 minutes.</p>`
    });
});
exports.sendResetLink = sendResetLink;
