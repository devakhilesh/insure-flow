// import {
//   createRemoteJWKSet,
//   jwtVerify,
// } from "jose";

// export const verifyAuth0Token =
//   async (token: string) => {

//     const config = useRuntimeConfig();

//     /*
//     |--------------------------------------------------------------------------
//     | Auth0 Public Keys URL
//     |--------------------------------------------------------------------------
//     */

//     const JWKS =
//       createRemoteJWKSet(
//         new URL(
//           `https://${config.auth0Domain}/.well-known/jwks.json`
//         )
//       );

//     /*
//     |--------------------------------------------------------------------------
//     | Verify Token
//     |--------------------------------------------------------------------------
//     */

//     const { payload } =
//       await jwtVerify(
//         token,
//         JWKS,
//         {
//           issuer:
//             `https://${config.auth0Domain}/`,

//           audience:
//             config.auth0Audience,
//         }
//       );

//     return payload;
//   };



import {
  createRemoteJWKSet,
  jwtVerify,
} from "jose";

export const verifyAuth0Token =
  async (token: string) => {

    const config =
      useRuntimeConfig();

    const JWKS =
      createRemoteJWKSet(
        new URL(
          `https://${config.auth0Domain}/.well-known/jwks.json`
        )
      );

    const { payload } =
      await jwtVerify(
        token,
        JWKS,
        {
          issuer:
            `https://${config.auth0Domain}/`,

          audience:
            config.auth0Audience,
        }
      );

    return payload;
  };