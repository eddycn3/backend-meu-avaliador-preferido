import HttpException from "../exceptions/HttpException";
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import * as authConfig from "../configs/configConsts";

function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const auth = request.headers.authorization;

  if (!auth) return response.status(401).send({ error: "No token provided" });

  const parts = auth.split(" ");

  if (parts.length != 2)
    return response.status(401).send({ error: "Token error" });

  const [schema, token] = parts;

  if (!/^Bearer$/i.test(schema))
    return response.status(401).send({ error: "Token malformed" });

  jwt.verify(token, authConfig.default, (err, decoded) => {
    if (err) return response.status(401).send({ error: "Invalid Token" });
    const { userId } = request.body;

    console.log(decoded);
    return next();
  });
}

export default authMiddleware;
