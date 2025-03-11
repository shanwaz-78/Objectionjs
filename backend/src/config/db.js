import Knex from "knex";
import { Model } from "objection";
import knexConfig from "./knexfile.js";

const knex = Knex(knexConfig.development);

Model.knex(knex);

const connectDB = async () => {
  try {
    await knex.raw("SELECT 1");
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

export { knex, connectDB };
