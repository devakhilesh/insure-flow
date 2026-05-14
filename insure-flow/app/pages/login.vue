<script setup lang="ts">
import type { LoginForm } from "~/types/auth";

definePageMeta({
  layout: "auth",
});

const form = ref<LoginForm>({
  email: "",
  password: "",
  rememberMe: false,
});

const handleLogin = () => {
  console.log("Login Data:", form.value);
};
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-center mb-6">Login</h1>

    <form @submit.prevent="handleLogin">
      <div class="mb-4">
        <label>Email</label>

        <input
          v-model="form.email"
          type="email"
          class="w-full border rounded-lg p-3 mt-2"
        />
      </div>

      <div class="mb-4">
        <label>Password</label>

        <input
          v-model="form.password"
          type="password"
          class="w-full border rounded-lg p-3 mt-2"
        />
      </div>

      <div class="flex gap-2 mb-6">
        <input v-model="form.rememberMe" type="checkbox" />

        <label> Remember me </label>
      </div>

      <button class="w-full bg-blue-600 text-white p-3 rounded-lg">
        Login
      </button>
    </form>

    <p class="mt-5 text-center">
      Don't have account?

      <NuxtLink to="/register" class="text-blue-600"> Register </NuxtLink>
    </p>
  </div>
</template>
