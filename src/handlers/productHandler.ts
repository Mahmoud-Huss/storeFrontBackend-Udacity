import express, { Request, Response } from "express";
import { authenticator } from "../middlewares/auth";
import { productModel, product } from "../models/productModel";

const ProductObj = new productModel();

const getAllProducts = async (_req: Request, res: Response): Promise<void> => {
  const products = await ProductObj.index();
  res.json(products);
};

const getProductById = async (_req: Request, res: Response): Promise<void> => {
  try {
    const product_id: number = parseInt(_req.params.id as string);
    const product = await ProductObj.getProductById(product_id);

    res.status(200);
    res.json(product);
  } catch (err) {
    res.status(400);
    throw new Error(`Could not get product. Error: ${err}`);
  }
};

const create = async (_req: Request, res: Response): Promise<void> => {
  try {
    const productParam: product = {
      name: _req.body.name,
      price: _req.body.price,
      category: _req.body.category,
    };
    const product = await ProductObj.create(productParam);

    res.status(200);
    res.json(product);
  } catch (err) {
    res.status(400);
    throw new Error(`Error: ${err}`);
  }
};

const getProductsByCategory = async (_req: Request, res: Response) => {
  try {
    const category: string = _req.query.category as string;
    const prodcutsByCategory = await ProductObj.getProductsByCategory(category);

    res.status(200);
    res.json(prodcutsByCategory);
  } catch (err) {
    res.status(400);
    throw new Error(
      `Could not get products of specified category. Error: ${err}`
    );
  }
};

const getTopProducts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const topProducts = await ProductObj.topProducts();

    res.status(200);
    res.json(topProducts);
  } catch (err) {
    res.status(400);
    throw new Error(`Couldn't get top products. Error: ${err}`);
  }
};

const deleteProduct = async (_req: Request, res: Response): Promise<void> => {
  try {
    const product_id: number = parseInt(_req.params.id as string);
    const deleted = await ProductObj.deleteProduct(product_id);

    res.status(200);
    res.json(deleted);
  } catch (err) {
    res.status(400);
    throw new Error(`Could not delete specified product. Error: ${err}`);
  }
};

const productRoutes = (app: express.Application) => {
  app.get("/products", getAllProducts);
  app.get("/products", getProductsByCategory);
  app.get("/products/top", getTopProducts);
  app.get("/products/:id", getProductById);
  app.post("/products", authenticator, create);
  app.delete("/products/:id", authenticator, deleteProduct);
};

export default productRoutes;
