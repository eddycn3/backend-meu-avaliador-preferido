import connection from "../database/connection";

export default class Avaliador {
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
    try {
      const [id] = await connection("avaliadores").insert(avaliador);
      avaliador.id = id;
    } catch (error) {
      console.log("Avaliador.create", error);
      avaliador = undefined;
    }
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

  public async verificaAvaliador(
    avaliador: Avaliador
  ): Promise<string | undefined> {
    const checkByEmail = await connection("avaliadores")
      .where({
        email: avaliador.email,
      })
      .first();

    const checkByCPF = await connection("avaliadores")
      .where({
        cpf: avaliador.cpf,
      })
      .first();

    const checkByIDCONFEF = await connection("avaliadores")
      .where({
        id_confef: avaliador.id_confef,
      })
      .first();

    if (checkByEmail) {
      return "ERROR_EMAIL_EXISTS";
    }

    if (checkByCPF) {
      return "ERROR_CPF_EXISTS";
    }

    if (checkByIDCONFEF) {
      return "ERROR_IDCONFEF_EXISTS";
    }
  }
}
