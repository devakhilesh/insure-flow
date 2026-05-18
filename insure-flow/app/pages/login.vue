<script setup lang="ts">
import { ref }
from "vue";

import { useAuth0 }
from "@auth0/auth0-vue";

const auth0 =
  useAuth0();

const loading =
  ref(false);

const login =
async () => {

  try {

    loading.value = true;

    await auth0
      .loginWithRedirect({

        authorizationParams: {

          prompt:
            "login",
        },
      });

  } catch (error) {

    console.error(error);

  } finally {

    loading.value = false;
  }
};

const signup =
async () => {

  try {

    loading.value = true;

    await auth0
      .loginWithRedirect({

        authorizationParams: {

          screen_hint:
            "signup",

          prompt:
            "login",
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
    class="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center p-4"
  >

    <div
      class="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10"
    >

      <h1
        class="text-4xl font-black text-center mb-3"
      >
        InsureFlow
      </h1>

      <p
        class="text-gray-500 text-center mb-10"
      >
        Secure Authentication System
      </p>

      <button
        @click="login"
        :disabled="loading"
        class="w-full bg-black text-white py-4 rounded-2xl mb-5 hover:opacity-90 transition font-semibold"
      >

        {{
          loading
            ? "Loading..."
            : "Login"
        }}

      </button>

      <button
        @click="signup"
        :disabled="loading"
        class="w-full border-2 border-black py-4 rounded-2xl hover:bg-black hover:text-white transition font-semibold"
      >

        Signup

      </button>

    </div>

  </div>

</template>