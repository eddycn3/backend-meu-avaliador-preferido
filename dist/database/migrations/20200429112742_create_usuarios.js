"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = function (knex) {
    return knex.schema.createTable("usuarios", function (table) {
        table.increments("id").primary();
        table.string("user_name").notNullable();
        table.string("password").notNullable();
        table.string("password_salt").notNullable();
        table.integer("ativo").unsigned();
    });
};
exports.down = function (knex) {
    return knex.schema.dropTable("usuarios");
};
//# sourceMappingURL=20200429112742_create_usuarios.js.map