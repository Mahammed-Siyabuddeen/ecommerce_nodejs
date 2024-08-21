import { Router } from "express";
import { addProductReview } from "../controllers/addProductReview.controller";
import { getReviews } from "../controllers/getReviews.controller";
import { totalRating } from "../controllers/totalRating.controller";

const router=Router();


router.get('/reviews/:product_id',getReviews)
router.get('/totalrating/:product_id',totalRating)
router.post('/addproductreview',addProductReview);

export default router;