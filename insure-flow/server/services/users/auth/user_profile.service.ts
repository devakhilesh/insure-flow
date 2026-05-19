import { eq } from "drizzle-orm";
import { connectDB } from "~~/server/config/db";
import { users } from "~~/server/models";
import {
  ErrorRes,
  SuccessRes,
} from "~~/server/types/helperTypes/servicesResponseType";
import { IUser } from "~~/server/types/users/userAuth.types";

export const user_profile_service = async (auth0Id: string) => {
  const db = await connectDB();

  const user: IUser | undefined = await db.query.users.findFirst({
    where: eq(users.auth0Id, auth0Id),
  });

  if (!user) {
    return {
      status: false,
      message: "User not found",
    } as ErrorRes;
  }

  if (!user.role) {
    return {
      status: false,
      message: "Signup again with proper role selection",
    } as ErrorRes;
  }

  // ================== Profile of user accordingly ====

  
/*    if(user.role === "customer"){
// user profile data
  }else if(user.role === "broker"){
// broker profile data 
  }else{
    // err
  } */



  return {
    status_code: 200,
    message: "User already exists",

    data: user,
  } as SuccessRes;
};
