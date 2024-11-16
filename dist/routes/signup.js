"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const Signup_controller_1 = require("../controllers/Signup.controller");
const router = (0, express_1.Router)();
const validatorRule = [
    (0, express_validator_1.body)('first_name').notEmpty().withMessage("firstname is required"),
    (0, express_validator_1.body)("phone_number").isMobilePhone("en-IN").withMessage("indian phone number is required"),
    (0, express_validator_1.body)("email").isEmail().withMessage("email id required"),
    (0, express_validator_1.body)("password").isStrongPassword().withMessage("strong password required"),
];
router.post('/', validatorRule, Signup_controller_1.Signup);
exports.default = router;
