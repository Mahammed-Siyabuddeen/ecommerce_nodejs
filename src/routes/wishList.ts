import { Router } from "express";
import { addTowishList } from "../controllers/addToWishList.controller";
import { getWishListItems } from "../controllers/getWishListItems.controller";
import { removeWishListItem } from "../controllers/removewishListItem";

const router=Router();

router.post('/additem',addTowishList)
router.post('/getitems',getWishListItems)
router.delete('/removeitem/:item_id',removeWishListItem)
export default router;