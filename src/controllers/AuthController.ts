import { Request, Response, NextFunction } from "express";
import Usuario from "../models/User";
import Avaliador from "../models/Avaliador";
import { UserType } from "../utils/enums";
import HttpException from "../exceptions/HttpException";
import MsgRetornoValidacao from "../models/common/MsgRetorno";
import * as jwt from "jsonwebtoken";
import authMiddleware from "../middlewares/authMiddleWare";
import { JWT_SECRET } from "../utils/secrets";

export class AuthController {
  private readonly token = "ab32eafed410b0ec19ac9866b37b9041";

  async authorize(request: Request, response: Response, next: NextFunction) {
    authMiddleware(request, response, next);
  }

  async create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      let avaliador: Avaliador;

      const { user, user_info } = request.body;

      const usuario = await new Usuario().create(user);
      user_info.user_id = +usuario.id;

      if (usuario.ativo === 0) {
        return response
          .status(409)
          .json(new MsgRetornoValidacao(0, "usuario inativo"));
      }

      if (user.user_type === UserType.Avalidor) {
        avaliador = await new Avaliador().create(user_info);
      }

      return response.json({
        user: { user_name: user.user_name },
        user_info: avaliador,
      });
    } catch (err) {
      next(new HttpException(400, "Erro na criação do usuario", err.message));
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

      if (userId === 0) {
        return response
          .status(404)
          .json(new MsgRetornoValidacao(0, "usuario não localizado."));
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
      next(
        new HttpException(400, "Erro na autenticação do usuario", err.message)
      );
    }
  }
}
