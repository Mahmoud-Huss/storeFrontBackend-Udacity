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
let order_id;
let token;
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
                //sign in
                const signinRes = yield req
                    .post("/signin")
                    .send({ username: "MOZ", password: "password123" });
                token = "bearer " + signinRes.body;
            });
        });
        it("Creates an order through the endpoint /users/:id/orders", () => __awaiter(this, void 0, void 0, function* () {
            const res = yield req
                .post(`/users/${user_id}/orders`)
                .send({
                status: "active",
            })
                .set({ Authorization: token });
            order_id = res.body.id;
            expect(res.status).toBe(200);
        }));
        it("Add a product through /orders/:id/products", () => __awaiter(this, void 0, void 0, function* () {
            const res = yield req
                .post(`/orders/${order_id}/products`)
                .set({ Authorization: token });
            expect(res.status).toBe(200);
        }));
        it("Gets currnet order", () => __awaiter(this, void 0, void 0, function* () {
            const res = yield req
                .get(`/users/${user_id}/current-order`)
                .set({ Authorization: token });
            expect(res.status).toBe(200);
        }));
        it("Change order status through /orders/:id/status", () => __awaiter(this, void 0, void 0, function* () {
            const res = yield req
                .post(`/orders/${order_id}/status`)
                .send({
                status: "complete",
            })
                .set({ Authorization: token });
            expect(res.status).toBe(200);
        }));
        it("Gets completed orders through /users/:id/complete-orders", () => __awaiter(this, void 0, void 0, function* () {
            const res = yield req
                .get(`/users/${user_id}/complete-orders`)
                .set({ Authorization: token });
            expect(res.status).toBe(200);
        }));
        it("Gets orders through /users/:id/complete-orders", () => __awaiter(this, void 0, void 0, function* () {
            const res = yield req
                .get(`/users/${user_id}/orders`)
                .set({ Authorization: token });
            expect(res.status).toBe(200);
        }));
        it("delete an order through  /orders/:id", () => __awaiter(this, void 0, void 0, function* () {
            const res = yield req
                .delete(`/orders/${order_id}`)
                .set({ Authorization: token });
            expect(res.status).toBe(200);
        }));
        afterAll(function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield user.delete(user_id);
            });
        });
    });
});
