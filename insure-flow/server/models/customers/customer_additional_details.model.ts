import {
  pgTable,
  serial,
  integer,
  varchar,
  text,
  boolean,
  timestamp,
  date,
  pgEnum,
} from "drizzle-orm/pg-core";
import { users } from "../users/user_auth.model";

export const genderEnum = pgEnum("gender", ["male", "female", "other"]);

export const maritalStatusEnum = pgEnum("marital_status", [
  "single",
  "married",
  "divorced",
  "widowed",
]);

export const employmentStatusEnum = pgEnum("employment_status", [
  "employed",
  "self_employed",
  "unemployed",
  "student",
  "retired",
]);

export const incomeRangeEnum = pgEnum("income_range", [
  "UNDER_25K",
  "25K_TO_50K",
  "50K_TO_100K",
  "100K_TO_250K",
  "250K_TO_500K",
  "500K_PLUS",
]);

export const customers = pgTable("customers", {
  id: serial("id").primaryKey(),

  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),

  phone: varchar("phone", {
    length: 20,
  }),

  gender: genderEnum("gender"),

  dob: date("dob"),

  maritalStatus: maritalStatusEnum("marital_status"),

  employmentStatus: employmentStatusEnum("employment_status"),

  incomeRange: incomeRangeEnum("income_range"),

  addressLine1: text("address_line_1"),

  addressLine2: text("address_line_2"),

  state: varchar("state", {
    length: 100,
  }),

  county: varchar("county", {
    length: 100,
  }),

  city: varchar("city", {
    length: 100,
  }),

  zipCode: varchar("zip_code", {
    length: 15,
  }),

  country: varchar("country", {
    length: 100,
  }).default("USA"),

  // kycVerified: boolean("kyc_verified").default(false),

  // profileImage: text(
  //   "profile_image"
  // ),

  createdAt: timestamp("created_at").defaultNow(),

  updatedAt: timestamp("updated_at").defaultNow(),
});
