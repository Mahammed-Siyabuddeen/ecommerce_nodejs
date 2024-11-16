"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const forgetPassword_controller_1 = require("../controllers/forgetPassword.controller");
const resetPassword_controller_1 = require("../controllers/resetPassword.controller");
const adminLogin_controller_1 = require("../controllers/adminLogin.controller");
const adminSingup_controller_1 = require("../controllers/adminSingup.controller");
const getCustomers_controller_1 = require("../controllers/getCustomers.controller");
const adminAuth_middleware_1 = __importDefault(require("../middleware/adminAuth.middleware"));
const router = (0, express_1.Router)();
router.post('/forget-password', forgetPassword_controller_1.forgetPassword);
router.post('/reset-password/:token', resetPassword_controller_1.resetPassword);
router.post('/admin/login', adminLogin_controller_1.adminLogin);
router.get('/customers', adminAuth_middleware_1.default, getCustomers_controller_1.getCustomers);
router.post('/admin/signup', adminSingup_controller_1.adminSignup);
exports.default = router;
