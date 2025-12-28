import dotenv from "dotenv";
dotenv.config();

const requiredEnv = ["DB_HOST", "DB_USER", "DB_NAME"];
const missing = requiredEnv.filter((key) => !process.env[key] || process.env[key].trim() === "");

if (missing.length) {
    throw new Error(`Missing or empty database env vars: ${missing.join(", ")}. Please check your .env file.`);
}

// Ensure password is always a string (required for PostgreSQL SCRAM authentication)
// If DB_PASSWORD is not set, use empty string (works with trust authentication)
const password = process.env.DB_PASSWORD !== undefined && process.env.DB_PASSWORD !== null 
    ? String(process.env.DB_PASSWORD) 
    : "";

export const dbConfig = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER,
    password: password,
    database: process.env.DB_NAME,
};