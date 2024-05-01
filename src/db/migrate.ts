import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.CONNECTION_STRING as string,
});

async function migration() {
  const db = drizzle(pool);
  console.log("migrating");
  await migrate(db, { migrationsFolder: "src/db/drizzle" });
  console.log("migrated");
  process.exit(0);
}

migration().catch((e) => {
  console.log("failed to migrate: ", e);
  process.exit(1);
});
