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
exports.webHook = void 0;
const order_model_1 = require("../models/order.model");
const cartItem_model_1 = require("../models/cartItem.model");
const Product_1 = require("../models/Product");
const mongoose_1 = __importDefault(require("mongoose"));
const orderItems_model_1 = require("../models/orderItems.model");
const address_model_1 = require("../models/address.model");
const payment_model_1 = require("../models/payment.model");
const sendEmail_util_1 = require("../utils/sendEmail.util");
const customers_model_1 = require("../models/customers.model");
const sendSms__util_1 = require("../utils/sendSms..util");
const webHook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('webhook comming');
    const endpointSecrect = 'whsec_47e85aae365be541f520655b2865b40664942b8df4d2eca90a86522c94ba1047';
    const sig = req.headers['stripe-signature'];
    let event;
    switch (req.body.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = req.body.data.object;
            // console.log();
            console.log('PaymentIntent was successful!', paymentIntent.metadata);
            // Fulfill the purchase, e.g., update the order in your database
            try {
                const { user_id, cart_id, cartItem_id, name, street, city, state, country, zipcode, phone } = paymentIntent.metadata;
                // insert address data
                const addressData = yield address_model_1.addressModel.create({
                    name,
                    street,
                    city,
                    state,
                    country,
                    zipcode,
                    phone,
                    user_id: new mongoose_1.default.Types.ObjectId(user_id)
                });
                // insert payment data
                const paymentData = yield payment_model_1.paymentModel.create({
                    transaction_id: req.body.id,
                    amount: paymentIntent.amount,
                });
                let conditionMatch = {};
                if (cartItem_id) {
                    conditionMatch._id = new mongoose_1.default.Types.ObjectId(cartItem_id);
                }
                else {
                    conditionMatch.cart_id = new mongoose_1.default.Types.ObjectId(cart_id);
                }
                // fecth cartdata through cart_id || cartitem_id
                const cartData = yield cartItem_model_1.cartItemModel.aggregate([
                    {
                        $match: conditionMatch,
                    },
                    {
                        $lookup: {
                            from: "products",
                            localField: "product_id",
                            foreignField: "_id",
                            as: "products"
                        }
                    },
                    {
                        $unwind: '$products'
                    },
                    {
                        $project: {
                            _id: 1,
                            product_id: 1,
                            quantity: 1,
                            price: '$products.price',
                            total: { $multiply: ["$products.price", "$quantity"] },
                        }
                    }
                ]);
                const promiseData = yield Promise.all([addressData, paymentData, cartData]);
                console.log('promiseData', promiseData);
                const mainData = promiseData[2];
                // insert arrayof orders and orderitem
                const uploadData = mainData.map((item) => __awaiter(void 0, void 0, void 0, function* () {
                    const order = yield order_model_1.orderModel.create({
                        user_id: user_id,
                        address_id: promiseData[0]._id,
                        payment_id: promiseData[1]._id,
                        total_amount: item.total
                    });
                    yield orderItems_model_1.orderItemsModel.create({
                        order_id: order._id,
                        price: item.price,
                        product_id: item.product_id,
                        quantity: item.quantity
                    });
                }));
                yield Promise.all(uploadData);
                // change arrayof products quantity
                const promiseUpdateQuanity = mainData.map((item) => Product_1.productModel.findByIdAndUpdate({ _id: item.product_id }, { $inc: { "stock_quantity": -item.quantity } }));
                yield Promise.all(promiseUpdateQuanity);
                // delete items from cartitems
                const promiseToDeleteCartItems = mainData.map((item) => cartItem_model_1.cartItemModel.findByIdAndDelete({ _id: item._id }));
                yield Promise.all(promiseToDeleteCartItems);
                // send email to customer
                const email = yield customers_model_1.CustomerModel.findById(user_id, { email: 1, _id: 0 });
                if (!email)
                    return;
                yield (0, sendEmail_util_1.sendEmail)({ email: (email), subject: 'Paircare Order' }).catch((err) => console.log('error in emal sending'));
                const d = '+91' + phone.toString();
                // send sms to customer
                (0, sendSms__util_1.sendSms)({ phone: d }).then((d) => console.log(d)).catch((err) => { });
            }
            catch (error) {
                console.log('switch catch error', error);
                res.status(400).json(error);
            }
            break;
        default:
            console.log(`Unhandled event type ${req.body.type}`);
    }
});
exports.webHook = webHook;
