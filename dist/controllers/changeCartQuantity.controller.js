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
const cartItem_model_1 = require("../models/cartItem.model");
const changeCartQuantity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            throw new Error(errors.array().toString());
        const { cartItem_id, quantity } = req.body;
        const cartItem = yield cartItem_model_1.cartItemModel.findById(cartItem_id);
        if (!cartItem)
            throw new Error("cartitem id invalid please check");
        cartItem.quantity += quantity;
        if (cartItem.quantity < 1)
            cartItem.quantity = 1;
        cartItem.save();
        res.status(201).json("succesfful qauntity updated");
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message });
        res.status(400).json({ message: "something wrong" });
    }
});
exports.default = changeCartQuantity;
