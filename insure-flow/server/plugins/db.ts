import { connectDB } from "../config/db";

export default defineNitroPlugin(async () => {
  await connectDB();
});
