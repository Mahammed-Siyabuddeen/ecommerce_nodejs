import { Request, Response, Router } from "express";
import Stripe from "stripe";
import express from "express";
import { webHook } from "../controllers/webHook.controller";
import { getClientSecret } from "../controllers/getClientSecret.controller";
import userAuth from "../middleware/auth.middleware";

const stripe = new Stripe('sk_test_51PlwiKGBMIgRPdYIW7uCxvuoPgPv8hDDe6fRr4s3d95Sj3AzQglp6MU7UPXcYwTcwztlsQ42JuVrT395neBKpMa500pciZTsna')
const router=Router();

router.post('/get-client-secret',userAuth,getClientSecret)

router.post('/webhook', express.raw({ type: 'application/json' }),webHook)
export default router;