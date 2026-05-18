/// <reference types="node" />

// import "dotenv/config";
// import type { Config }
// from "drizzle-kit";

// const dbHost =
//   process.env.DB_HOST!;

// const dbPort =
//   Number(process.env.DB_PORT!);

// const dbUser =
//   process.env.DB_USER!;

// const dbPassword =
//   process.env.DB_PASSWORD!;

// const dbName =
//   process.env.DB_NAME!;

// export default {

//   schema:
//     "./server/models/**/*.ts",

//   out:
//     "./drizzle",

//   dialect:
//     "postgresql",

//   dbCredentials: {
//     host: dbHost,
//     port: dbPort,
//     user: dbUser,
//     password: dbPassword,
//     database: dbName,
//   },

// } satisfies Config;



import "dotenv/config";

import {
  defineConfig,
} from "drizzle-kit";

export default defineConfig({

  schema:
    "./server/models/**/*.ts",

  out:
    "./drizzle",

  dialect:
    "postgresql",

  dbCredentials: {
    url:
      process.env.DATABASE_URL!,
  },

});