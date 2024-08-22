import { Router } from "express";
import { orderProduct } from "../controllers/orderProduct.controller";
import orderProductById from "../controllers/orderProductById.controller";
import { getAllOrders } from "../controllers/getAllOrders.controller";
import { changeorderstatus } from "../controllers/changeOrderStatus.controller";
import userAuth from "../middleware/auth.middleware";
import adminAuth from "../middleware/adminAuth.middleware";
import { cancelOrder } from "../controllers/cancelOrder.controller";

const router=Router();

router.post('/',userAuth,orderProduct);
router.get('/admin/getorders',adminAuth,getAllOrders)
router.post('/admin/changeorderstatus',adminAuth,changeorderstatus)
router.post('/cancelorder',userAuth,cancelOrder)
router.get('/:order_id/:orderitem_id',userAuth,orderProductById)
export default router;