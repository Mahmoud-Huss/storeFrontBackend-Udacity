import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authenticator = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = _req.headers.authorization as string;
    const token: string = authorizationHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET as string);
    next();
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token!");
    return;
  }
};
