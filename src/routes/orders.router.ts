import { Router } from "express";
import { orderProduct } from "../controllers/orderProduct.controller";

const router=Router();

router.post('/',orderProduct);
export default router;