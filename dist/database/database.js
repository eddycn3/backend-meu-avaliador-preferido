"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = {
    client: "sqlite3",
    connection: {
        filename: "src/database/appDB.sqlite3",
    },
    migration: {
        directory: "./migrations",
    },
    useNullAsDefault: true,
};
//# sourceMappingURL=database.js.map