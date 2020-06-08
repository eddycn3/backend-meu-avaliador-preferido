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
// REMINDER use => filename: "appDB.sqlite3", to create the file
//# sourceMappingURL=database.js.map