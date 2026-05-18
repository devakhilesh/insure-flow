import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

let db: ReturnType<typeof drizzle>;

export const connectDB = async () => {
  if (db) return db;

  const config = useRuntimeConfig();

  const {
    dbHost,
    dbPort,
    dbUser,
    dbPassword,
    dbName,
  } = config;

  /**
   * STEP 1
   * Connect default postgres database
   * to check/create target DB
   */

  const adminPool = new Pool({
    host: dbHost,
    port: Number(dbPort),
    user: dbUser,
    password: dbPassword,
    database: "postgres",
  });

  try {
    const checkDB = await adminPool.query(
      `
      SELECT 1
      FROM pg_database
      WHERE datname = $1
      `,
      [dbName]
    );

    if (checkDB.rowCount === 0) {
      console.log(`Creating database: ${dbName}`);

      await adminPool.query(
        `CREATE DATABASE "${dbName}"`
      );

      console.log(`Database Created`);
    } else {
      console.log(`Database Already Exists`);
    }
  } catch (error) {
    console.error("Database Creation Error:", error);
  } finally {
    await adminPool.end();
  }

  /**
   * STEP 2
   * Connect target DB
   */

  const pool = new Pool({
    host: dbHost,
    port: Number(dbPort),
    user: dbUser,
    password: dbPassword,
    database: dbName,

    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });

  pool.on("connect", () => {
    console.log("PostgreSQL Connected");
  });

  pool.on("error", (err) => {
    console.error("PostgreSQL Error:", err);
  });

  db = drizzle(pool);

  return db;
};