"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryconfig = void 0;
const cloudinary_1 = require("cloudinary");
exports.cloudinaryconfig = cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
