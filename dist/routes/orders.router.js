"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderProduct_controller_1 = require("../controllers/orderProduct.controller");
const orderProductById_controller_1 = __importDefault(require("../controllers/orderProductById.controller"));
const getAllOrders_controller_1 = require("../controllers/getAllOrders.controller");
const changeOrderStatus_controller_1 = require("../controllers/changeOrderStatus.controller");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const adminAuth_middleware_1 = __importDefault(require("../middleware/adminAuth.middleware"));
const cancelOrder_controller_1 = require("../controllers/cancelOrder.controller");
const router = (0, express_1.Router)();
router.post('/', auth_middleware_1.default, orderProduct_controller_1.orderProduct);
router.get('/admin/getorders', adminAuth_middleware_1.default, getAllOrders_controller_1.getAllOrders);
router.post('/admin/changeorderstatus', adminAuth_middleware_1.default, changeOrderStatus_controller_1.changeorderstatus);
router.post('/cancelorder', auth_middleware_1.default, cancelOrder_controller_1.cancelOrder);
router.get('/:order_id/:orderitem_id', auth_middleware_1.default, orderProductById_controller_1.default);
exports.default = router;