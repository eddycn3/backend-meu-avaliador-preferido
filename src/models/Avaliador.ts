import connection from "../database/connection";
import { IModelCRUD } from "./common/IModelCRUD";

export default class Avaliador implements IModelCRUD<Avaliador> {
  nome: string;
  empresa: string;
  site: string;
  email: string;
  telefone: string;
  image_id: number;
  user_id: number;

  async create(avaliador: Avaliador): Promise<Avaliador> {
    const v = await this.verificaAvaliador(avaliador);
    if (v) {
      return v;
    }
    await connection("avaliadores").insert(avaliador);
    return avaliador;
  }

  async getByID(id: number): Promise<Avaliador> {
    const avaliador = await connection("avaliadores").where("id", id).first();

    if (!avaliador) {
      return null;
    }

    return avaliador;
  }

  update(entity: Avaliador): Promise<Avaliador> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<Avaliador> {
    throw new Error("Method not implemented.");
  }

  private async verificaAvaliador(avaliador: Avaliador): Promise<Avaliador> {
    const a = await connection("avaliadores")
      .where({
        nome: avaliador.nome,
        empresa: avaliador.empresa,
        site: avaliador.site,
        email: avaliador.email,
        telefone: avaliador.telefone,
      })
      .first();
    if (a) return a;
  }
}
