import { Application, Request, Response } from "express";
import { userModel, User } from "../models/userModel";
import jwt, { Secret } from "jsonwebtoken";
import { authenticator } from "../middlewares/auth";

const user = new userModel();

const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users: User[] = await user.index();
    res.status(200);
    res.json(users);
  } catch (err) {
    res.status(401);
    throw new Error(`Couldn't get users. Error: ${err}`);
  }
};

const getUser = async (_req: Request, res: Response): Promise<void> => {
  try {
    const user_id: number = parseInt(_req.params.id as string);
    const userById = await user.show(user_id);
    res.status(200);
    res.json(userById);
  } catch (err) {
    res.status(401);
    throw new Error(`Couldn't get user. Error: ${err}`);
  }
};

const createUser = async (_req: Request, res: Response): Promise<void> => {
  try {
    const u: User = {
      firstName: _req.body.first_name,
      lastName: _req.body.last_name,
      userName: _req.body.username,
      password: _req.body.password,
    };
    const createdUser = await user.create(u);
    res.status(200);
    res.json(createdUser);
  } catch (err) {
    res.status(401);
    throw new Error(`Couldn't create user. Error: ${err}`);
  }
};

const deleteUser = async (_req: Request, res: Response): Promise<void> => {
  try {
    const user_id: number = parseInt(_req.params.id as string);
    const deletedUser = await user.delete(user_id);
    res.status(200);
    res.json(deletedUser);
  } catch (err) {
    res.status(401);
    throw new Error(`Couldn't delete user. Error: ${err}`);
  }
};

const authenticate = async (_req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = {
      username: _req.body.username,
      password: _req.body.password,
    };
    const SECRET: Secret = process.env.TOKEN_SECRET as Secret;
    const u = await user.authenticate(username, password);
    if (u) {
      const token = jwt.sign({ user: u }, SECRET);
      res.json(token);
    } else {
      throw new Error();
    }
  } catch (err) {
    res.status(401);
    res.json("invalid username or password");
    return;
  }
};

const userRoutes = (app: Application) => {
  app.get("/users", authenticator, index);
  app.get("/signin", authenticate);
  app.get("/users/:id", authenticator, getUser);
  app.post("/register", createUser);
  app.delete("/users/:id", authenticator, deleteUser);
};

export default userRoutes;
