import { Router } from "express";
import { orderProduct } from "../controllers/orderProduct.controller";
import orderProductById from "../controllers/orderProductById.controller";
import { getAllOrders } from "../controllers/getAllOrders.controller";
import { changeorderstatus } from "../controllers/changeOrderStatus.controller";

const router=Router();

router.post('/',orderProduct);
router.get('/admin/getorders',getAllOrders)
router.post('/admin/changeorderstatus',changeorderstatus)
router.get('/:order_id/:orderitem_id',orderProductById)
export default router;