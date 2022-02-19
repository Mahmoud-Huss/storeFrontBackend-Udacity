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
/* eslint-disable no-undef */
const supertest_1 = __importDefault(require("supertest"));
const userModel_1 = require("../../../models/userModel");
const server_1 = require("../../../server");
const req = (0, supertest_1.default)(server_1.app);
const user = new userModel_1.userModel();
let user_id;
let product_id;
describe("Products Endpoints", function () {
    describe("/products request verbs", function () {
        beforeAll(function () {
            return __awaiter(this, void 0, void 0, function* () {
                //Create user
                const u = {
                    firstName: "Moaz",
                    lastName: "Muhammad",
                    userName: "MOZ",
                    password: "password123",
                };
                const result = yield user.create(u);
                user_id = result.id;
            });
        });
        it("Creates a product through the endpoint /products", () => __awaiter(this, void 0, void 0, function* () {
            const signinRes = yield req
                .get("/signin")
                .send({ username: "MOZ", password: "password123" });
            const res = yield req
                .post("/products")
                .send({
                name: "phone",
                price: 20,
                category: "tech",
            })
                .set({ Authorization: "bearer " + signinRes.body });
            product_id = res.body.id;
            expect(res.status).toBe(200);
        }));
        it("Gets all products through endpoint /products", () => __awaiter(this, void 0, void 0, function* () {
            const res = yield req.get("/products");
            expect(res.status).toBe(200);
        }));
        it("Gets top 5 products through endpoint /products/top", () => __awaiter(this, void 0, void 0, function* () {
            const res = yield req.get("/products/top");
            expect(res.status).toBe(200);
        }));
        it("Gets a product by id through /products/:id", () => __awaiter(this, void 0, void 0, function* () {
            const res = yield req.get(`/products/${product_id}`);
            expect(res.status).toBe(200);
        }));
        it("Gets a product  by category through /products/category", () => __awaiter(this, void 0, void 0, function* () {
            const res = yield req.get(`/products?category=tech`);
            expect(res.status).toBe(200);
        }));
        it("delete a product through  /products/:id", () => __awaiter(this, void 0, void 0, function* () {
            const signinRes = yield req
                .get("/signin")
                .send({ username: "MOZ", password: "password123" });
            const res = yield req
                .delete(`/products/${product_id}`)
                .set({ Authorization: "bearer " + signinRes.body });
            expect(res.status).toBe(200);
        }));
        afterAll(function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield user.delete(user_id);
            });
        });
    });
});
