/* eslint-disable no-undef */
import supertest from "supertest";
import { User, userModel } from "../../../models/userModel";
import { app } from "../../../server";

const req = supertest(app);
const user = new userModel();

let user_id: number;
let product_id: number;

describe("Products Endpoints", function () {
  describe("/products request verbs", function () {
    beforeAll(async function () {
      //Create user
      const u: User = {
        firstName: "Moaz",
        lastName: "Muhammad",
        userName: "MOZ",
        password: "password123",
      };
      const result = await user.create(u);
      user_id = result.id as number;
    });

    it("Creates a product through the endpoint /products", async () => {
      const signinRes = await req
        .post("/signin")
        .send({ username: "MOZ", password: "password123" });
      const res = await req
        .post("/products")
        .send({
          name: "phone",
          price: 20,
          category: "tech",
        })
        .set({ Authorization: "bearer " + signinRes.body });

      product_id = res.body.id;
      expect(res.status).toBe(200);
    });

    it("Gets all products through endpoint /products", async () => {
      const res = await req.get("/products");
      expect(res.status).toBe(200);
    });

    it("Gets top 5 products through endpoint /products/top", async () => {
        const res = await req.get("/products/top");
        expect(res.status).toBe(200);
      });

    it("Gets a product by id through /products/:id", async () => {
      const res = await req.get(`/products/${product_id}`);
      expect(res.status).toBe(200);
    });

    it("Gets a product  by category through /products/category", async () => {
      const res = await req.get(`/products?category=tech`);
      expect(res.status).toBe(200);
    });

    it("delete a product through  /products/:id", async () => {
      const signinRes = await req
        .post("/signin")
        .send({ username: "MOZ", password: "password123" });
      const res = await req
        .delete(`/products/${product_id}`)
        .set({ Authorization: "bearer " + signinRes.body });

      expect(res.status).toBe(200);
    });

    afterAll(async function () {
        await user.delete(user_id);
      });
  });
});
