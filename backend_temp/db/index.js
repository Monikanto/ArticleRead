import dotenv from "dotenv";
dotenv.config();

import{drizzle} from 'drizzle-orm/node-postgres';
import pg from "pg";
import { dbConfig } from "../config/db.config.js";

const pool =new pg.Pool(dbConfig);
 
export const db = drizzle(pool);