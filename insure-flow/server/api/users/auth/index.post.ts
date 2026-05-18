import { authUserService } from "~~/server/services/user_auth.service";
import { SuccessRes } from "~~/server/types/users/servicesResponseType";
import { INewUser, IUser } from "~~/server/types/users/userAuth.types";

import { handleErrorCatch } from "~~/server/utils/errorHandler";

export default defineEventHandler(async (event) => {
  try {
    const body = (await readBody(event)) as INewUser;

    const user = event.context.user;

    const authService = await authUserService(body, user.sub) as SuccessRes
 

    // console.log({
    //   authService,
    // });


    return {
      status: true,
      statusCode: authService.status_code,
      message: authService.message,
      data: authService.data,
    };
    
  } catch (err: unknown) {
    if (err instanceof Error) {
      const statusCode = "statusCode" in err ? Number(err.statusCode) : 500;

      return handleErrorCatch(statusCode, err.message);
    }

    return handleErrorCatch(500, "Internal Server Error");
  }
});
