<script setup lang="ts">
import { ref } from "vue";

import { useAuth0 } from "@auth0/auth0-vue";

const auth0 = useAuth0();

const role = ref("customer");

const loading = ref(false);

const errorMessage = ref("");

const successMessage = ref("");

definePageMeta({ ssr: false });

const saveRole = async () => {
  try {
    loading.value = true;

    errorMessage.value = "";

    successMessage.value = "";

    /*
    LOCAL ROLE
    */

    localStorage.setItem("selected_role", role.value);

    /*
    TOKEN
    */

    const token = await auth0.getAccessTokenSilently();

    /*
    API
    */

    const response = await $fetch<{
      success: boolean;

      message: string;

      data: any;
    }>("/api/users/auth", {
      method: "POST",

      headers: {
        Authorization: `Bearer ${token}`,
      },

      body: {
        role: role.value,

        email: auth0.user.value?.email,

        name: auth0.user.value?.name,
      },
    });

    /*
    SUCCESS
    */

    successMessage.value = response.message;

    /*
    REDIRECT
    */

    setTimeout(() => {
      window.location.href = `/${role.value}`;
    }, 1200);
  } catch (error: any) {
    console.error(error);

    errorMessage.value =
      error?.data?.message || error?.message || "Something went wrong";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div
    class="relative min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-gray-800 flex items-center justify-center p-4 sm:p-6 overflow-hidden"
  >
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
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

    <div class="relative w-full max-w-md animate-fade-up">
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
                d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.97 0-5.728-1.07-7.858-2.848a3 3 0 00-4.682 2.72 9.094 9.094 0 003.741.479M12 12a3 3 0 100-6 3 3 0 000 6zm-6 6a9.094 9.094 0 00-3.741-.479 3 3 0 00-4.682-2.72m.94-3.198l.001-.031a6.002 6.002 0 01.037-.666A11.944 11.944 0 0112 3c2.97 0 5.728 1.07 7.858 2.848a3 3 0 004.682-2.72 9.094 9.094 0 00-3.741.479"
              />
            </svg>
          </div>

          <h1
            class="text-3xl sm:text-4xl font-black text-center mb-2 bg-linear-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent"
          >
            Select Role
          </h1>

          <p
            class="text-gray-400 text-center mb-8 sm:mb-10 text-sm tracking-wide"
          >
            Choose your account type
          </p>

          <div class="w-full space-y-3 sm:space-y-4 mb-6 sm:mb-8">
            <button
              type="button"
              @click="role = 'customer'"
              :class="[
                role === 'customer'
                  ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/10'
                  : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10',
                'group relative w-full flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-gray-900',
              ]"
            >
              <div
                :class="[
                  role === 'customer'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-gray-400',
                  'flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl transition-colors duration-300',
                ]"
              >
                <svg
                  class="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="1.5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.118a7.5 7.5 0 0115 0A17.933 17.933 0 0112 21.75c-2.676 0-5.25-.463-7.5-.864z"
                  />
                </svg>
              </div>
              <div class="text-left">
                <p
                  :class="[
                    role === 'customer' ? 'text-white' : 'text-gray-200',
                    'font-semibold transition-colors',
                  ]"
                >
                  Customer
                </p>
                <p class="text-gray-500 text-xs sm:text-sm">
                  Browse and manage your insurance policies
                </p>
              </div>
              <div
                :class="[
                  role === 'customer'
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-white/20',
                  'absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all',
                ]"
              >
                <div
                  v-if="role === 'customer'"
                  class="w-2 h-2 rounded-full bg-white"
                ></div>
              </div>
            </button>

            <button
              type="button"
              @click="role = 'broker'"
              :class="[
                role === 'broker'
                  ? 'border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/10'
                  : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10',
                'group relative w-full flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-gray-900',
              ]"
            >
              <div
                :class="[
                  role === 'broker'
                    ? 'bg-indigo-500 text-white'
                    : 'bg-white/10 text-gray-400',
                  'flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl transition-colors duration-300',
                ]"
              >
                <svg
                  class="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="1.5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                  />
                </svg>
              </div>
              <div class="text-left">
                <p
                  :class="[
                    role === 'broker' ? 'text-white' : 'text-gray-200',
                    'font-semibold transition-colors',
                  ]"
                >
                  Broker
                </p>
                <p class="text-gray-500 text-xs sm:text-sm">
                  Manage clients and sell insurance products
                </p>
              </div>
              <div
                :class="[
                  role === 'broker'
                    ? 'border-indigo-500 bg-indigo-500'
                    : 'border-white/20',
                  'absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all',
                ]"
              >
                <div
                  v-if="role === 'broker'"
                  class="w-2 h-2 rounded-full bg-white"
                ></div>
              </div>
            </button>
          </div>

          <button
            @click="saveRole"
            :disabled="loading"
            class="group relative w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white py-3.5 sm:py-4 rounded-2xl hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <span class="flex items-center justify-center gap-2">
              <svg
                v-if="loading"
                class="w-5 h-5 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
              <svg
                v-else
                class="w-5 h-5 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
              {{ loading ? "Saving..." : "Continue" }}
            </span>
          </button>

          <div
            v-if="successMessage"
            class="mt-4 sm:mt-6 w-full flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
          >
            <svg
              class="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p class="text-emerald-400 text-sm">
              {{ successMessage }}
            </p>
          </div>

          <div
            v-if="errorMessage"
            class="mt-4 sm:mt-6 w-full flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-red-500/10 border border-red-500/20"
          >
            <svg
              class="w-4 h-4 sm:w-5 sm:h-5 text-red-400 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
            <p class="text-red-400 text-sm">
              {{ errorMessage }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
