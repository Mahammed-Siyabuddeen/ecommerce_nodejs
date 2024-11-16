"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const addBanner_controller_1 = require("../controllers/addBanner.controller");
const adminAuth_middleware_1 = __importDefault(require("../middleware/adminAuth.middleware"));
const multer_middleware_1 = require("../middleware/multer.middleware");
const getBanners_controller_1 = require("../controllers/getBanners.controller");
const router = (0, express_1.Router)();
router.post('/addbanner', multer_middleware_1.ProductUpload.single('file'), adminAuth_middleware_1.default, addBanner_controller_1.addBanner);
router.get('/getbanners', getBanners_controller_1.getBanners);
exports.default = router;
