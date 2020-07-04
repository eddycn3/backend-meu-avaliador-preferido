import { Request, Response, NextFunction } from "express";
import Avaliador from "../models/Avaliador";
import { HttpExceptionError } from "../middlewares/errorHandlerMiddleware";

export class AvaliadorController {
  async getAvaliador(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { id } = request.params;
      const avaliador = await new Avaliador().getByID(+id);

      if (avaliador == null) {
        // HTTP STATUS CODE 404,
        throw new HttpExceptionError("ERROR_USER_INFO_NOT_FOUND ");
      }

      return response.json(avaliador);
    } catch (ex) {
      next(ex);
    }
  }

  // async update(request: Request, response: Response): Promise<Response> {
  //   const { id } = request.params;
  //   const { nome, empresa, site, email, telefone } = request.body;
  //   await connection("avaliadores").where("id", id).update({
  //     nome: nome,
  //     empresa: empresa,
  //     site: site,
  //     email: email,
  //     telefone: telefone,
  //   });

  //   return response.send();
  // }
}
