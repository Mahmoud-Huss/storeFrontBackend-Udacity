import { Application, Request, Response } from "express";
import { authenticator } from "../middlewares/auth";
import { order, orderModel, orderProduct } from "../models/orderModel";

const orderObj = new orderModel();

const getOrders = async (_req: Request, res: Response): Promise<void> => {
  try {
    const user_id: number = parseInt(_req.params.id);
    const orders: order[] = await orderObj.getAllOrders(user_id);

    res.status(200);
    res.json(orders);
  } catch (err) {
    res.status(400);
    throw new Error(`Couldn't get orders. Error: ${err}`);
  }
};
const createOrder = async (_req: Request, res: Response): Promise<void> => {
  try {
    const user_id: number = parseInt(_req.params.id);
    const status: string = _req.body.status;
    const order: order = await orderObj.create({user_id, status});

    res.status(200);
    res.json(order);
  } catch (err) {
    res.status(400);
    throw new Error(`Couldn't create orders. Error: ${err}`);
  }
};

const addProduct = async (_req: Request, res: Response): Promise<void> => {
  try {
    const order_Id: number = parseInt(_req.params.id);
    const product_id: number = _req.body.product_id;
    const quantity: number = _req.body.quantity;
    const product: orderProduct = await orderObj.addProduct(
      order_Id,
      product_id,
      quantity
    );

    res.status(200);
    res.json(product);
  } catch (err) {
    res.status(400);
    throw new Error(`Couldn't get orders. Error: ${err}`);
  }
};

const getCompletedOrders = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const user_id: number = parseInt(_req.params.id);
    const completedOrders: order[] = await orderObj.getCompletedOrders(user_id);

    res.status(200);
    res.json(completedOrders);
  } catch (err) {
    res.status(400);
    throw new Error(`Couldn't get completed orders. Error: ${err}`);
  }
};

const getCurrentOrder = async (_req: Request, res: Response): Promise<void> => {
  try {
    const user_id: number = parseInt(_req.params.id);
    const order: order = await orderObj.getLastOrder(user_id);

    res.status(200);
    res.json(order);
  } catch (err) {
    res.status(400);
    throw new Error(`Couldn't get current order. Error: ${err}`);
  }
};
const updateOrderStatus = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const order_Id: number = parseInt(_req.params.id);
    const status: string = _req.body.status;
    const updatedOrderStatus = await orderObj.updateOrderStatus(
      status,
      order_Id
    );

    res.status(200);
    res.json(updatedOrderStatus);
  } catch (err) {
    throw new Error(`Could not update status for the order. Error: ${err}`);
  }
};
const deleteOrder = async (_req: Request, res: Response): Promise<void> => {
  try {
    const order_id: number = parseInt(_req.params.id);
    const deletedOrder: order = await orderObj.deleteOrder(order_id);

    res.status(200);
    res.json(deletedOrder);
  } catch (err) {
    res.status(400);
    throw new Error(`Couldn't delete order. Error: ${err}`);
  }
};

export const orderRoutes = (app: Application): void => {
  app.get("/users/:id/orders", authenticator, getOrders);
  app.get("/users/:id/complete-orders", authenticator, getCompletedOrders);
  app.get("/users/:id/current-order", authenticator, getCurrentOrder);
  app.post("/users/:id/orders", authenticator, createOrder);
  app.post("/orders/:id/products", authenticator, addProduct);
  app.post("/orders/:id/status", authenticator, updateOrderStatus);
  app.delete("/orders/:id", authenticator, deleteOrder);
};
