<template>
  <div
    class="min-h-screen bg-linear-to-br from-blue-100 to-indigo-200 flex items-center justify-center px-4"
  >
    <div class="w-full max-w-5xl">
      <div
        class="grid md:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        <!-- left side -->
        <div
          class="hidden md:flex bg-blue-600 text-white p-10 flex-col justify-center"
        >
          <h1 class="text-4xl font-bold mb-4">InsureFlow</h1>
          <p class="text-lg">
            Secure your future with smarter insurance solutions.
          </p>
        </div>

        <!-- right side -->
         <div class="p-8">
            <slot/>
         </div>
      </div>
    </div>
  </div>
</template>
