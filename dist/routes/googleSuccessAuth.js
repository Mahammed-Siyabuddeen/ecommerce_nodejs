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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const google_auth_library_1 = require("google-auth-library");
const customers_model_1 = require("../models/customers.model");
const router = (0, express_1.Router)();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('helo', req.body);
        const { clientId, credential } = req.body;
        const client = new google_auth_library_1.OAuth2Client();
        const ticket = yield client.verifyIdToken({ idToken: credential, audience: clientId });
        const payload = ticket.getPayload();
        if (!payload)
            return res.status(401).send('error');
        const { email, name, given_name, family_name } = payload;
        const customerAlreadyExsist = yield customers_model_1.CustomerModel.find({ email });
        if (!customerAlreadyExsist.length) {
            const db = yield customers_model_1.CustomerModel.create({
                first_name: name,
                last_name: family_name || given_name,
                email,
                auth_type: 'google'
            });
            return res.status(201).json({ _id: db._id, first_name: name, last_name: family_name || given_name, email, token: credential });
        }
        return res.status(201).json({ _id: customerAlreadyExsist[0]._id, first_name: name, last_name: family_name || given_name, email, token: credential });
    }
    catch (error) {
        console.log(error);
        res.status(401).send('error');
    }
}));
exports.default = router;
