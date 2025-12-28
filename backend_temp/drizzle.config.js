import dotenv from "dotenv";
dotenv.config({ path: ".env" });

export default {
  schema: "./db/schema/*.js",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT), // 👈 REQUIRED
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: false, // 👈 REQUIRED for local Postgres
  },
};