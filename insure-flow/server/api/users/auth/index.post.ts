// import UserModel from "~~/server/models/users/user_auth.model";
import { INewUser } from "~~/server/types/users/userAuth.types";
import { handleErrorCatch } from "~~/server/utils/errorHandler";

export default defineEventHandler(async (event) => {
  try {


const body = await readBody(event) as INewUser






  } catch (err: unknown) {
    if (err instanceof Error) {
      const statusCode = "statusCode" in err ? Number(err.statusCode) : 500;

      return handleErrorCatch(statusCode, err.message);
    }

    return handleErrorCatch(500, "Internal Server Error");
  }
});
