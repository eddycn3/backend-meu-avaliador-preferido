import { Request, Response, NextFunction } from "express";
import Avaliador from "../models/Avaliador";
import HttpException from "../exceptions/HttpException";

export class AvaliadorController {
  async getAvaliador(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { id } = request.params;
      console.log(id);
      const avaliador = await new Avaliador().getByID(+id);

      if (avaliador == null) {
        return response.status(404).json({ error: "registro não encontrado!" });
      }

      return response.json(avaliador);
    } catch (ex) {
      next(
        new HttpException(
          400,
          "Erro ao recuperar infos do avaliador",
          ex.message
        )
      );
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
