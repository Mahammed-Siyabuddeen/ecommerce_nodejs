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
exports.resetPassword = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const customers_model_1 = require("../models/customers.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.params;
        const { password } = req.body;
        console.log(token);
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SCRECET_KEY);
        if (!decoded)
            throw new Error("token is invalid");
        const user = yield customers_model_1.CustomerModel.findById(decoded.user_id);
        if (!user)
            throw new Error("user is not found");
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashPassword = yield bcrypt_1.default.hash(password, salt);
        user.password = hashPassword;
        yield user.save();
        const newToken = jsonwebtoken_1.default.sign({ email: user.email, user_id: user._id }, 'shihab', { expiresIn: '1h' });
        // res.status(201).json({ _id: user._id, first_name, last_name, phone_number, email, token })
        res.status(200).json({ _id: user._id, first_name: user.first_name, last_name: user.last_name, phone_number: user.phone_number, email: user.email, token });
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message });
        res.status(400).json({ message: "something wrong" });
    }
});
exports.resetPassword = resetPassword;
