"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AddProduct_controller_1 = __importDefault(require("../controllers/AddProduct.controller"));
const express_validator_1 = require("express-validator");
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const cloudinary_1 = require("cloudinary");
const multer_middleware_1 = require("../middleware/multer.middleware");
const getProducts_controller_1 = require("../controllers/getProducts.controller");
const addCategory_controller_1 = __importDefault(require("../controllers/addCategory.controller"));
const getCategory_controller_1 = __importDefault(require("../controllers/getCategory.controller"));
const getCategoryWithCount_controller_1 = __importDefault(require("../controllers/getCategoryWithCount.controller"));
const getProduct_controller_1 = require("../controllers/getProduct.controller");
const getAllProuductDetails_controller_1 = require("../controllers/getAllProuductDetails.controller");
const relatedProduct_controller_1 = require("../controllers/relatedProduct.controller");
const popularProduct_controller_1 = require("../controllers/popularProduct.controller");
const categoryByName_controller_1 = require("../controllers/categoryByName.controller");
const adminAuth_middleware_1 = __importDefault(require("../middleware/adminAuth.middleware"));
const router = (0, express_1.Router)();
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
});
//  const ProductUpload = multer({ storage })
const validatorRule = [
    (0, express_validator_1.body)("name").notEmpty().withMessage("product name required"),
    (0, express_validator_1.body)("description").notEmpty().withMessage("product description is required"),
    (0, express_validator_1.body)("price").isNumeric().withMessage("product price must be numeric"),
    (0, express_validator_1.body)("category_id").notEmpty().withMessage("product category required"),
    (0, express_validator_1.body)("stock_quantity").isNumeric().withMessage("stock quantity required"),
];
router.post('/addproduct', adminAuth_middleware_1.default, multer_middleware_1.ProductUpload.array('file', 4), AddProduct_controller_1.default);
router.get('/getproducts', getProducts_controller_1.getproducts);
router.post('/addcategory', adminAuth_middleware_1.default, addCategory_controller_1.default);
router.get('/getcategory', getCategory_controller_1.default);
router.get('/getcategorywithcount', adminAuth_middleware_1.default, getCategoryWithCount_controller_1.default);
router.get('/admin/getallproductdetails', adminAuth_middleware_1.default, getAllProuductDetails_controller_1.getallProductDetails);
router.get('/related-product', relatedProduct_controller_1.relatedProduct);
router.get('/popular-product', popularProduct_controller_1.popularProduct);
router.get('/category-id', categoryByName_controller_1.categoryByName);
router.get('/getproduct/:id', getProduct_controller_1.getProduct);
exports.default = router;
