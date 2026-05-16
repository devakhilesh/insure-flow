import { useAuth0 } from '@auth0/auth0-vue'

export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.server) return

  const { isAuthenticated, loginWithRedirect } = useAuth0()

  if (!isAuthenticated.value) {
    await loginWithRedirect()
  }
})