import { Router} from "express";
import addCartItem from "../controllers/addCartItem.controller";
import { body } from "express-validator";
import getCartProducts from "../controllers/getCartProducts.controller";
import changeCartQuantity from "../controllers/changeCartQuantity.controller";
import { removeCartItem } from "../controllers/removeCartItem.controller";

const router=Router();

const validationRule=[
    body('user_id').notEmpty().withMessage('user id required'),
    body('product_id').notEmpty().withMessage('product id required')
]
const validationRule_getProducts=[
    body('user_id').notEmpty().withMessage('user id required'),
]
const validationRule_changeQuantity=[
    body('')
]
router.post('/additem',validationRule,addCartItem);
router.post('/getitems',validationRule_getProducts,getCartProducts)
router.post('/changequantity',validationRule_changeQuantity,changeCartQuantity)
router.delete('/removeitem/:cartitem_id',removeCartItem)

export default router;