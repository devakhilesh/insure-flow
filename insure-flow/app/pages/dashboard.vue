<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

import {
  computed,
  onMounted,
  ref,
} from "vue";

import { useAuth0 }
from "@auth0/auth0-vue";

const auth0 =
  process.client
    ? useAuth0()
    : null;

const ready =
  ref(false);

const role = computed(() => {

  return (

    auth0?.user.value?.[
      "https://insureflow.com/role"
    ]

    ||

    localStorage.getItem(
      "selected_role"
    )
  );
});

onMounted(async () => {

  ready.value = true;

  if (!role.value) {

    await navigateTo(
      "/select-role"
    );
  }
});

const logout = () => {

  localStorage.removeItem(
    "selected_role"
  );

  auth0?.logout({

    logoutParams: {

      returnTo:
        window.location.origin,
    },
  });
};
</script>

<template>

  <ClientOnly>

    <div
      v-if="ready"
      class="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-6"
    >

      <div
        class="max-w-5xl mx-auto"
      >

        <!-- HEADER -->

        <div
          class="flex flex-col lg:flex-row justify-between gap-6 items-start lg:items-center mb-10"
        >

          <div
            class="flex items-center gap-5"
          >

            <img
              :src="
                auth0?.user.value?.picture
              "
              class="w-20 h-20 rounded-full border-4 border-white/20"
            />

            <div>

              <h1
                class="text-3xl font-black"
              >
                {{
                  auth0?.user.value?.name
                }}
              </h1>

              <p
                class="text-gray-300"
              >
                {{
                  auth0?.user.value?.email
                }}
              </p>

            </div>

          </div>

          <button
            @click="logout"
            class="bg-white text-black px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition"
          >
            Logout
          </button>

        </div>

        <!-- GRID -->

        <div
          class="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >

          <div
            class="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/10"
          >

            <p
              class="text-gray-400 text-sm mb-2"
            >
              Role
            </p>

            <h2
              class="text-3xl font-black capitalize"
            >
              {{ role }}
            </h2>

          </div>

          <div
            class="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/10"
          >

            <p
              class="text-gray-400 text-sm mb-2"
            >
              Authentication
            </p>

            <h2
              class="text-3xl font-black"
            >
              Auth0
            </h2>

          </div>

          <div
            class="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/10"
          >

            <p
              class="text-gray-400 text-sm mb-2"
            >
              Status
            </p>

            <h2
              class="text-3xl font-black text-green-400"
            >
              Active
            </h2>

          </div>

        </div>

      </div>

    </div>

  </ClientOnly>

</template>