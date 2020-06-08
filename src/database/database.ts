import * as knex from "knex";

export const database = {
  client: "sqlite3",
  connection: {
    filename: "src/database/appDB.sqlite3",
  },
  migration: {
    directory: "./migrations",
  },
  useNullAsDefault: true,
} as knex.Config;

// REMINDER use => filename: "appDB.sqlite3", to create the file
