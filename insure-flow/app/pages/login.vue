<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'

definePageMeta({
  layout: "auth",
})

const auth0 = useAuth0()

const handleLogin = () => {
  auth0.loginWithRedirect()
}
</script>

<template>
  <div class="text-center">
    <h1 class="text-3xl font-bold mb-2">Welcome Back</h1>
    <p class="text-gray-500 mb-8">Sign in to your InsureFlow account</p>
    <button
      @click="handleLogin"
      class="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
    >
      Sign in with Auth0
    </button>
  </div>
</template>
