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
exports.userModel = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const { salt, pepper } = {
    salt: process.env.SALT_ROUNDS,
    pepper: process.env.BCRYPT_PASSWORD,
};
class userModel {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT * FROM users`;
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get users. Error: ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * FROM users WHERE id=$1";
                const result = yield conn.query(sql, [id]);
                conn.release();
                console.log("delete", result.rows);
                const { first_name, last_name, username, password } = result.rows[0];
                return {
                    firstName: first_name,
                    lastName: last_name,
                    userName: username,
                    password,
                };
            }
            catch (err) {
                throw new Error(`Could not find user ${id}. Error: ${err}`);
            }
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)  RETURNING *";
                const hashedPass = bcrypt_1.default.hashSync(user.password + pepper, parseInt(salt));
                const result = yield conn.query(sql, [
                    user.firstName,
                    user.lastName,
                    user.userName,
                    hashedPass,
                ]);
                conn.release();
                const { id, first_name, last_name, username, password } = result.rows[0];
                return {
                    id: id,
                    firstName: first_name,
                    lastName: last_name,
                    userName: username,
                    password,
                };
            }
            catch (err) {
                throw new Error(`Could not create user. ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "DELETE FROM users WHERE id=($1)";
                const result = yield conn.query(sql, [id]);
                conn.release();
                console.log("delete", result.rows);
                const { first_name, last_name, username, password } = result.rows[0];
                return {
                    firstName: first_name,
                    lastName: last_name,
                    userName: username,
                    password,
                };
            }
            catch (err) {
                throw new Error(`Could not delete user ${id}. Error: ${err}`);
            }
        });
    }
    authenticate(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT password FROM users WHERE username=($1)";
                const result = yield conn.query(sql, [username]);
                conn.release();
                if (result.rows.length) {
                    const user = result.rows[0];
                    if (bcrypt_1.default.compareSync(password + pepper, user.password)) {
                        return user;
                    }
                }
                return null;
            }
            catch (err) {
                throw new Error(`Error: ${err}`);
            }
        });
    }
}
exports.userModel = userModel;
