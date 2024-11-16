"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const addToWishList_controller_1 = require("../controllers/addToWishList.controller");
const getWishListItems_controller_1 = require("../controllers/getWishListItems.controller");
const removewishListItem_1 = require("../controllers/removewishListItem");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const router = (0, express_1.Router)();
router.post('/additem', auth_middleware_1.default, addToWishList_controller_1.addTowishList);
router.post('/getitems', auth_middleware_1.default, getWishListItems_controller_1.getWishListItems);
router.delete('/removeitem/:item_id', auth_middleware_1.default, removewishListItem_1.removeWishListItem);
exports.default = router;
