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
const userModel_1 = require("../models/userModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../middlewares/auth");
const user = new userModel_1.userModel();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user.index();
        res.status(200);
        res.json(users);
    }
    catch (err) {
        res.status(401);
        throw new Error(`Couldn't get users. Error: ${err}`);
    }
});
const getUser = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = parseInt(_req.params.id);
        const userById = yield user.show(user_id);
        res.status(200);
        res.json(userById);
    }
    catch (err) {
        res.status(401);
        throw new Error(`Couldn't get user. Error: ${err}`);
    }
});
const createUser = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const u = {
            firstName: _req.body.first_name,
            lastName: _req.body.last_name,
            userName: _req.body.username,
            password: _req.body.password,
        };
        const createdUser = yield user.create(u);
        res.status(200);
        res.json(createdUser);
    }
    catch (err) {
        res.status(401);
        throw new Error(`Couldn't create user. Error: ${err}`);
    }
});
const deleteUser = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = parseInt(_req.params.id);
        const deletedUser = yield user.delete(user_id);
        res.status(200);
        res.json(deletedUser);
    }
    catch (err) {
        res.status(401);
        throw new Error(`Couldn't delete user. Error: ${err}`);
    }
});
const authenticate = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = {
            username: _req.body.username,
            password: _req.body.password,
        };
        const SECRET = process.env.TOKEN_SECRET;
        const u = yield user.authenticate(username, password);
        if (u) {
            const token = jsonwebtoken_1.default.sign({ user: u }, SECRET);
            res.json(token);
        }
        else {
            throw new Error();
        }
    }
    catch (err) {
        res.status(401);
        res.json("invalid username or password");
        return;
    }
});
const userRoutes = (app) => {
    app.get("/users", auth_1.authenticator, index);
    app.get("/signin", authenticate);
    app.get("/users/:id", auth_1.authenticator, getUser);
    app.post("/register", createUser);
    app.delete("/users/:id", auth_1.authenticator, deleteUser);
};
exports.default = userRoutes;
