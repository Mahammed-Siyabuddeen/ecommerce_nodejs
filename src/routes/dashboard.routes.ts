import { Router } from "express";
import { getTotalSales } from "../controllers/getTotalSales.controller";
import { totalProducts } from "../controllers/totalProducts.controller";
import { totalCustomers } from "../controllers/totalCustomers.controller";
import { totalOrders } from "../controllers/totalOrders.controller";
import { salesbymonth } from "../controllers/salesByMonth.controlller";
import { totalProductByCatergory } from "../controllers/totalProductByCatergory.controller";
import { totalOrderByCity } from "../controllers/totalOrderByCity.controller";

const router=Router();
router.get('/totalsales',getTotalSales)
router.get('/totalproducts',totalProducts)
router.get('/totalcustomer',totalCustomers)
router.get('/totalorders',totalOrders)
router.get('/salesbymonth',salesbymonth),
router.get('/totalproductbycategory',totalProductByCatergory)
router.get('/totalorderbycity',totalOrderByCity)
export default router;

