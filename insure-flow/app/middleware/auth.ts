import { useAuth0 }
from "@auth0/auth0-vue";

export default defineNuxtRouteMiddleware(
async () => {

  /*
  CLIENT ONLY
  */

  if (process.server) {
    return;
  }

  const auth0 =
    useAuth0();

  /*
  WAIT SDK
  */

  while (
    auth0.isLoading.value
  ) {

    await new Promise(
      (resolve) =>
        setTimeout(resolve, 100)
    );
  }

  /*
  NOT LOGIN
  */

  if (
    !auth0.isAuthenticated.value
  ) {

    return navigateTo(
      "/login"
    );
  }
});