const connection = require("../database/connection");

module.exports = {
  async index(request, response) {
    const { id } = request.params;

    const aluno = await connection("alunos").where("id", id).first();

    if (!aluno) {
      return response.status(404).json({ error: "aluno não encontrado." });
    }

    return response.json(aluno);
  },
  async create(request, response) {
    const { nome, data_nascimento, sexo, idade } = request.body;

    const aluno = await connection("alunos")
      .where({
        nome: nome,
        data_nascimento: data_nascimento,
        sexo: sexo,
        idade: idade,
      })
      .first();
    console.log(aluno);
    if (aluno != null) {
      return response.status(409).json({ error: "registro já existente!" });
    }

    const [id] = await connection("alunos").insert({
      nome,
      data_nascimento,
      sexo,
      idade,
      ativo: 1,
    });

    return response.json({ id });
  },
  async update(request, response) {
    const { id } = request.params;
    const { nome, data_nascimento, sexo, idade } = request.body;
    await connection("alunos").where("id", id).update({
      nome,
      data_nascimento,
      sexo,
      idade,
    });

    return response.send();
  },
};
