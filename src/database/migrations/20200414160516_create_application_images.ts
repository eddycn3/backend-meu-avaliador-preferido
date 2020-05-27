import * as Knex from "knex";

export const up = (knex: Knex) => {
  return knex.schema.createTable("application_images", (table) => {
    table.increments("id").primary();
    table.string("image_name", 255).notNullable();
    table.string("image_path", 255).notNullable();
  });
};

export const down = (knex: Knex) => {
  return knex.schema.dropTable("application_images");
};
