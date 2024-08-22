import { Router } from "express";
import { addProductReview } from "../controllers/addProductReview.controller";
import { getReviews } from "../controllers/getReviews.controller";
import { totalRating } from "../controllers/totalRating.controller";
import userAuth from "../middleware/auth.middleware";

const router=Router();


router.get('/reviews/:product_id',userAuth,getReviews)
router.get('/totalrating/:product_id',userAuth,totalRating)
router.post('/addproductreview',userAuth,addProductReview);

export default router;