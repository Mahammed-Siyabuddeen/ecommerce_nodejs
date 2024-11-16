"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const addProductReview_controller_1 = require("../controllers/addProductReview.controller");
const getReviews_controller_1 = require("../controllers/getReviews.controller");
const totalRating_controller_1 = require("../controllers/totalRating.controller");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const router = (0, express_1.Router)();
router.get('/reviews/:product_id', getReviews_controller_1.getReviews);
router.get('/totalrating/:product_id', totalRating_controller_1.totalRating);
router.post('/addproductreview', auth_middleware_1.default, addProductReview_controller_1.addProductReview);
exports.default = router;
