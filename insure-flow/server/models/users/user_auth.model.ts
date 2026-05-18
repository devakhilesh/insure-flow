import {
  pgTable,
  serial,
  text,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: serial("id")
      .primaryKey(),



    auth0Id: text("auth0_id")
      .notNull()
      .unique(),

 

    email: text("email")
      .notNull()
      .unique(),

    name: text("name"),



    role: text("role")
      .$type<
        | "broker"
        | "customer"
      >()
      .default("customer"),


    isActive:
      boolean("is_active")
        .default(true),


   
    createdAt:
      timestamp("created_at")
        .defaultNow(),

    updatedAt:
      timestamp("updated_at")
        .defaultNow(),
  }
);