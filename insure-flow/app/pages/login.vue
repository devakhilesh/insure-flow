<script setup lang="ts">
import { ref } from "vue";

import { useAuth0 } from "@auth0/auth0-vue";

const auth0 = useAuth0();

const loading = ref(false);

definePageMeta({ ssr: false })

const login = async () => {
  try {
    loading.value = true;

    await auth0.loginWithRedirect({
      authorizationParams: {
        prompt: "login",
      },
    });
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const signup = async () => {
  try {
    loading.value = true;

    await auth0.loginWithRedirect({
      authorizationParams: {
        screen_hint: "signup",

        prompt: "login",
      },
    });
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
    <div
      class="relative min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-gray-800 flex items-center justify-center p-4 sm:p-6 overflow-hidden"
    >
    <div
      class="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        class="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl animate-float-slow"
      ></div>
      <div
        class="absolute top-1/4 -right-20 w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl animate-float-medium"
      ></div>
      <div
        class="absolute -bottom-32 left-1/3 w-96 h-96 rounded-full bg-violet-500/10 blur-3xl animate-float-fast"
      ></div>
    </div>

    <div
      class="relative w-full max-w-md animate-fade-up"
    >
      <div
        class="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-black/30 p-6 sm:p-8 lg:p-10"
      >
        <div
          class="absolute inset-0 rounded-3xl bg-linear-to-br from-white/10 via-transparent to-transparent pointer-events-none"
        ></div>

        <div class="relative flex flex-col items-center">
          <div
            class="mb-5 sm:mb-6 inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-linear-to-br from-blue-500/20 to-indigo-500/20 border border-blue-400/20 shadow-lg shadow-blue-500/10"
          >
            <svg
              class="w-7 h-7 sm:w-8 sm:h-8 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
              />
            </svg>
          </div>

          <h1 class="text-3xl sm:text-4xl font-black text-center mb-2 bg-linear-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            InsureFlow
          </h1>

          <p class="text-gray-400 text-center mb-8 sm:mb-10 text-sm tracking-wide">
            Secure Authentication System
          </p>

          <button
            @click="login"
            :disabled="loading"
            class="group relative w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white py-3.5 sm:py-4 rounded-2xl mb-4 hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <span class="flex items-center justify-center gap-2">
              <svg
                class="w-5 h-5 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
              {{ loading ? "Loading..." : "Login" }}
            </span>
          </button>

          <div class="w-full flex items-center gap-4 mb-4">
            <div class="flex-1 h-px bg-white/10"></div>
            <span class="text-xs text-gray-500 uppercase tracking-widest">or</span>
            <div class="flex-1 h-px bg-white/10"></div>
          </div>

          <button
            @click="signup"
            :disabled="loading"
            class="group relative w-full border border-white/20 text-gray-200 py-3.5 sm:py-4 rounded-2xl hover:bg-white/10 hover:border-white/30 transition-all duration-300 font-semibold hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <span class="flex items-center justify-center gap-2">
              <svg
                class="w-5 h-5 transition-transform group-hover:scale-110"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.197a6.75 6.75 0 0113.5 0v.197c0 .64-.183 1.26-.523 1.792A6.751 6.751 0 0112 23.25a6.751 6.751 0 01-5.477-3.464A3.248 3.248 0 014 19.235z"
                />
              </svg>
              Create Account
            </span>
          </button>

          <!-- <p class="mt-6 sm:mt-8 text-xs text-gray-500 text-center leading-relaxed">
            By continuing you agree to our
            <a href="#" class="text-blue-400 hover:text-blue-300 transition-colors underline underline-offset-2">Terms of Service</a>
            and
            <a href="#" class="text-blue-400 hover:text-blue-300 transition-colors underline underline-offset-2">Privacy Policy</a>
          </p> -->
        </div>
      </div>
    </div>
  </div>
</template>