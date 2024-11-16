"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getTotalSales_controller_1 = require("../controllers/getTotalSales.controller");
const totalProducts_controller_1 = require("../controllers/totalProducts.controller");
const totalCustomers_controller_1 = require("../controllers/totalCustomers.controller");
const totalOrders_controller_1 = require("../controllers/totalOrders.controller");
const salesByMonth_controlller_1 = require("../controllers/salesByMonth.controlller");
const totalProductByCatergory_controller_1 = require("../controllers/totalProductByCatergory.controller");
const totalOrderByCity_controller_1 = require("../controllers/totalOrderByCity.controller");
const adminAuth_middleware_1 = __importDefault(require("../middleware/adminAuth.middleware"));
const router = (0, express_1.Router)();
router.get('/totalsales', adminAuth_middleware_1.default, getTotalSales_controller_1.getTotalSales);
router.get('/totalproducts', adminAuth_middleware_1.default, totalProducts_controller_1.totalProducts);
router.get('/totalcustomer', adminAuth_middleware_1.default, totalCustomers_controller_1.totalCustomers);
router.get('/totalorders', adminAuth_middleware_1.default, totalOrders_controller_1.totalOrders);
router.get('/salesbymonth', adminAuth_middleware_1.default, salesByMonth_controlller_1.salesbymonth),
    router.get('/totalproductbycategory', adminAuth_middleware_1.default, totalProductByCatergory_controller_1.totalProductByCatergory);
router.get('/totalorderbycity', adminAuth_middleware_1.default, totalOrderByCity_controller_1.totalOrderByCity);
exports.default = router;
