import { Router } from "express";
import { body } from "express-validator";
import { Signup } from "../controllers/Signup.controller";
const router = Router();


const validatorRule = [
    body('first_name').notEmpty().withMessage("firstname is required"),
    body("phone_number").isMobilePhone("en-IN").withMessage("indian phone number is required"),
    body("email").isEmail().withMessage("email id required"),
    body("password").isStrongPassword().withMessage("strong password required"),
]

router.post('/', validatorRule, Signup)
export default router