import type { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { customers } from "~~/server/models/customers/customer_additional_details.model";

export type ICustomer = InferSelectModel<typeof customers>;

export type INewCustomer = InferInsertModel<typeof customers>;
