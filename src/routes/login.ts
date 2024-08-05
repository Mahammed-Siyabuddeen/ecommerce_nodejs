import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import { CustomerModel } from "../models/customers.model";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import SignIn from "../controllers/SignIn";

const router=Router();

const validatorRule=[
    body('email').isEmail().withMessage("email is required"),
    body("password").notEmpty().withMessage("password required")
]

router.post('/',validatorRule,SignIn)

export default router;