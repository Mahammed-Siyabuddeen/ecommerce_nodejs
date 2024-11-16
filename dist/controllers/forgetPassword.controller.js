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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgetPassword = void 0;
const customers_model_1 = require("../models/customers.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendResetLink_config_1 = require("../utils/sendResetLink.config");
const forgetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield customers_model_1.CustomerModel.findOne({ email });
        if (!user)
            throw new Error("Email not exists you can signup");
        const token = jsonwebtoken_1.default.sign({ user_id: user._id }, process.env.JWT_SCRECET_KEY, { expiresIn: '10m' });
        console.log(user, token);
        (0, sendResetLink_config_1.sendResetLink)({ email, token }).catch((error) => console.log(error));
        res.status(204).send();
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message });
        res.status(400).json({ message: "something wrong" });
    }
});
exports.forgetPassword = forgetPassword;
