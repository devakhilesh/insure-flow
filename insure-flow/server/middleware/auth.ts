export default defineEventHandler(async (event) => {
  const path = getRequestURL(event).pathname;
  try {
    // only api routes
    if (path.startsWith("/api")) return;
  } catch (err) {
    return err;
  }
});
