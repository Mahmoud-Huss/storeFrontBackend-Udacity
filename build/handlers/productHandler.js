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
const auth_1 = require("../middlewares/auth");
const productModel_1 = require("../models/productModel");
const ProductObj = new productModel_1.productModel();
const getAllProducts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield ProductObj.index();
        res.status(200);
        res.json(products);
    }
    catch (err) {
        res.status(400);
        throw new Error(`Could not get all products. Error: ${err}`);
    }
});
const getProductById = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product_id = parseInt(_req.params.id);
        const product = yield ProductObj.getProductById(product_id);
        res.status(200);
        res.json(product);
    }
    catch (err) {
        res.status(400);
        throw new Error(`Could not get product. Error: ${err}`);
    }
});
const create = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productParam = {
            name: _req.body.name,
            price: _req.body.price,
            category: _req.body.category,
        };
        const product = yield ProductObj.create(productParam);
        res.status(200);
        res.json(product);
    }
    catch (err) {
        res.status(400);
        throw new Error(`Error: ${err}`);
    }
});
const getProductsByCategory = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = _req.query.category;
        const prodcutsByCategory = yield ProductObj.getProductsByCategory(category);
        res.status(200);
        res.json(prodcutsByCategory);
    }
    catch (err) {
        res.status(400);
        throw new Error(`Could not get products of specified category. Error: ${err}`);
    }
});
const getTopProducts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const topProducts = yield ProductObj.topProducts();
        res.status(200);
        res.json(topProducts);
    }
    catch (err) {
        res.status(400);
        throw new Error(`Couldn't get top products. Error: ${err}`);
    }
});
const deleteProduct = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product_id = parseInt(_req.params.id);
        const deleted = yield ProductObj.deleteProduct(product_id);
        res.status(200);
        res.json(deleted);
    }
    catch (err) {
        res.status(400);
        throw new Error(`Could not delete specified product. Error: ${err}`);
    }
});
const productRoutes = (app) => {
    app.get("/products", getAllProducts);
    app.get("/products", getProductsByCategory);
    app.get("/products/top", getTopProducts);
    app.get("/products/:id", getProductById);
    app.post("/products", auth_1.authenticator, create);
    app.delete("/products/:id", auth_1.authenticator, deleteProduct);
};
exports.default = productRoutes;
