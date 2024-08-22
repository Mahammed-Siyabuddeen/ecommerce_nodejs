import { Router } from "express";
import { forgetPassword } from "../controllers/forgetPassword.controller";
import { resetPassword } from "../controllers/resetPassword.controller";
import { adminLogin } from "../controllers/adminLogin.controller";
import { adminSignup } from "../controllers/adminSingup.controller";
import { getCustomers } from "../controllers/getCustomers.controller";
import adminAuth from "../middleware/adminAuth.middleware";

const router = Router();


router.post('/forget-password',forgetPassword)
router.post('/reset-password/:token',resetPassword)
router.post('/admin/login',adminLogin)
router.get('/customers',adminAuth,getCustomers)
// router.post('/admin/signup',adminSignup)

export default router