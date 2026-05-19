import { user_profile_service } from "~~/server/services/users/auth/user_profile.service";

export default eventHandler(async (event) => {
  try {
    const auth0Id = event.context.user?.sub as string;

    if (!auth0Id) {
      return handleError(
        event,
        400,
        "Something went wrong while fetching profile of user",
      );
    }

    const user = await user_profile_service(auth0Id);

    if (!user.status) {
      return handleError(event, 404, user.message);
    }

    return {
      status: true,
      statusCode: user.status_code,
      message: user.message,
      data: user.data,
    };
  } catch (err: unknown) {
    if (err instanceof Error) {
      const statusCode = "statusCode" in err ? Number(err.statusCode) : 500;

      return handleErrorCatch(statusCode, err.message);
    }

    return handleErrorCatch(500, "Internal Server Error");
  }
});
