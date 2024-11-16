"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const SignIn_1 = __importDefault(require("../controllers/SignIn"));
const router = (0, express_1.Router)();
const validatorRule = [
    (0, express_validator_1.body)('email').isEmail().withMessage("email is required"),
    (0, express_validator_1.body)("password").notEmpty().withMessage("password required")
];
router.post('/', validatorRule, SignIn_1.default);
exports.default = router;
