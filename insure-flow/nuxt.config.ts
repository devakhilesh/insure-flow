// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2026-05-17',
css: ["~/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  srcDir: "app/",

  devtools: { enabled: true },

  runtimeConfig: {
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    auth0Domain: process.env.AUTH0_DOMAIN,
    auth0Audience: process.env.AUTH0_AUDIENCE,

    public: {
      auth0Domain: process.env.AUTH0_DOMAIN,

      auth0ClientId: process.env.AUTH0_CLIENT_ID,

      auth0CallbackUrl: process.env.AUTH0_CALLBACK_URL,

      auth0Audience: process.env.AUTH0_AUDIENCE,
    },
  },
});

/* export default defineNuxtConfig({
compatibilityDate: '2026-05-17',
  srcDir: "app/",

  devtools: {
    enabled: true,
  },

  runtimeConfig: {

    auth0Domain:
      process.env.AUTH0_DOMAIN,

    auth0Audience:
      process.env.AUTH0_AUDIENCE,

    public: {

      auth0Domain:
        process.env.AUTH0_DOMAIN,

      auth0ClientId:
        process.env.AUTH0_CLIENT_ID,

      auth0Audience:
        process.env.AUTH0_AUDIENCE,
    },
  },
}); */
