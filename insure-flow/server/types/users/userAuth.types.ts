import type {
  InferSelectModel,
  InferInsertModel,
} from "drizzle-orm";
import { users } from "~~/server/models";


export type IUser =
  InferSelectModel<typeof users>;

export type INewUser =
  InferInsertModel<typeof users>;