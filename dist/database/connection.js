"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const database_1 = require("./database");
const connection = knex_1.default(database_1.database);
exports.default = connection;
//# sourceMappingURL=connection.js.map