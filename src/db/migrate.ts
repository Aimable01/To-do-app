import "dotenv/config";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from ".";

async function migration() {
  console.log("migrating");
  await migrate(db, { migrationsFolder: "src/db/drizzle" });
  console.log("migrated");
  process.exit(0);
}

migration().catch((e) => {
  console.log("failed to migrate: ", e);
  process.exit(1);
});
