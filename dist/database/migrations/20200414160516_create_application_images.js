"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = function (knex) {
    return knex.schema.createTable("application_images", function (table) {
        table.increments("id").primary();
        table.string("image_name", 255).notNullable();
        table.string("image_path", 255).notNullable();
    });
};
exports.down = function (knex) {
    return knex.schema.dropTable("application_images");
};
//# sourceMappingURL=20200414160516_create_application_images.js.map