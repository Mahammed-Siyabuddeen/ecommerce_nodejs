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
const express_1 = __importDefault(require("express"));
const signup_1 = __importDefault(require("./routes/signup"));
const login_1 = __importDefault(require("./routes/login"));
const googleSuccessAuth_1 = __importDefault(require("./routes/googleSuccessAuth"));
const product_1 = __importDefault(require("./routes/product"));
const cart_routes_1 = __importDefault(require("./routes/cart.routes"));
const orders_router_1 = __importDefault(require("./routes/orders.router"));
const dashboard_routes_1 = __importDefault(require("./routes/dashboard.routes"));
const auth_routers_1 = __importDefault(require("./routes/auth.routers"));
const rating_routes_1 = __importDefault(require("./routes/rating.routes"));
const banner_routes_1 = __importDefault(require("./routes/banner.routes"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const cors_1 = __importDefault(require("cors"));
const cloudinaryConfig_1 = require("./utils/cloudinaryConfig");
const payment_router_1 = __importDefault(require("./routes/payment.router"));
const wishList_1 = __importDefault(require("./routes/wishList"));
const port = JSON.parse(process.env.PORT) || 9000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: process.env.CLIENT_URL, credentials: true }));
cloudinaryConfig_1.cloudinaryconfig;
cloudinary_1.v2.api.ping((error, result) => {
    if (error) {
        console.error('Error configuring Cloudinary:', error);
    }
    else {
        console.log('Cloudinary configuration successful:', result);
    }
});
app.get('/', (req, res) => {
    console.log(process.env.API_KEY);
    res.send(`hi, server is Running go to ${process.env.CLIENT_URL}`);
});
app.use('/signup', signup_1.default);
app.use('/login', login_1.default);
app.use('/auth', auth_routers_1.default);
app.use('/product', product_1.default);
app.use('/google-auth', googleSuccessAuth_1.default);
app.use('/cart', cart_routes_1.default);
app.use('/order', orders_router_1.default);
app.use('/payment', payment_router_1.default);
app.use('/wishlist', wishList_1.default);
app.use('/admin/dashboard', dashboard_routes_1.default);
app.use('/rating', rating_routes_1.default);
app.use('/banner', banner_routes_1.default);
app.post('/test', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public');
    },
    filename: (req, file, cb) => {
        const uniqe = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage });
mongoose_1.default.connect(process.env.DATABASE_URL).then(() => {
    console.log('mongodb connected');
}).catch((err) => {
    console.log(err);
});
app.listen(port, () => console.log(`server running on port localhost:${port}`));
