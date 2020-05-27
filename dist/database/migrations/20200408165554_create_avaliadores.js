"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = function (knex) {
    return knex.schema.createTable("avaliadores", function (table) {
        table.increments("id").primary();
        table.string("nome", 255).notNullable();
        table.string("empresa", 100).notNullable();
        table.string("site", 100);
        table.string("email", 100).notNullable();
        table.string("telefone", 14).notNullable();
        table.integer("image_id").unsigned();
        table.foreign("image_id").references("id").inTable("application_images");
        table.integer("user_id").unsigned();
        table.foreign("user_id").references("id").inTable("usuarios");
    });
};
exports.down = function (knex) {
    return knex.schema.dropTable("avaliadores");
};
//# sourceMappingURL=20200408165554_create_avaliadores.js.map