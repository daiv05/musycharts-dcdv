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
        <p class="text-xl md:text-2xl text-zinc-900 dark:text-zinc-100 mb-2 text-center md:text-left">
          {{ $t("landing.tagline") }}
        </p>
        <p class="text-sm md:text-base text-zinc-600 dark:text-zinc-400 mb-8 text-center md:text-left">
          {{ $t("landing.subtitle") }}
        </p>
        <template v-if="!isAuthenticated">
          <button
            @click="login()"
            class="bg-emerald-600 hover:bg-emerald-700 transition-colors font-semibold text-center text-white rounded-md py-2 px-6 w-full max-w-[250px] cursor-pointer"
          >
            {{ $t("landing.loginBtn") }}
          </button>
        </template>
        <template v-else>
          <router-link
            :to="{ name: 'stats' }"
            class="bg-indigo-600 flex items-center justify-center hover:bg-indigo-700 transition-colors font-semibold text-white rounded-md py-2 px-6 w-full max-w-[250px]"
          >
            {{ $t("landing.enterBtn") }}
          </router-link>
        </template>
      </div>
    </div>

    <br />
  </div>
  <AppFooter />
</template>

<script setup>
import AppFooter from "@/components/AppFooter.vue";
import { useAuth } from "@/composables/useAuth.js";

const { login, isAuthenticated } = useAuth();
</script>

<style>
html,
body {
  height: 100%;
}
</style>
