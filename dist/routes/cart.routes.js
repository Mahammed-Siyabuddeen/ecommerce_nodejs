"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const addCartItem_controller_1 = __importDefault(require("../controllers/addCartItem.controller"));
const express_validator_1 = require("express-validator");
const getCartProducts_controller_1 = __importDefault(require("../controllers/getCartProducts.controller"));
const changeCartQuantity_controller_1 = __importDefault(require("../controllers/changeCartQuantity.controller"));
const removeCartItem_controller_1 = require("../controllers/removeCartItem.controller");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const getCartCount_controller_1 = require("../controllers/getCartCount.controller");
const router = (0, express_1.Router)();
const validationRule = [
    (0, express_validator_1.body)('user_id').notEmpty().withMessage('user id required'),
    (0, express_validator_1.body)('product_id').notEmpty().withMessage('product id required')
];
const validationRule_getProducts = [
    (0, express_validator_1.body)('user_id').notEmpty().withMessage('user id required'),
];
const validationRule_changeQuantity = [
    (0, express_validator_1.body)('')
];
router.post('/additem', auth_middleware_1.default, validationRule, addCartItem_controller_1.default);
router.post('/getitems', auth_middleware_1.default, validationRule_getProducts, getCartProducts_controller_1.default);
router.post('/changequantity', auth_middleware_1.default, validationRule_changeQuantity, changeCartQuantity_controller_1.default);
router.post('/cartcount', auth_middleware_1.default, getCartCount_controller_1.getCartCount);
router.delete('/removeitem/:cartitem_id', auth_middleware_1.default, removeCartItem_controller_1.removeCartItem);
exports.default = router;
