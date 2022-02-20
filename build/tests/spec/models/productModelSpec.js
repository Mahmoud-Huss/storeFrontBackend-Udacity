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
/* eslint-disable no-undef */
const productModel_1 = require("../../../models/productModel");
const productObj = new productModel_1.productModel();
let product_id;
describe("Product Model test", function () {
    describe("Check metheods to be defined", function () {
        it("should create a product", () => __awaiter(this, void 0, void 0, function* () {
            const p = {
                name: "phone",
                price: 20,
                category: "tech"
            };
            const result = yield productObj.create(p);
            product_id = result.id;
            expect(result.name).toEqual("phone");
            expect(result.price).toEqual(20);
            expect(result.category).toEqual("tech");
        }));
        it("should get all products", () => __awaiter(this, void 0, void 0, function* () {
            const products = yield productObj.index();
            expect(products).toHaveSize(products.length);
        }));
        it("should get top 5 products", () => __awaiter(this, void 0, void 0, function* () {
            const products = yield productObj.topProducts();
            expect(products).toHaveSize(products.length);
        }));
        it("should get a product by id", () => __awaiter(this, void 0, void 0, function* () {
            const result = yield productObj.getProductById(product_id);
            expect(result.name).toEqual("phone");
            expect(result.price).toEqual(20);
            expect(result.category).toEqual("tech");
        }));
        it("should get a product by category", () => __awaiter(this, void 0, void 0, function* () {
            const result = yield productObj.getProductsByCategory("tech");
            expect(result[0].name).toEqual("phone");
            expect(result[0].price).toEqual(20);
            expect(result[0].category).toEqual("tech");
        }));
        it("should delete a product by id", () => __awaiter(this, void 0, void 0, function* () {
            const result = yield productObj.deleteProduct(product_id);
            expect(result.name).toEqual("phone");
            expect(result.price).toEqual(20);
            expect(result.category).toEqual("tech");
        }));
    });
});
