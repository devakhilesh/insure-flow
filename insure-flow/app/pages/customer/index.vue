<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";

definePageMeta({
  middleware: "auth",
  ssr: false,
});

const auth0 = process.client ? useAuth0() : null;
const ready = ref(false);
const detectedRole = ref("");

const role = computed(() => {
  return (
    auth0?.user.value?.["https://insureflow.com/role"] ||
    detectedRole.value ||
    localStorage.getItem("selected_role")
  );
});

onMounted(async () => {
  // Wait for Auth0 to finish loading
  while (auth0?.isLoading.value) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  if (!auth0?.isAuthenticated.value) {
    await navigateTo("/login");
    return;
  }

  let currentRole = role.value;

  // Verify role from backend if not found locally
  if (!currentRole) {
    try {
      const token = await auth0.getAccessTokenSilently();
      const response = await $fetch<{
        status: boolean;
        statusCode: number;
        message: string;
        data: any;
      }>("/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status && response.data && response.data.role) {
        detectedRole.value = response.data.role;
        localStorage.setItem("selected_role", response.data.role);
        currentRole = response.data.role;
      }
    } catch (error) {
      console.error("Error fetching role on customer dashboard:", error);
    }
  }

  // Route protection
  if (currentRole === "broker") {
    await navigateTo("/broker");
  } else if (!currentRole || currentRole !== "customer") {
    await navigateTo("/select-role");
  } else {
    ready.value = true;
  }
});

const logout = () => {
  localStorage.removeItem("selected_role");
  auth0?.logout({
    logoutParams: {
      returnTo: window.location.origin,
    },
  });
};

// Mock data for Customer
const stats = ref([
  { name: "My Policies", value: "2 Active", change: "Both up-to-date", icon: "shield" },
  { name: "Monthly Cost", value: "$410", change: "Next due June 1st", icon: "card" },
  { name: "Claims Filed", value: "1 Pending", change: "Submitted 2 days ago", icon: "chat" },
]);

const policies = ref([
  { id: 1, name: "Premium Health Policy", number: "POL-73892", coverage: "$500,000", premium: "$260/mo", status: "Active" },
  { id: 2, name: "Comprehensive Auto Care", number: "POL-48201", coverage: "$50,000", premium: "$150/mo", status: "Active" },
]);
</script>

<template>
  <ClientOnly>
    <div v-if="ready" class="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-gray-800 text-white p-4 sm:p-6 lg:p-8 overflow-hidden relative">
      <!-- Glow blobs -->
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <div class="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div class="absolute top-1/4 -right-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl"></div>
        <div class="absolute -bottom-32 left-1/3 w-96 h-96 rounded-full bg-sky-500/10 blur-3xl"></div>
      </div>

      <div class="max-w-6xl mx-auto relative z-10">
        <!-- HEADER -->
        <header class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 pb-6 border-b border-white/10">
          <div class="flex items-center gap-5">
            <div class="relative">
              <img :src="auth0?.user.value?.picture" class="w-16 h-16 rounded-2xl border border-white/20 shadow-xl" alt="Customer Avatar" />
              <span class="absolute -bottom-1 -right-1 flex h-4 w-4 rounded-full bg-emerald-500 border border-gray-950"></span>
            </div>
            <div>
              <div class="flex items-center gap-2.5">
                <h1 class="text-2xl font-black tracking-tight">{{ auth0?.user.value?.name }}</h1>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 capitalize">
                  {{ role }}
                </span>
              </div>
              <p class="text-gray-400 text-sm mt-0.5">{{ auth0?.user.value?.email }}</p>
            </div>
          </div>
          <button @click="logout" class="group flex items-center gap-2 border border-white/10 hover:border-white/20 hover:bg-white/5 px-5 py-3 rounded-2xl font-semibold transition-all duration-300 active:translate-y-0.5">
            <svg class="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </header>

        <!-- STATS GRID -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div v-for="stat in stats" :key="stat.name" class="relative group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:-translate-y-1">
            <div class="flex items-start justify-between">
              <div>
                <p class="text-gray-400 text-sm font-medium">{{ stat.name }}</p>
                <h3 class="text-3xl font-black tracking-tight mt-2 text-white">{{ stat.value }}</h3>
              </div>
              <div class="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                <svg v-if="stat.icon === 'shield'" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <svg v-else-if="stat.icon === 'card'" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <svg v-else class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
            </div>
            <span class="inline-flex items-center text-xs font-semibold text-emerald-400 mt-4 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
              {{ stat.change }}
            </span>
          </div>
        </div>

        <!-- MAIN GRID: POLICIES & QUICK ACTIONS -->
        <div class="grid lg:grid-cols-3 gap-8">
          <!-- My Policies -->
          <div class="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-bold tracking-tight">Active Insurance Policies</h2>
              <button class="text-xs text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-4 transition-colors">
                Browse Coverages
              </button>
            </div>

            <div class="space-y-4">
              <div v-for="policy in policies" :key="policy.id" class="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/15 transition-all duration-300 group">
                <div class="space-y-1">
                  <h3 class="font-bold text-lg text-white group-hover:text-emerald-400 transition-colors">{{ policy.name }}</h3>
                  <div class="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400">
                    <span>No: <strong>{{ policy.number }}</strong></span>
                    <span>•</span>
                    <span>Coverage Limit: <strong>{{ policy.coverage }}</strong></span>
                  </div>
                </div>
                <div class="flex items-center gap-4 mt-4 sm:mt-0 w-full sm:w-auto justify-between sm:justify-start">
                  <div class="text-right sm:text-left">
                    <div class="text-sm font-black text-white">{{ policy.premium }}</div>
                    <div class="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">monthly</div>
                  </div>
                  <span class="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold">
                    {{ policy.status }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="space-y-6">
            <div class="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
              <h2 class="text-lg font-bold tracking-tight mb-4">Portal Actions</h2>
              <div class="space-y-3">
                <button class="w-full flex items-center justify-between p-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-all duration-300 shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 active:translate-y-0.5 group">
                  <span class="flex items-center gap-3">
                    <svg class="w-5 h-5 text-emerald-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    File an Incident Claim
                  </span>
                  <svg class="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <button class="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold transition-all duration-300 active:translate-y-0.5 group">
                  <span class="flex items-center gap-3">
                    <svg class="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Make a Payment
                  </span>
                  <svg class="w-4 h-4 text-gray-400 group-hover:text-white transform group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <button class="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold transition-all duration-300 active:translate-y-0.5 group">
                  <span class="flex items-center gap-3">
                    <svg class="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Explore New Plans
                  </span>
                  <svg class="w-4 h-4 text-gray-400 group-hover:text-white transform group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Help box -->
            <div class="rounded-3xl border border-emerald-500/20 bg-linear-to-br from-emerald-500/10 to-teal-500/10 p-6 relative overflow-hidden group">
              <div class="absolute -right-10 -bottom-10 w-32 h-32 rounded-full bg-emerald-500/10 blur-xl group-hover:scale-125 transition-transform duration-500"></div>
              <h3 class="text-lg font-black text-emerald-300 mb-2">Need Assistance?</h3>
              <p class="text-xs text-gray-400 leading-relaxed mb-4">
                Our support team and brokers are standing by to help with coverages, updates, or claims processing.
              </p>
              <a href="#" class="text-xs font-bold text-white hover:text-emerald-200 transition-colors inline-flex items-center gap-1.5">
                Contact Agent Support
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>
