import { eq } from "drizzle-orm";
import { connectDB } from "~~/server/config/db";
import { users } from "~~/server/models";
import { handleErrorCatch } from "~~/server/utils/errorHandler";

export default defineEventHandler(async (event) => {
  try {
    const user = event.context.user;
    if (!user || !user.sub) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      });
    }

    const db = await connectDB();
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.auth0Id, user.sub));

    if (existingUser.length) {
      return {
        status: true,
        statusCode: 200,
        message: "User found",
        data: existingUser[0],
      };
    }

    return {
      status: true,
      statusCode: 200,
      message: "User not found",
      data: null,
    };
  } catch (err: unknown) {
    if (err instanceof Error) {
      const statusCode = "statusCode" in err ? Number(err.statusCode) : 500;
      return handleErrorCatch(statusCode, err.message);
    }
    return handleErrorCatch(500, "Internal Server Error");
  }
});
