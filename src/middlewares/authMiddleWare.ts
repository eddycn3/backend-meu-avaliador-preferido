import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/secrets";

function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const auth = request.headers.authorization;

  if (!auth)
    return response.status(401).send({ errorMsg: "NO_TOKEN_PROVIDED" });

  const parts = auth.split(" ");

  if (parts.length !== 2)
    return response.status(401).send({ errorMsg: "TOKEN_ERROR" });

  const [schema, token] = parts;

  if (!/^Bearer$/i.test(schema))
    return response.status(401).send({ errorMsg: "TOKEN_MALFORMED" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return response.status(401).send({ errorMsg: "INVALID_TOKEN" });
    return next();
  });
}

export default authMiddleware;
