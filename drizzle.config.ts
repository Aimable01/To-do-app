import { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema/*",
  out: "./src/db/drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.CONNECTION_STRING as string,
  },
} satisfies Config;
