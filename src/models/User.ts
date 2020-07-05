import connection from "../database/connection";
import * as bcrypt from "bcryptjs";

export default class Usuario {
  private static instance: Usuario;
  id: number;
  user_name: string;
  password: string;
  password_salt: string;
  ativo: number;

  private constructor() {}

  static getInstance(): Usuario {
    if (!Usuario.instance) {
      Usuario.instance = new Usuario();
    }
    return Usuario.instance;
  }

  async create(usuario: Usuario): Promise<Usuario> {
    const userDB = await connection("usuarios")
      .where({
        user_name: usuario.user_name,
      })
      .first();

    if (userDB != null) {
      return userDB;
    }

    const { user_name } = usuario;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(usuario.password, salt);

    try {
      usuario.id = await connection("usuarios").insert({
        user_name,
        password: hash,
        password_salt: salt,
        ativo: 1,
      });
    } catch (err) {
      console.log("Usuario.create :" + err);
      usuario = undefined;
    }
    return usuario;
  }

  async authUsuario(user: string, pass: string): Promise<number> {
    const userDB = await connection("usuarios")
      .where({
        user_name: user,
      })
      .first<Usuario>();

    if (!userDB) return 0;

    const match = await bcrypt.compare(pass, userDB?.password);

    if (match) {
      return +userDB.id;
    }
    return 0;
  }

  getByID(id: number): Promise<Usuario> {
    return connection("usuarios").where("id", id).first();
  }
}
