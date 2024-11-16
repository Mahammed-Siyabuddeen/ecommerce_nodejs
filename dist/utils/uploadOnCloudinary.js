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
const cloudinary_1 = require("cloudinary");
const uploadOnCloudinary = (files) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (Array.isArray(files)) {
            const uploadedResult = Promise.all(files.map((file) => __awaiter(void 0, void 0, void 0, function* () { return yield cloudinary_1.v2.uploader.upload(file.path); })));
            return uploadedResult;
        }
        else {
            const result = yield cloudinary_1.v2.uploader.upload(files.path);
            return result.secure_url;
        }
    }
    catch (error) {
        console.log(error);
        throw new Error("cloudinary file upload wentwrong");
    }
});
exports.default = uploadOnCloudinary;
