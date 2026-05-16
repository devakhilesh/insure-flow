<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'

const auth0 = import.meta.client ? useAuth0() : null

const handleLogout = () => {
  if (!auth0) return
  auth0.logout({ logoutParams: { returnTo: window.location.origin } })
}
</script>

<template>
  <ClientOnly>
    <div v-if="auth0?.isLoading.value" class="p-5 text-center">Loading...</div>

    <div v-else-if="auth0?.isAuthenticated.value" class="max-w-4xl mx-auto p-6">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-2xl font-bold">InsureFlow Dashboard</h1>
        <button @click="handleLogout" class="bg-red-600 text-white px-4 py-2 rounded cursor-pointer">
          Logout
        </button>
      </div>

      <div class="mb-6">
        <p class="text-lg">Welcome, {{ auth0?.user.value?.name || auth0?.user.value?.email }}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-white shadow rounded-lg p-5 border">
          <h3 class="font-semibold text-gray-600">Active Policies</h3>
          <p class="text-3xl font-bold mt-2">0</p>
        </div>
        <div class="bg-white shadow rounded-lg p-5 border">
          <h3 class="font-semibold text-gray-600">Claims</h3>
          <p class="text-3xl font-bold mt-2">0</p>
        </div>
        <div class="bg-white shadow rounded-lg p-5 border">
          <h3 class="font-semibold text-gray-600">Pending</h3>
          <p class="text-3xl font-bold mt-2">0</p>
        </div>
      </div>
    </div>

    <div v-else class="text-center p-10">
      <h1 class="text-3xl font-bold mb-4">InsureFlow</h1>
      <p class="mb-4">Secure your future with smarter insurance solutions.</p>
      <NuxtLink to="/login" class="bg-blue-600 text-white px-6 py-2 rounded inline-block">
        Sign In
      </NuxtLink>
    </div>
  </ClientOnly>
</template>
