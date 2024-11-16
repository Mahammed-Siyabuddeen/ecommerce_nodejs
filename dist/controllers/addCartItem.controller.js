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
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const cart_model_1 = require("../models/cart.model");
const cartItem_model_1 = require("../models/cartItem.model");
const addCartItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            throw new Error(errors.array().toString());
        const { user_id, product_id, size } = req.body;
        console.log(user_id, product_id, size);
        const quantity = 1;
        let cart = yield cart_model_1.cartModel.findOne({ user_id });
        if (!cart) {
            cart = new cart_model_1.cartModel({ user_id });
        }
        let cartItem = yield cartItem_model_1.cartItemModel.findOne({ cart_id: cart === null || cart === void 0 ? void 0 : cart._id, product_id });
        if (cartItem) {
            cartItem.quantity += 1;
        }
        else {
            cartItem = new cartItem_model_1.cartItemModel({ cart_id: cart === null || cart === void 0 ? void 0 : cart._id, product_id, quantity, size: size });
        }
        cart.updated_at = new Date();
        cartItem.save();
        cart.save();
        const data = yield Promise.all([cart, cartItem]);
        console.log(data);
        console.log('sucees');
        res.status(201).json({ _id: data[0]._id, cartItem_id: data[1]._id, quantity: data[1].quantity });
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message });
        res.status(400).json({ message: "something wrong" });
    }
});
exports.default = addCartItem;
