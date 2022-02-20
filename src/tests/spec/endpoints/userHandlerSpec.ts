/* eslint-disable no-undef */
import supertest from "supertest";
import { app } from "../../../server";

const req = supertest(app);
let user_id: number;

describe("User Endpoints", function () {
  describe("/users request verbs", function () {
    it("gets the api endpoint /register", async () => {
      const res = await req.post("/register").send({
        first_name: "Moaz",
        last_name: "Muhammad",
        username: "MOZ",
        password: "password123",
      });
      user_id = res.body.id;
      expect(res.status).toBe(200);
    });

    it("gets the api endpoint /users", async () => {
      //Get authorization token
      const signinRes = await req
        .post("/signin")
        .send({ username: "MOZ", password: "password123" });
      //Send the request
      const res = await req
        .get("/users")
        .set({ Authorization: "bearer " + signinRes.body });
      expect(res.status).toBe(200);
    });

    it("gets the api endpoint /signin", async () => {
      const res = await req
        .post("/signin")
        .send({ username: "MOZ", password: "password123" });
      expect(res.status).toBe(200);
    });

    it("gets the api endpoint /users/:id", async () => {
      //Get authorization token
      const signinRes = await req
        .post("/signin")
        .send({ username: "MOZ", password: "password123" });
      //Send the request
      const res = await req
        .get(`/users/${user_id}`)
        .set({ Authorization: "bearer " + signinRes.body });
      expect(res.status).toBe(200);
    });

    it("delete a user /users/:id", async () => {
      const signinRes = await req
        .post("/signin")
        .send({ username: "MOZ", password: "password123" });
      const res = await req
        .delete(`/users/${user_id}`)
        .set({ Authorization: "bearer " + signinRes.body });

      expect(res.status).toBe(200);
    });
  });
});
