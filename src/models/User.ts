import connection from "../database/connection";
import * as bcrypt from "bcryptjs";
import { IModelCRUD } from "./common/IModelCRUD";

export default class Usuario implements IModelCRUD<Usuario> {
  id: number;
  user_name: string;
  password: string;
  password_salt: string;
  ativo: number;

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

    usuario.id = await connection("usuarios").insert({
      user_name,
      password: hash,
      password_salt: salt,
      ativo: 1,
    });

    console.log("Usuario.create: " + usuario.id);

    return usuario;
  }

  async authUsuario(user: string, pass: string): Promise<number> {
    const userDB = await connection("usuarios")
      .where({
        user_name: user,
      })
      .first<Usuario>();

    console.log("authUsuario().userDB = " + userDB);
    if (userDB === undefined) {
      return 0;
    }

    const match = await bcrypt.compare(pass, userDB.password);

    if (match) {
      return +userDB.id;
    }
  }

  getByID(id: number): Promise<Usuario> {
    return connection("usuarios").where("id", id).first();
  }
}
