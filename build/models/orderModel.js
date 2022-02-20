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
exports.orderModel = void 0;
const database_1 = __importDefault(require("../database"));
class orderModel {
    getAllOrders(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * FROM orders WHERE user_id=($1)";
                const result = yield conn.query(sql, [userId]);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get all orders of user. Error: ${err}`);
            }
        });
    }
    getLastOrder(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * FROM orders WHERE user_id = $1 ORDER BY id DESC LIMIT 1";
                const result = conn.query(sql, [user_id]);
                conn.release();
                return (yield result).rows[0];
            }
            catch (err) {
                throw new Error(`could not get current order. Error: ${err}`);
            }
        });
    }
    create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *";
                const result = yield conn.query(sql, [order.status, order.user_id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not get create your order. Error: ${err}`);
            }
        });
    }
    getCompletedOrders(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * FROM orders WHERE user_id = $1 AND status = 'complete'";
                const result = yield conn.query(sql, [user_id]);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get completed orders. Error: ${err}`);
            }
        });
    }
    addProduct(order_id, product_id, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *";
                const result = yield conn.query(sql, [order_id, product_id, quantity]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not add product to your order. Error: ${err}`);
            }
        });
    }
    updateOrderStatus(status, order_Id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `UPDATE orders SET status=$1 WHERE id=$2 RETURNING *`;
                const result = yield conn.query(sql, [status, order_Id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not update order status. Error: ${err}`);
            }
        });
    }
    deleteOrder(order_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "DELETE FROM orders WHERE id=($1) RETURNING *";
                const result = yield conn.query(sql, [order_id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not delete your order. Error: ${err}`);
            }
        });
    }
}
exports.orderModel = orderModel;
