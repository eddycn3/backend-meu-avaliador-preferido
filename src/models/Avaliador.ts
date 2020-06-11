import connection from "../database/connection";
import { IModelCRUD } from "./common/IModelCRUD";

export default class Avaliador implements IModelCRUD<Avaliador> {
  id: number;
  nome: string;
  empresa: string;
  site: string;
  email: string;
  telefone: string;
  image_id: number;
  user_id: number;
  cpf: string;
  id_confef: string;

  async create(avaliador: Avaliador): Promise<Avaliador> {
    const v = await this.verificaAvaliador(avaliador);
    if (v) {
      return v;
    }
    const [id] = await connection("avaliadores").insert(avaliador);
    avaliador.id = id;
    return avaliador;
  }

  async getByID(id: number): Promise<Avaliador> {
    const avaliador = await connection("avaliadores").where("id", id).first();

    if (!avaliador) {
      return null;
    }

    return avaliador;
  }

  async getByUserID(id: number): Promise<Avaliador> {
    const avaliador = await connection("avaliadores")
      .where("user_id", id)
      .first();

    if (!avaliador) {
      return null;
    }

    return avaliador;
  }

  private async verificaAvaliador(avaliador: Avaliador): Promise<Avaliador> {
    const a = await connection("avaliadores")
      .where({
        user_id: avaliador.user_id,
        cpf: avaliador.cpf,
        id_confef: avaliador.id_confef,
      })
      .first();
    if (a) return a;
  }
}
