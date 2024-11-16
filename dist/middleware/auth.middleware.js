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
const google_auth_library_1 = require("google-auth-library");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client = new google_auth_library_1.OAuth2Client();
const userAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const data = req.header('Authorization');
        if (!data)
            throw new Error('please login');
        const token = data.split(" ")[1];
        if (token.length < 500) {
            const decod = jsonwebtoken_1.default.verify(token, process.env.JWT_SCRECET_KEY);
            req.user = decod;
            if (!req.user)
                throw new Error('please login');
        }
        else {
            const ticket = yield client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID
            });
            const payload = ticket.getPayload();
            if (!((_a = payload === null || payload === void 0 ? void 0 : payload.email) === null || _a === void 0 ? void 0 : _a.length))
                throw new Error('please login');
        }
        next();
    }
    catch (error) {
        console.log(error);
        res.status(403).json({ message: "please login" });
    }
});
exports.default = userAuth;
