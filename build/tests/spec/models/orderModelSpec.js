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
const orderModel_1 = require("../../../models/orderModel");
const userModel_1 = require("../../../models/userModel");
const productModel_1 = require("../../../models/productModel");
const database_1 = __importDefault(require("../../../database"));
const orderObj = new orderModel_1.orderModel();
const user = new userModel_1.userModel();
const productObj = new productModel_1.productModel();
let order_id;
let user_id;
let product_id;
describe("Order Model test", function () {
    beforeAll(function () {
        return __awaiter(this, void 0, void 0, function* () {
            //Create user
            const u = {
                firstName: "Mahmoud",
                lastName: "Hussein",
                userName: "MH",
                password: "pass123",
            };
            const result = yield user.create(u);
            user_id = result.id;
            //Create product
            const p = {
                name: "phone",
                price: 40,
                category: "tech",
            };
            const productResult = yield productObj.create(p);
            product_id = productResult.id;
        });
    });
    describe("Check metheods to be defined", function () {
        it("should create an order", () => __awaiter(this, void 0, void 0, function* () {
            const o = {
                status: "active",
                user_id,
            };
            const result = yield orderObj.create(o);
            order_id = result.id;
            expect(result.status).toEqual("active");
        }));
        it("should get all orders", () => __awaiter(this, void 0, void 0, function* () {
            const orders = yield orderObj.getAllOrders(1);
            expect(orders).toHaveSize(orders.length);
        }));
        it("should get update order status", () => __awaiter(this, void 0, void 0, function* () {
            const result = yield orderObj.updateOrderStatus("complete", order_id);
            expect(result.status).toEqual("complete");
        }));
        it("should get completed orders", () => __awaiter(this, void 0, void 0, function* () {
            const result = yield orderObj.getCompletedOrders(user_id);
            expect(result[0].status).toEqual("complete");
        }));
        it("should get current order", () => __awaiter(this, void 0, void 0, function* () {
            const result = yield orderObj.getLastOrder(user_id);
            expect(result.status).toEqual("complete");
        }));
        it("should add a product order", () => __awaiter(this, void 0, void 0, function* () {
            const result = yield orderObj.addProduct(order_id, product_id, 3);
            expect(result.quantity).toEqual(3);
            expect(result.product_id).toEqual(product_id);
        }));
        it("should delete a order by id", () => __awaiter(this, void 0, void 0, function* () {
            const result = yield orderObj.deleteOrder(order_id);
            expect(result.status).toEqual("complete");
        }));
    });
    afterAll(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            yield conn.query("DELETE FROM orders;ALTER SEQUENCE orders_id_seq RESTART WITH 1;");
            conn.release();
        });
    });
});
