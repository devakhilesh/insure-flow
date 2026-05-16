// export default defineEventHandler(async (event) => {
//   const path = getRequestURL(event).pathname;
//   try {
//     // only api routes
//     if (path.startsWith("/api")) return;
//   } catch (err) {
//     return err;
//   }
// });



// import { auth }
// from "express-oauth2-jwt-bearer";

// const config = useRuntimeConfig();

// export const checkJwt = auth({
//   audience: config.auth0Audience,

//   issuerBaseURL:
//     `https://${config.auth0Domain}`,
// });



import { verifyAuth0Token }
from "~~/server/utils/verifyAuth0Token";

export default defineEventHandler(
  async (event) => {

    /*
    |--------------------------------------------------------------------------
    | Get Authorization Header
    |--------------------------------------------------------------------------
    */

    const authHeader =
      getHeader(event, "authorization");

    /*
    |--------------------------------------------------------------------------
    | Public Routes Skip
    |--------------------------------------------------------------------------
    */

    const publicRoutes = [
      "/",
      "/api/auth/login",
    ];

    if (
      publicRoutes.includes(
        event.path
      )
    ) {
      return;
    }

    /*
    |--------------------------------------------------------------------------
    | Token Missing
    |--------------------------------------------------------------------------
    */

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      throw createError({
        statusCode: 401,

        statusMessage:
          "Unauthorized",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Extract Token
    |--------------------------------------------------------------------------
    */

    const token =
      authHeader.split(" ")[1]!;

    try {

      /*
      |--------------------------------------------------------------------------
      | Verify Auth0 Token
      |--------------------------------------------------------------------------
      */

      const payload =
        await verifyAuth0Token(
          token
        );

      /*
      |--------------------------------------------------------------------------
      | Store User In Context
      |--------------------------------------------------------------------------
      */

      event.context.user =
        payload;

    } catch (error) {

      throw createError({
        statusCode: 401,

        statusMessage:
          "Invalid or expired token",
      });
    }
  }
);