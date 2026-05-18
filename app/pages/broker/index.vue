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
      console.error("Error fetching role on broker dashboard:", error);
    }
  }

  // Route protection
  if (currentRole === "customer") {
    await navigateTo("/customer");
  } else if (!currentRole || currentRole !== "broker") {
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

// Mock data for Broker
const stats = ref([
  { name: "Active Clients", value: "24", change: "+4 this month", icon: "users" },
  { name: "Total Commission", value: "$18,450", change: "+15% vs last month", icon: "cash" },
  { name: "Pending Policies", value: "7", change: "3 urgent reviews", icon: "clock" },
]);

const clients = ref([
  { id: 1, name: "Alexander Wright", email: "alex@wrightcorp.com", policy: "Commercial Property", status: "Active", premium: "$2,400/yr" },
  { id: 2, name: "Sophia Martinez", email: "sophia.m@outlook.com", policy: "Comprehensive Life", status: "Pending", premium: "$1,800/yr" },
  { id: 3, name: "Marcus Chen", email: "marcus.chen@techllc.com", policy: "Fleet Auto Insurance", status: "Active", premium: "$5,200/yr" },
  { id: 4, name: "Emily Watson", email: "emily.watson@gmail.com", policy: "Premium Health Cover", status: "Active", premium: "$3,100/yr" },
]);
</script>

<template>
  <ClientOnly>
    <div v-if="ready" class="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-gray-800 text-white p-4 sm:p-6 lg:p-8 overflow-hidden relative">
      <!-- Glow blobs -->
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <div class="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl"></div>
        <div class="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div class="absolute -bottom-32 left-1/3 w-96 h-96 rounded-full bg-violet-500/10 blur-3xl"></div>
      </div>

      <div class="max-w-6xl mx-auto relative z-10">
        <!-- HEADER -->
        <header class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 pb-6 border-b border-white/10">
          <div class="flex items-center gap-5">
            <div class="relative">
              <img :src="auth0?.user.value?.picture" class="w-16 h-16 rounded-2xl border border-white/20 shadow-xl" alt="Broker Avatar" />
              <span class="absolute -bottom-1 -right-1 flex h-4 w-4 rounded-full bg-indigo-500 border border-gray-950"></span>
            </div>
            <div>
              <div class="flex items-center gap-2.5">
                <h1 class="text-2xl font-black tracking-tight">{{ auth0?.user.value?.name }}</h1>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 capitalize">
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
              <div class="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                <svg v-if="stat.icon === 'users'" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <svg v-else-if="stat.icon === 'cash'" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <svg v-else class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <span class="inline-flex items-center text-xs font-semibold text-emerald-400 mt-4 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
              {{ stat.change }}
            </span>
          </div>
        </div>

        <!-- MAIN GRID: CLIENTS & QUICK ACTIONS -->
        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Clients list -->
          <div class="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-bold tracking-tight">Active Client Directory</h2>
              <button class="text-xs text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-4 transition-colors">
                View All Clients
              </button>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="border-b border-white/10 text-gray-400 text-xs font-semibold uppercase tracking-wider">
                    <th class="pb-3">Client</th>
                    <th class="pb-3">Policy Type</th>
                    <th class="pb-3">Premium</th>
                    <th class="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-white/5 text-sm">
                  <tr v-for="client in clients" :key="client.id" class="group hover:bg-white/5 transition-colors">
                    <td class="py-4">
                      <div class="font-semibold text-white">{{ client.name }}</div>
                      <div class="text-xs text-gray-400 mt-0.5">{{ client.email }}</div>
                    </td>
                    <td class="py-4 text-gray-300">{{ client.policy }}</td>
                    <td class="py-4 font-medium text-white">{{ client.premium }}</td>
                    <td class="py-4">
                      <span :class="[
                        client.status === 'Active' 
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' 
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/30',
                        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border'
                      ]">
                        {{ client.status }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="space-y-6">
            <div class="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
              <h2 class="text-lg font-bold tracking-tight mb-4">Quick Broker Actions</h2>
              <div class="space-y-3">
                <button class="w-full flex items-center justify-between p-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all duration-300 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 active:translate-y-0.5 group">
                  <span class="flex items-center gap-3">
                    <svg class="w-5 h-5 text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Register Client
                  </span>
                  <svg class="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <button class="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold transition-all duration-300 active:translate-y-0.5 group">
                  <span class="flex items-center gap-3">
                    <svg class="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Submit Policy Request
                  </span>
                  <svg class="w-4 h-4 text-gray-400 group-hover:text-white transform group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <button class="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold transition-all duration-300 active:translate-y-0.5 group">
                  <span class="flex items-center gap-3">
                    <svg class="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Performance Metrics
                  </span>
                  <svg class="w-4 h-4 text-gray-400 group-hover:text-white transform group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Premium Box -->
            <div class="rounded-3xl border border-indigo-500/20 bg-linear-to-br from-indigo-500/10 to-violet-500/10 p-6 relative overflow-hidden group">
              <div class="absolute -right-10 -bottom-10 w-32 h-32 rounded-full bg-indigo-500/10 blur-xl group-hover:scale-125 transition-transform duration-500"></div>
              <h3 class="text-lg font-black text-indigo-300 mb-2">Exclusive Broker Support</h3>
              <p class="text-xs text-gray-400 leading-relaxed mb-4">
                Access priority underwriting, policy updates, and direct support lines for custom client solutions.
              </p>
              <a href="#" class="text-xs font-bold text-white hover:text-indigo-200 transition-colors inline-flex items-center gap-1.5">
                Contact Underwriter
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
