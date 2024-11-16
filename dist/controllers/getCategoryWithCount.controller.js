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
const category_model_1 = require("../models/category.model");
const getCategoryWithCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield category_model_1.categoryModel.aggregate([
            {
                $lookup: {
                    from: 'products',
                    localField: '_id',
                    foreignField: 'category_id',
                    as: 'products'
                }
            },
            {
                $project: {
                    name: 1,
                    _id: 1,
                    totalProduct: { $size: '$products' }
                }
            }
        ]);
        res.status(200).json(db);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message });
        res.status(400).json({ message: "something wrong" });
    }
});
exports.default = getCategoryWithCount;
