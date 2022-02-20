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
const server_1 = require("../../../server");
const req = (0, supertest_1.default)(server_1.app);
let user_id;
describe("User Endpoints", function () {
    describe("/users request verbs", function () {
        it("gets the api endpoint /register", () => __awaiter(this, void 0, void 0, function* () {
            const res = yield req.post("/register").send({
                first_name: "Moaz",
                last_name: "Muhammad",
                username: "MOZ",
                password: "password123",
            });
            user_id = res.body.id;
            expect(res.status).toBe(200);
        }));
        it("gets the api endpoint /users", () => __awaiter(this, void 0, void 0, function* () {
            //Get authorization token
            const signinRes = yield req
                .post("/signin")
                .send({ username: "MOZ", password: "password123" });
            //Send the request
            const res = yield req
                .get("/users")
                .set({ Authorization: "bearer " + signinRes.body });
            expect(res.status).toBe(200);
        }));
        it("gets the api endpoint /signin", () => __awaiter(this, void 0, void 0, function* () {
            const res = yield req
                .post("/signin")
                .send({ username: "MOZ", password: "password123" });
            expect(res.status).toBe(200);
        }));
        it("gets the api endpoint /users/:id", () => __awaiter(this, void 0, void 0, function* () {
            //Get authorization token
            const signinRes = yield req
                .post("/signin")
                .send({ username: "MOZ", password: "password123" });
            //Send the request
            const res = yield req
                .get(`/users/${user_id}`)
                .set({ Authorization: "bearer " + signinRes.body });
            expect(res.status).toBe(200);
        }));
        it("delete a user /users/:id", () => __awaiter(this, void 0, void 0, function* () {
            const signinRes = yield req
                .post("/signin")
                .send({ username: "MOZ", password: "password123" });
            const res = yield req
                .delete(`/users/${user_id}`)
                .set({ Authorization: "bearer " + signinRes.body });
            expect(res.status).toBe(200);
        }));
    });
});
