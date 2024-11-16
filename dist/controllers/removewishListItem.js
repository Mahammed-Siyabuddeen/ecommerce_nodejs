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
exports.removeWishListItem = void 0;
const wishlist_model_1 = require("../models/wishlist.model");
const removeWishListItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { item_id } = req.params;
        yield wishlist_model_1.wishListModel.findByIdAndDelete(item_id);
        res.status(204).json({ message: "successfully removed" });
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message });
        res.status(400).json({ message: "something wrong" });
    }
});
exports.removeWishListItem = removeWishListItem;
