/* eslint-disable no-undef */
import { orderModel, order } from "../../../models/orderModel";
import { userModel, User } from "../../../models/userModel";
import { product, productModel } from "../../../models/productModel";
//import DB from "../../../database";

const orderObj = new orderModel();
const user = new userModel();
const productObj = new productModel();

let order_id: number;
let user_id: number;
let product_id: number;

describe("Order Model test", function () {
  beforeAll(async function () {
    //Create user
    const u: User = {
      firstName: "Mahmoud",
      lastName: "Hussein",
      userName: "MH",
      password: "pass123",
    };
    const result = await user.create(u);
    user_id = result.id as number;

    //Create product
    const p: product = {
      name: "phone",
      price: 40,
      category: "tech",
    };
    const productResult = await productObj.create(p);
    product_id = productResult.id as number;
  });

  describe("Check metheods to be defined", function () {
    it("should create an order", async () => {
      const o: order = {
        status: "active",
        user_id,
      };
      const result = await orderObj.create(o);
      order_id = result.id as number;
      expect(result.status).toEqual("active");
    });

    it("should get all orders", async () => {
      const orders = await orderObj.getAllOrders(1);
      expect(orders).toHaveSize(orders.length);
    });

    it("should get update order status", async () => {
      const result = await orderObj.updateOrderStatus("complete", order_id);
      expect(result.status).toEqual("complete");
    });

    it("should get completed orders", async () => {
      const result = await orderObj.getCompletedOrders(user_id);
      expect(result[0].status).toEqual("complete");
    });

    it("should get current order", async () => {
      const result = await orderObj.getLastOrder(user_id);
      expect(result.status).toEqual("complete");
    });

    it("should add a product order", async () => {
      const result = await orderObj.addProduct(order_id, product_id, 3);
      expect(result.quantity).toEqual(3);
    });

    it("should delete a order by id", async () => {
      const result = await orderObj.deleteOrder(order_id);
      expect(result.status).toEqual("complete");
    });
  });

  afterAll(async function () {
    await user.delete(user_id);
    await productObj.deleteProduct(product_id);
  });
});
