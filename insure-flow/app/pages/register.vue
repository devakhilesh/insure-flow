<script setup lang="ts">
import type { RegisterForm } from "~/types/auth";

definePageMeta({
    layout: "auth"
})

const registerForm = ref<RegisterForm>({
  fullName: "",
  email: "",
  mobile: "",
  password: "",
  confirmPassword: "",
});

const handleRegister = async () => {
  console.log(registerForm.value);

  navigateTo("/profile");
};
</script>

<template>
  
    <div>
      <h1 class="text-3xl font-bold text-center mb-8">
        Create Account
      </h1>

      <form
        @submit.prevent="handleRegister"
        
      >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="mb-4">
          <label class="block mb-2">Full Name</label>
          <input
            v-model="registerForm.fullName"
            type="text"
            placeholder="Enter your Full Name here"
            class="w-full border rounded-lg p-3"
          />
        </div>
        <div class="mb-4">
          <label class="block mb-2">Email</label>
          <input
            v-model="registerForm.email"
            type="email"
            placeholder="Enter your Email here"
            class="w-full border rounded-lg p-3"
          />
        </div>
        <div class="mb-4">
          <label class="block mb-2">Mobile</label>
          <input
            v-model="registerForm.mobile"
            type="text"
            placeholder="Enter your Mobile here"
            class="w-full border rounded-lg p-3"
          />
        </div>
        <div class="mb-4">
          <label class="block mb-2">Password</label>
          <input
            v-model="registerForm.password"
            type="text"
            placeholder="Enter your Password here"
            class="w-full border rounded-lg p-3"
          />
        </div>
        <div class="mb-4">
          <label class="block mb-2">Confirm Password</label>
          <input
            v-model="registerForm.confirmPassword"
            type="text"
            placeholder="Confirm your Password here"
            class="w-full border rounded-lg p-3"
          />
        </div>
        </div>
        <div class="flex justify-center">
        <button class="w-37.5  bg-blue-600 text-white p-3 rounded">
          Register
        </button>
        </div>
      </form>
      <p class="text-center mt-5">
        Don't have an account?

        <NuxtLink to="/login" class="text-blue-600 font-semibold">
          Log in
        </NuxtLink>
      </p>
    </div>
</template>