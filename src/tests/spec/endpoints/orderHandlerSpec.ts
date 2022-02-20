/* eslint-disable no-undef */
import supertest from "supertest";
import { User, userModel } from "../../../models/userModel";
import { app } from "../../../server";

const req = supertest(app);
const user = new userModel();

let user_id: number;
let order_id: number;
let token: string;

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

      //sign in
      const signinRes = await req
        .post("/signin")
        .send({ username: "MOZ", password: "password123" });
      token = "bearer " + signinRes.body;
    });

    it("Creates an order through the endpoint /users/:id/orders", async () => {
      const res = await req
        .post(`/users/${user_id}/orders`)
        .send({
          status: "active",
        })
        .set({ Authorization: token });
      order_id = res.body.id;

      expect(res.status).toBe(200);
    });

    it("Add a product through /orders/:id/products", async () => {
      const res = await req
        .post(`/orders/${order_id}/products`)
        .set({ Authorization: token });

      expect(res.status).toBe(200);
    });

    it("Gets currnet order", async () => {
      const res = await req
        .get(`/users/${user_id}/current-order`)
        .set({ Authorization: token });
      expect(res.status).toBe(200);
    });

    it("Change order status through /orders/:id/status", async () => {
      const res = await req
        .post(`/orders/${order_id}/status`)
        .send({
          status: "complete",
        })
        .set({ Authorization: token });
      expect(res.status).toBe(200);
    });

    it("Gets completed orders through /users/:id/complete-orders", async () => {
      const res = await req
        .get(`/users/${user_id}/complete-orders`)
        .set({ Authorization: token });
      expect(res.status).toBe(200);
    });

    it("Gets orders through /users/:id/complete-orders", async () => {
      const res = await req
        .get(`/users/${user_id}/orders`)
        .set({ Authorization: token });
      expect(res.status).toBe(200);
    });

    it("delete an order through  /orders/:id", async () => {
      const res = await req
        .delete(`/orders/${order_id}`)
        .set({ Authorization: token });

      expect(res.status).toBe(200);
    });

    afterAll(async function () {
      await user.delete(user_id);
    });
  });
});
