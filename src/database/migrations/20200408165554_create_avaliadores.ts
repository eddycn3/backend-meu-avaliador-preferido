import * as Knex from "knex";

export const up = (knex: Knex) => {
  return knex.schema.createTable("avaliadores", (table) => {
    table.increments("id").primary();
    table.string("nome", 255).notNullable();
    table.string("empresa", 100).notNullable();
    table.string("site", 100);
    table.string("email", 100).notNullable();
    table.string("telefone", 14).notNullable();
    table.string("cpf", 11).unique().notNullable();
    table.string("id_confef", 15).unique().notNullable();
    table.integer("image_id").unsigned();
    table.foreign("image_id").references("id").inTable("application_images");
    table.integer("user_id").unsigned();
    table.foreign("user_id").references("id").inTable("usuarios");
  });
};

export const down = (knex: Knex) => {
  return knex.schema.dropTable("avaliadores");
};
