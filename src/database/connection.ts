import knex from "knex";
import { database } from "./database";

const connection = knex(database);

export default connection;
