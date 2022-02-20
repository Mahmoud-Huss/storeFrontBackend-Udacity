"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticator = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticator = (_req, res, next) => {
    try {
        const authorizationHeader = _req.headers.authorization;
        const token = authorizationHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (err) {
        res.status(401);
        res.json("Access denied, invalid token!");
        return;
    }
};
exports.authenticator = authenticator;
