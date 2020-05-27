import * as Knex from "knex";

export const up = (knex: Knex) => {
  return knex.schema.createTable("usuarios", (table) => {
    table.increments("id").primary();
    table.string("user_name").notNullable();
    table.string("password").notNullable();
    table.string("password_salt").notNullable();
    table.integer("ativo").unsigned();
  });
};

export const down = (knex: Knex) => {
  return knex.schema.dropTable("usuarios");
};
