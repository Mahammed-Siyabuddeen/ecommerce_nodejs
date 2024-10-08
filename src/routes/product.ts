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
import { getallProductDetails } from "../controllers/getAllProuductDetails.controller";
import { relatedProduct } from "../controllers/relatedProduct.controller";
import { popularProduct } from "../controllers/popularProduct.controller";
import { categoryByName } from "../controllers/categoryByName.controller";
import adminAuth from "../middleware/adminAuth.middleware";


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
router.post('/addproduct',adminAuth,ProductUpload.array('file',4),AddProduct);
router.get('/getproducts',getproducts)
router.post('/addcategory',adminAuth,addCategory)
router.get('/getcategory',getCategory)
router.get('/getcategorywithcount',adminAuth,getCategoryWithCount)
router.get('/admin/getallproductdetails',adminAuth,getallProductDetails,)
router.get('/related-product',relatedProduct)
router.get('/popular-product',popularProduct)
router.get('/category-id',categoryByName)
router.get('/getproduct/:id',getProduct)

export default router