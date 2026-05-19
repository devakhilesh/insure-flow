import { eq } from "drizzle-orm";
import { connectDB } from "../../../config/db";
import auth from "../../../middleware/auth";
import { users } from "../../../models";
import { INewUser, IUser } from "../../../types/users/userAuth.types";
import { SuccessRes } from "../../../types/helperTypes/servicesResponseType";

export const authUserService = async (body: INewUser, auth0Id: string) => {

  const db = await connectDB();

  const data = {
    email: body.email,
    name: body.name || null,
    role: body.role,
    auth0Id: auth0Id,
    isActive: true,
  };

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.auth0Id, auth0Id));

  if (existingUser.length) {
    const user = existingUser[0]!;

    if (user.role !== body.role) {
      const updatedUser = await db
        .update(users)
        .set({
          role: body.role,

          updatedAt: new Date(),
        })
        .where(eq(users.auth0Id, auth0Id))
        .returning();

      return {
        status_code: 200,
        message: "Role updated",

        data: updatedUser[0],
      } as SuccessRes;
    }

    return {
      status_code: 200,
      message: "User already exists",

      data: user,
    } as SuccessRes;
  }

  const newUser = await db.insert(users).values(data).returning();

  return {
    status: true,
    status_code: 201,
    message: "User Login Success",
    data: newUser[0],
  } as SuccessRes;
};
