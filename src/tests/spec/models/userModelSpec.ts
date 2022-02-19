/* eslint-disable no-undef */

import { userModel, User } from "../../../models/userModel";

const user = new userModel();
let user_id: number;

describe("User Model", function () {
  describe("Check metheods to be defined", function () {
    it("should create a user", async () => {
      const u: User = {
        firstName: "Mahmoud",
        lastName: "Hussein",
        userName: "MH",
        password: "pass123",
      };
      const result = await user.create(u);
      user_id = result.id as number;
      expect(result.firstName).toEqual("Mahmoud");
      expect(result.lastName).toEqual("Hussein");
      expect(result.userName).toEqual("MH");
      expect(result.password).toBeDefined();
    });

    it("should get all users", async () => {
      const users = await user.index();
      expect(users).toHaveSize(users.length);
    });

    it("should get a user by id", async () => {
      const result = await user.show(user_id);
      expect(result.firstName).toEqual("Mahmoud");
      expect(result.lastName).toEqual("Hussein");
      expect(result.userName).toEqual("MH");
      expect(result.password).toBeDefined();
    });

    it("should delete a user by id", async () => {
      const result = await user.delete(user_id);
      expect(result.firstName).toEqual("Mahmoud");
      expect(result.lastName).toEqual("Hussein");
      expect(result.userName).toEqual("MH");
      expect(result.password).toBeDefined();
    });
  });
});
