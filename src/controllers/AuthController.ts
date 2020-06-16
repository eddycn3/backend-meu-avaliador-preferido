import { Request, Response, NextFunction } from "express";
import Usuario from "../models/User";
import Avaliador from "../models/Avaliador";
import { UserType } from "../utils/enums";

import * as jwt from "jsonwebtoken";
import authMiddleware from "../middlewares/authMiddleWare";
import { HttpExceptionError } from "../middlewares/errorHandlerMiddleware";
import { JWT_SECRET } from "../utils/secrets";

export class AuthController {
  async create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    let avaliador: Avaliador;
    const user = new Usuario();

    const { user_name, password, user_type, user_info } = request.body;

    user.user_name = user_name;
    user.password = password;

    try {
      const usuario = await user.create(user);

      if (usuario === undefined) {
        throw new HttpExceptionError(400, "erro na criacao do usuario");
      }

      user_info.user_id = +usuario.id;

      if (user_type === UserType.Avalidor) {
        const avldorInstance = new Avaliador();
        const v = await avldorInstance.verificaAvaliador(user_info);

        if (v) {
          throw new HttpExceptionError(
            403,
            "cpf e registro confef já cadastrados"
          );
        }

        avaliador = await avldorInstance.create(user_info);
        if (avaliador === undefined) {
          throw new HttpExceptionError(400, "erro na criacao do usuario");
        }
      }

      const userID = usuario.id;
      return response.json({
        user_name: usuario.user_name,
        user_info: avaliador,
        token: jwt.sign({ userID }, JWT_SECRET, {
          expiresIn: 86400,
        }),
      });
    } catch (error) {
      next(error);
    }
  }

  async authenticate(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      let userObj: object;

      const { user_name, password, user_type } = request.body;

      const userId = await new Usuario().authUsuario(user_name, password);
      console.log(userId);
      if (userId === 0) {
        throw new HttpExceptionError(404, "usuario não localizado");
      }

      if (user_type === UserType.Avalidor) {
        userObj = await new Avaliador().getByUserID(userId);
      }
      return response.json({
        id: userId,
        user_info: userObj,
        token: jwt.sign({ userId }, JWT_SECRET, {
          expiresIn: 86400,
        }),
      });
    } catch (err) {
      next(err);
    }
  }

  async authorize(request: Request, response: Response, next: NextFunction) {
    authMiddleware(request, response, next);
  }
}
