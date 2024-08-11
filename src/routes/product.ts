import { Router } from "express";
import AddProduct from "../controllers/AddProduct.controller";
import { body } from 'express-validator'
import multer from "multer"
import  { CloudinaryStorage } from "multer-storage-cloudinary"
import { v2 as cloudinary } from 'cloudinary'
import { ProductUpload } from "../middleware/multer.middleware";
import { getproducts } from "../controllers/getProducts.controller";
import addCategory from "../controllers/addCategory.controller";
import getCategory from "../controllers/getCategory.controller";
import getCategoryWithCount from "../controllers/getCategoryWithCount.controller";
import { getProduct } from "../controllers/getProduct.controller";


const router=Router()
const storage =new CloudinaryStorage({
    cloudinary:cloudinary,
    })

//  const ProductUpload = multer({ storage })
const validatorRule=[
    body("name").notEmpty().withMessage("product name required"),
    body("description").notEmpty().withMessage("product description is required"),
    body("price").isNumeric().withMessage("product price must be numeric"),
    body("category_id").notEmpty().withMessage("product category required"),
    body("stock_quantity").isNumeric().withMessage("stock quantity required"),
]
router.post('/addproduct',ProductUpload.array('file',4),AddProduct);
router.get('/getproducts',getproducts)
router.get('/getproduct/:id',getProduct)
router.post('/addcategory',addCategory)
router.get('/getcategory',getCategory)
router.get('/getcategorywithcount',getCategoryWithCount)

export default router