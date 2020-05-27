import { Request, Response, NextFunction } from "express";
import Usuario from "../models/User";
import Avaliador from "../models/Avaliador";
import { UserType } from "../utils/enums";
import HttpException from "../exceptions/HttpException";

class AuthController {
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
        return response.status(409).json({ error: "Usuário esta inativo" });
      }

      if (user.user_type === UserType.Avalidor) {
        avaliador = await new Avaliador().create(user_info);
      }

      console.log(user_info.user_id);

      return response.json({
        user: { user_name: user.user_name },
        user_info: avaliador,
      });
    } catch (err) {
      next(
        new HttpException(404, "Erro na autenticação do usuario", err.message)
      );
    }
  }

  async authenticate(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { user_name, password } = request.body;

      const userId = await new Usuario().authUsuario(user_name, password);

      if (userId == null)
        return response
          .status(404)
          .json({ usuario: "usuario não localizado." });

      return response.json({ id: userId });
    } catch (err) {
      next(
        new HttpException(400, "Erro na autenticação do usuario", err.message)
      );
    }
  }
}

export default new AuthController();
