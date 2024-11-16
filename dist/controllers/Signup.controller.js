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
exports.Signup = void 0;
const express_validator_1 = require("express-validator");
const customers_model_1 = require("../models/customers.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    try {
        const { first_name, last_name, phone_number, email, password } = req.body;
        const customerAlreadyExsist = yield customers_model_1.CustomerModel.find({ email });
        if (customerAlreadyExsist.length)
            return res.status(400).json({ message: "user already exists with this email" });
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(password, salt);
        const doc = yield customers_model_1.CustomerModel.create({
            first_name,
            phone_number,
            email: email,
            password: hash,
            last_name,
            auth_type: 'self'
        });
        const token = jsonwebtoken_1.default.sign({ email: doc.email, user_id: doc._id }, 'shihab', { expiresIn: '1h' });
        res.status(201).json({ _id: doc._id, first_name, last_name, phone_number, email, token });
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message });
        res.status(400).json({ message: "something wrong" });
    }
});
exports.Signup = Signup;
