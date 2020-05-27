import { Request, Response } from "express";
import Avaliador from "../models/Avaliador";

class AvaliadorController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const avaliador = await new Avaliador().getByID(+id);

    if (avaliador == null) {
      return response.status(404).json({ error: "registro não encontrado!" });
    }

    return response.json(avaliador);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const avaliador = new Avaliador().create(request.body);

    if (avaliador) {
      return response.status(409).json({ error: "registro já existente!" });
    }

    return response.json(avaliador);
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

export default new AvaliadorController();
