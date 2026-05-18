<script setup lang="ts">
import { ref }
from "vue";

import { useAuth0 }
from "@auth0/auth0-vue";

const auth0 =
  useAuth0();

const role =
  ref("customer");

const loading =
  ref(false);

const errorMessage =
  ref("");

const successMessage =
  ref("");

const saveRole =
async () => {

  try {

    loading.value = true;

    errorMessage.value = "";

    successMessage.value = "";

    /*
    LOCAL ROLE
    */

    localStorage.setItem(
      "selected_role",
      role.value
    );

    /*
    TOKEN
    */

    const token =
      await auth0
        .getAccessTokenSilently();

    /*
    API
    */

    const response =
      await $fetch<{
        success: boolean;

        message: string;

        data: any;
      }>(
        "/api/users/auth",
        {

          method: "POST",

          headers: {

            Authorization:
              `Bearer ${token}`,
          },

          body: {

            role:
              role.value,

            email:
              auth0.user.value?.email,

            name:
              auth0.user.value?.name,
          },
        }
      );

    /*
    SUCCESS
    */

    successMessage.value =
      response.message;

    /*
    REDIRECT
    */

    setTimeout(() => {

      window.location.href =
        "/dashboard";

    }, 1200);

  } catch (error: any) {

    console.error(error);

    errorMessage.value =

      error?.data?.message ||

      error?.message ||

      "Something went wrong";

  } finally {

    loading.value = false;
  }
};
</script>

<template>

  <div
    class="min-h-screen bg-gray-100 flex items-center justify-center p-4"
  >

    <div
      class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
    >

      <h1
        class="text-3xl font-bold text-center mb-2"
      >
        Select Role
      </h1>

      <p
        class="text-gray-500 text-center mb-8"
      >
        Choose your account type
      </p>

      <select
        v-model="role"
        class="w-full border rounded-xl p-3 mb-6"
      >

        <option value="customer">
          Customer
        </option>

        <option value="broker">
          Broker
        </option>

      </select>

      <button
        @click="saveRole"
        :disabled="loading"
        class="w-full bg-black text-white py-3 rounded-xl"
      >

        {{
          loading
            ? "Saving..."
            : "Continue"
        }}

      </button>

      <p
        v-if="successMessage"
        class="text-green-600 text-sm mt-4 text-center"
      >
        {{ successMessage }}
      </p>

      <p
        v-if="errorMessage"
        class="text-red-500 text-sm mt-4 text-center"
      >
        {{ errorMessage }}
      </p>

    </div>

  </div>

</template>