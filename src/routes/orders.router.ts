import { Router } from "express";
import { orderProduct } from "../controllers/orderProduct.controller";
import orderProductById from "../controllers/orderProductById.controller";
import { getAllOrders } from "../controllers/getAllOrders.controller";

const router=Router();

router.post('/',orderProduct);
router.get('/admin/getorders',getAllOrders)
router.get('/:order_id/:orderitem_id',orderProductById)
export default router;