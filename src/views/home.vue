<template>
  <div class="flex items-center justify-center h-screen">
    <div class="flex flex-col md:flex-row justify-center">
      <div class="flex justify-center mb-4 md:mb-0">
        <img
          src="../assets/img/musylogo22.png"
          alt="logo"
          class="w-auto h-auto max-w-full max-h-[40vh]"
        />
      </div>
      <div class="flex flex-col items-center mt-4 md:ml-4 justify-center px-4">
        <p class="text-xl md:text-2xl text-white mb-2 text-center md:text-left">
          {{ $t("landing.tagline") }}
        </p>
        <p class="text-sm md:text-base text-white mb-8 text-center md:text-left">
          {{ $t("landing.subtitle") }}
        </p>
        <button
          @click="login()"
          class="bg-emerald-600 hover:bg-emerald-700 transition-colors font-semibold text-center text-white rounded-md py-2 px-6 w-full max-w-[250px]"
        >
          {{ $t("landing.loginBtn") }}
        </button>
        <p class="text-sm md:text-base text-white my-4 text-center">o</p>
        <router-link
          :to="{ name: 'stats' }"
          class="bg-indigo-600 flex items-center justify-center hover:bg-indigo-700 transition-colors font-semibold text-white rounded-md py-2 px-6 w-full max-w-[250px]"
        >
          {{ $t("landing.enterBtn") }}
        </router-link>
      </div>
    </div>

    <br />
  </div>
  <!-- Footer -->
  <footer class="bg-gray-200 py-4 md:mt-4 w-full">
    <div class="flex justify-center items-center space-x-4">
      <a
        href="https://github.com/daiv05/musycharts-dcdv"
        target="_blank"
        rel="noopener"
        class="mr-4"
      >
        <img src="../assets/img/github.svg" alt="GitHub" class="h-6 w-6" />
      </a>
      <a href="https://twitter.com/daiv_09" target="_blank" rel="noopener" class="mr-4">
        <img src="../assets/img/twitter.svg" alt="Twitter" class="h-6 w-6" />
      </a>
      <a href="mailto:davidderas50@gmail.com" target="_blank" rel="noopener" class="mr-4">
        <img src="../assets/img/brand-gmail.svg" alt="Gmail" class="h-6 w-6" />
      </a>
    </div>
    <div class="text-center mt-2">
      <p class="text-gray-700">{{ $t("footer.copy", { year: new Date().getFullYear() }) }}</p>
    </div>
  </footer>
</template>

<script setup>
import { useAuth } from "@/composables/useAuth.js";

const { login } = useAuth();
</script>

<style>
html,
body {
  height: 100%;
}
</style>
