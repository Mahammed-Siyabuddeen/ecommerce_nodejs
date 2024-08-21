import { Router } from "express";
import { forgetPassword } from "../controllers/forgetPassword.controller";
import { resetPassword } from "../controllers/resetPassword.controller";
import { adminLogin } from "../controllers/adminLogin.controller";
import { adminSignup } from "../controllers/adminSingup.controller";

const router = Router();


router.post('/forget-password',forgetPassword)
router.post('/reset-password/:token',resetPassword)
router.post('/admin/login',adminLogin)
// router.post('/admin/signup',adminSignup)

export default router