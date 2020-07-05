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
    let usuario: Usuario;
    const userInstance = Usuario.getInstance();
    const { user_name, password, user_type, user_info } = request.body;

    userInstance.user_name = user_name;
    userInstance.password = password;

    try {
      if (user_type === UserType.Avalidor) {
        const avaliadorInstance = Avaliador.getInstance();

        const checkAvaliador = await avaliadorInstance.verificaAvaliador(
          user_info
        );

        /// "ERROR_EMAIL_EXISTS" / "ERROR_CPF_EXISTS" / "ERROR_IDCONFEF_EXISTS"
        if (checkAvaliador) {
          // HTTP STATUS CODE 403
          throw new HttpExceptionError(400, checkAvaliador);
        }

        usuario = await userInstance.create(userInstance);

        if (usuario === undefined) {
          // HTTP STATUS CODE 400
          throw new HttpExceptionError(400, "ERROR_USER_CREATION_FAILED");
        }

        user_info.user_id = +usuario.id;

        avaliador = await avaliadorInstance.create(user_info);
        if (avaliador === undefined) {
          // HTTP STATUS CODE 400
          throw new HttpExceptionError(400, "ERROR_USER_CREATION_FAILED");
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

      const userId = await Usuario.getInstance().authUsuario(
        user_name,
        password
      );
      console.log(userId);
      if (userId === 0) {
        // HTTP STATUS CODE 404
        throw new HttpExceptionError(404, "ERROR_USER_NOT_FOUND");
      }

      if (user_type === UserType.Avalidor) {
        userObj = await Avaliador.getInstance().getByUserID(userId);
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
