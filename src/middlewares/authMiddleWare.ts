import HttpException from "../exceptions/HttpException";
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/secrets";

function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const auth = request.headers.authorization;

  if (!auth) return response.status(401).send({ error: "No token provided" });

  const parts = auth.split(" ");

  if (parts.length !== 2)
    return response.status(401).send({ error: "Token error" });

  const [schema, token] = parts;

  if (!/^Bearer$/i.test(schema))
    return response.status(401).send({ error: "Token malformed" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return response.status(401).send({ error: "Invalid Token" });
    return next();
  });
}

export default authMiddleware;
