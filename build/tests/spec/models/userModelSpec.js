"use strict";
/* eslint-disable no-undef */
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
const userModel_1 = require("../../../models/userModel");
const user = new userModel_1.userModel();
let user_id;
describe("User Model", function () {
    describe("Check metheods to be defined", function () {
        it("should create a user", () => __awaiter(this, void 0, void 0, function* () {
            const u = {
                firstName: "Mahmoud",
                lastName: "Hussein",
                userName: "MH",
                password: "pass123",
            };
            const result = yield user.create(u);
            user_id = result.id;
            expect(result.firstName).toEqual("Mahmoud");
            expect(result.lastName).toEqual("Hussein");
            expect(result.userName).toEqual("MH");
            expect(result.password).toBeDefined();
        }));
        it("should get all users", () => __awaiter(this, void 0, void 0, function* () {
            const users = yield user.index();
            expect(users).toHaveSize(users.length);
        }));
        it("should get a user by id", () => __awaiter(this, void 0, void 0, function* () {
            const result = yield user.show(user_id);
            expect(result.firstName).toEqual("Mahmoud");
            expect(result.lastName).toEqual("Hussein");
            expect(result.userName).toEqual("MH");
            expect(result.password).toBeDefined();
        }));
        it("should delete a user by id", () => __awaiter(this, void 0, void 0, function* () {
            const result = yield user.delete(user_id);
            expect(result.firstName).toEqual("Mahmoud");
            expect(result.lastName).toEqual("Hussein");
            expect(result.userName).toEqual("MH");
            expect(result.password).toBeDefined();
        }));
    });
});
