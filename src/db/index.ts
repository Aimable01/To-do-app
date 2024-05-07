import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.CONNECTION_STRING as string,
});

export const db = drizzle(pool);
