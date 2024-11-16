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
exports.adminLogin = void 0;
const admin_model_1 = require("../models/admin.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const admin = yield admin_model_1.adminModel.findOne({ email: email });
        if (!admin)
            throw new Error("invalid Admin");
        const isCorrect = yield bcrypt_1.default.compare(password, admin.password);
        if (!isCorrect)
            throw new Error('password is incorrect');
        const token = jsonwebtoken_1.default.sign({ email: email, admin_id: admin._id }, process.env.ADMIN_JWT_SCRECET_KEY, { expiresIn: '1h' });
        res.status(200).json({ name: admin.name, email, token });
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message });
        res.status(400).json({ message: "something wrong" });
    }
});
exports.adminLogin = adminLogin;
