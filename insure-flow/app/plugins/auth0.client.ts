import { createAuth0 } from "@auth0/auth0-vue";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const router = useRouter();
  console.log("CALLBACK URL =>", config.public.auth0CallbackUrl);

  nuxtApp.vueApp.use(
    createAuth0({
      domain: config.public.auth0Domain,
      clientId: config.public.auth0ClientId,
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: config.public.auth0Audience,
        scope: "openid profile email",
      },
      cacheLocation: "localstorage",
      useRefreshTokens: true,
      onRedirectCallback: (appState: any) => {
        window.location.href = appState?.targetUrl || "/login";
      },
    } as any)
  );
});

