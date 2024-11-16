"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stripe_1 = __importDefault(require("stripe"));
const express_2 = __importDefault(require("express"));
const webHook_controller_1 = require("../controllers/webHook.controller");
const getClientSecret_controller_1 = require("../controllers/getClientSecret.controller");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const stripe = new stripe_1.default('sk_test_51PlwiKGBMIgRPdYIW7uCxvuoPgPv8hDDe6fRr4s3d95Sj3AzQglp6MU7UPXcYwTcwztlsQ42JuVrT395neBKpMa500pciZTsna');
const router = (0, express_1.Router)();
router.post('/get-client-secret', auth_middleware_1.default, getClientSecret_controller_1.getClientSecret);
router.post('/webhook', express_2.default.raw({ type: 'application/json' }), webHook_controller_1.webHook);
exports.default = router;
