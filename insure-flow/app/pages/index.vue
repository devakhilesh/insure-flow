<template>

  <div
    class="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white"
  >

    <!-- NAVBAR -->

    <header
      class="flex items-center justify-between px-8 py-6"
    >

      <h1
        class="text-2xl font-bold"
      >
        InsureFlow
      </h1>

      <div
        class="flex gap-4"
      >

        <NuxtLink
          to="/login"
          class="px-5 py-2 rounded-xl border border-white/20 hover:bg-white hover:text-black transition"
        >
          Login
        </NuxtLink>

        <NuxtLink
          to="/dashboard"
          class="px-5 py-2 rounded-xl bg-white text-black hover:opacity-90 transition"
        >
          Dashboard
        </NuxtLink>

      </div>

    </header>

    <!-- HERO -->

    <section
      class="max-w-6xl mx-auto px-8 pt-24 pb-20 grid lg:grid-cols-2 gap-12 items-center"
    >

      <!-- LEFT -->

      <div>

        <p
          class="uppercase tracking-[6px] text-gray-400 mb-4"
        >
          Insurance CRM
        </p>

        <h1
          class="text-5xl lg:text-7xl font-black leading-tight mb-6"
        >
          Secure
          Auth0
          Insurance
          Platform
        </h1>

        <p
          class="text-gray-300 text-lg leading-8 mb-8"
        >
          Complete modern insurance CRM with
          Auth0 authentication, role-based
          access, dashboard management and
          scalable architecture.
        </p>

        <div
          class="flex flex-wrap gap-4"
        >

          <NuxtLink
            to="/login"
            class="px-8 py-4 rounded-2xl bg-white text-black font-semibold hover:scale-105 transition"
          >
            Get Started
          </NuxtLink>

          <NuxtLink
            to="/dashboard"
            class="px-8 py-4 rounded-2xl border border-white/20 hover:bg-white hover:text-black transition"
          >
            Open Dashboard
          </NuxtLink>

        </div>

      </div>

      <!-- RIGHT -->

      <div
        class="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl"
      >

        <div
          class="space-y-6"
        >

          <div
            class="bg-black/30 rounded-2xl p-6"
          >

            <p
              class="text-gray-400 text-sm mb-2"
            >
              Authentication
            </p>

            <h2
              class="text-2xl font-bold"
            >
              Auth0 Login
            </h2>

          </div>

          <div
            class="bg-black/30 rounded-2xl p-6"
          >

            <p
              class="text-gray-400 text-sm mb-2"
            >
              Role Based Access
            </p>

            <h2
              class="text-2xl font-bold"
            >
              Broker / Customer
            </h2>

          </div>

          <div
            class="bg-black/30 rounded-2xl p-6"
          >

            <p
              class="text-gray-400 text-sm mb-2"
            >
              Backend
            </p>

            <h2
              class="text-2xl font-bold"
            >
              Nuxt + Drizzle + PostgreSQL
            </h2>

          </div>

        </div>

      </div>

    </section>

  </div>

</template>