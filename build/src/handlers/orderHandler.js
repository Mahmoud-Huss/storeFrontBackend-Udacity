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
exports.orderRoutes = void 0;
const auth_1 = require("../middlewares/auth");
const orderModel_1 = require("../models/orderModel");
const orderObj = new orderModel_1.orderModel();
const getOrders = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = parseInt(_req.params.id);
        const orders = yield orderObj.getAllOrders(user_id);
        res.status(200);
        res.json(orders);
    }
    catch (err) {
        res.status(400);
        throw new Error(`Couldn't get orders. Error: ${err}`);
    }
});
const createOrder = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = parseInt(_req.params.id);
        const status = _req.body.status;
        const order = yield orderObj.create(user_id, status);
        res.status(200);
        res.json(order);
    }
    catch (err) {
        res.status(400);
        throw new Error(`Couldn't create orders. Error: ${err}`);
    }
});
const addProduct = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order_Id = parseInt(_req.params.id);
        const product_id = _req.body.product_id;
        const quantity = _req.body.quantity;
        const product = yield orderObj.addProduct(order_Id, product_id, quantity);
        res.status(200);
        res.json(product);
    }
    catch (err) {
        res.status(400);
        throw new Error(`Couldn't get orders. Error: ${err}`);
    }
});
const getCompletedOrders = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = parseInt(_req.params.id);
        const completedOrders = yield orderObj.getCompletedOrders(user_id);
        res.status(200);
        res.json(completedOrders);
    }
    catch (err) {
        res.status(400);
        throw new Error(`Couldn't get completed orders. Error: ${err}`);
    }
});
const getCurrentOrder = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = parseInt(_req.params.id);
        const order = yield orderObj.getLastOrder(user_id);
        res.status(200);
        res.json(order);
    }
    catch (err) {
        res.status(400);
        throw new Error(`Couldn't get current order. Error: ${err}`);
    }
});
const updateOrderStatus = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order_Id = parseInt(_req.params.id);
        const status = _req.body.status;
        const updatedOrderStatus = yield orderObj.updateOrderStatus(status, order_Id);
        res.status(200);
        res.json(updatedOrderStatus);
    }
    catch (err) {
        throw new Error(`Could not update status for the order. Error: ${err}`);
    }
});
const deleteOrder = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order_id = parseInt(_req.params.id);
        const deletedOrder = yield orderObj.deleteOrder(order_id);
        res.status(200);
        res.json(deletedOrder);
    }
    catch (err) {
        res.status(400);
        throw new Error(`Couldn't delete order. Error: ${err}`);
    }
});
const orderRoutes = (app) => {
    app.get("/users/:id/orders", auth_1.authenticator, getOrders);
    app.get("/users/:id/complete-orders", auth_1.authenticator, getCompletedOrders);
    app.get("/users/:id/current-order", auth_1.authenticator, getCurrentOrder);
    app.post("/users/:id/orders", auth_1.authenticator, createOrder);
    app.post("/orders/:id/products", auth_1.authenticator, addProduct);
    app.post("/orders/:id/status", auth_1.authenticator, updateOrderStatus);
    app.delete("/orders/:id", auth_1.authenticator, deleteOrder);
};
exports.orderRoutes = orderRoutes;
