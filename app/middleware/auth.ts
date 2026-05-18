import { useAuth0 } from "@auth0/auth0-vue";

export default defineNuxtRouteMiddleware(async (to) => {
  /*
  CLIENT ONLY
  */

  if (import.meta.server) {
    return;
  }

  // If we are currently handling an Auth0 callback, let the SDK process it first.
  // This prevents premature redirection to "/" which would strip the query parameters!
  if ((to.query.code || to.query.error) && to.query.state) {
    return;
  }

  const auth0 = useAuth0();

  /*
  WAIT SDK
  */

  while (auth0.isLoading.value) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  /*
  NOT LOGIN
  */

  if (!auth0.isAuthenticated.value) {
    return navigateTo("/");
  }
});
