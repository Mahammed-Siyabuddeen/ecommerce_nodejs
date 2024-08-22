import { Router } from "express";
import { getTotalSales } from "../controllers/getTotalSales.controller";
import { totalProducts } from "../controllers/totalProducts.controller";
import { totalCustomers } from "../controllers/totalCustomers.controller";
import { totalOrders } from "../controllers/totalOrders.controller";
import { salesbymonth } from "../controllers/salesByMonth.controlller";
import { totalProductByCatergory } from "../controllers/totalProductByCatergory.controller";
import { totalOrderByCity } from "../controllers/totalOrderByCity.controller";
import adminAuth from "../middleware/adminAuth.middleware";

const router=Router();
router.get('/totalsales',adminAuth,getTotalSales)
router.get('/totalproducts',adminAuth,totalProducts)
router.get('/totalcustomer',adminAuth,totalCustomers)
router.get('/totalorders',adminAuth,totalOrders)
router.get('/salesbymonth',adminAuth,salesbymonth),
router.get('/totalproductbycategory',adminAuth,totalProductByCatergory)
router.get('/totalorderbycity',adminAuth,totalOrderByCity)
export default router;

