"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var knex_1 = __importDefault(require("knex"));
var database_1 = require("./database");
var connection = knex_1.default(database_1.database);
exports.default = connection;
//# sourceMappingURL=connection.js.map