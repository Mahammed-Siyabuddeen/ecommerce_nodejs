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
const express_validator_1 = require("express-validator");
const customers_model_1 = require("../models/customers.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    console.log(req.body);
    if (!errors.isEmpty())
        return res.status(400).json({ error: errors.array() });
    try {
        const { email, password } = req.body;
        const user = yield customers_model_1.CustomerModel.findOne({ email });
        if (!user)
            throw new Error('this email is not found');
        if (!user.password)
            throw new Error('login trough google');
        const isCorrect = yield bcrypt_1.default.compare(password, user.password);
        if (!isCorrect)
            throw new Error('password is incorrect');
        const token = jsonwebtoken_1.default.sign({ email, user_id: user._id }, process.env.JWT_SCRECET_KEY, { expiresIn: '1hr' });
        res.status(200).json({ _id: user._id, first_name: user.first_name, email: user.email, password: null, token });
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message });
        res.status(400).json({ message: "something wrong" });
    }
});
exports.default = SignIn;
