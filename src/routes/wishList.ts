import { Router } from "express";
import { addTowishList } from "../controllers/addToWishList.controller";
import { getWishListItems } from "../controllers/getWishListItems.controller";
import { removeWishListItem } from "../controllers/removewishListItem";
import userAuth from "../middleware/auth.middleware";

const router=Router();

router.post('/additem',userAuth,addTowishList)
router.post('/getitems',userAuth,getWishListItems)
router.delete('/removeitem/:item_id',userAuth,removeWishListItem)
export default router;