//======================= 2 ===========================

// import { verifyAuth0Token } from "../utils/verifyAuth0Token";

// export default defineEventHandler(async (event) => {
//   /*
//     ONLY API ROUTES
//     */

//   if (!event.path.startsWith("/api")) {
//     return;
//   }

//   /*
//     GET TOKEN
//     */

//   const authHeader = getHeader(event, "authorization");

//   if (!authHeader) {
//     throw createError({
//       statusCode: 401,

//       statusMessage: "Token missing",
//     });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const payload = await verifyAuth0Token(token!);

//     /*
//       STORE USER
//       */

//     event.context.user = payload;
//   } catch {
//     throw createError({
//       statusCode: 401,

//       statusMessage: "Invalid token",
//     });
//   }
// });

//=============================================

import { verifyAuth0Token } from "../utils/verifyAuth0Token";
import { connectDB } from "../config/db";
import { users } from "../models";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  if (!event.path.startsWith("/api")) return;

  const authHeader = getHeader(event, "authorization");

  if (!authHeader) {
    throw createError({
      statusCode: 401,
      statusMessage: "Token missing",
    });
  }

  const token = authHeader.split(" ")[1];
  const payload = await verifyAuth0Token(token!);

  // for signUp only 

  event.context.user = payload;

  // Allow onboarding/signup route without DB user  first onboarding
  
  const isAuthSignupRoute =
    event.path.startsWith("/api/users/auth") && event.method === "POST";

  if (isAuthSignupRoute) {
    return;
  }

  const db = await connectDB();

  const dbUser = await db
    .select()
    .from(users)
    .where(eq(users.auth0Id, payload.sub as string));

  if (!dbUser[0]) {
    throw createError({
      statusCode: 403,
      statusMessage: "User profile not created yet",
    });
  }

  event.context.user = dbUser[0];
});
