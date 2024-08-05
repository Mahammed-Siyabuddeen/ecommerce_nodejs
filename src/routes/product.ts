import { Router } from "express";
import AddProduct from "../controllers/AddProduct.controller";
import { body } from 'express-validator'
import multer from "multer"
import  { CloudinaryStorage } from "multer-storage-cloudinary"
import { v2 as cloudinary } from 'cloudinary'
import { ProductUpload } from "../middleware/multer.middleware";
import { getproducts } from "../controllers/getProducts.controller";

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
router.post('/addproduct',ProductUpload.array('file1',4),AddProduct);
router.get('/getproducts',getproducts)
export default router