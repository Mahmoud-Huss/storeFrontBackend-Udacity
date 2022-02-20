"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
let host, database, user, password;
if (process.env.ENV == "test") {
    const { POSTGRES_TEST_HOST, POSTGRES_TEST_DB, POSTGRES_TEST_USER, POSTGRES_TEST_PASSWORD, } = process.env;
    host = POSTGRES_TEST_HOST;
    database = POSTGRES_TEST_DB;
    user = POSTGRES_TEST_USER;
    password = POSTGRES_TEST_PASSWORD;
}
else {
    const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } = process.env;
    host = POSTGRES_HOST;
    database = POSTGRES_DB;
    user = POSTGRES_USER;
    password = POSTGRES_PASSWORD;
}
const DB = new pg_1.Pool({
    host,
    database,
    user,
    password,
});
exports.default = DB;
