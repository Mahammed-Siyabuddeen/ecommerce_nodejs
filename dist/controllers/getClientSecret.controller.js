"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientSecret = void 0;
const stripe_1 = __importDefault(require("stripe"));
const getClientSecret = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
        const { amount, cart_id, cartItem_id, user_id, name, street, city, zipcode, state, country, phone } = req.body;
        console.log(req.body);
        const paymentIntents = yield stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            automatic_payment_methods: { enabled: true },
            metadata: {
                user_id,
                cart_id,
                cartItem_id,
                amount: amount,
                name,
                street,
                city,
                zipcode,
                state,
                country,
                phone
            }
        });
        console.log('get client id successfully');
        res.status(201).json({ clientSecret: paymentIntents.client_secret });
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message });
        res.status(400).json({ message: "something wrong" });
    }
});
exports.getClientSecret = getClientSecret;
