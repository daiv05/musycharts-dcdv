<template>
  <div
    class="relative inline-flex bg-gray-200 dark:bg-gray-800 rounded-full h-8 overflow-hidden select-none"
  >
    <!-- Sliding highlight background -->
    <div
      class="absolute top-1 left-1 bottom-1 w-[calc(50%-4px)] bg-white dark:bg-gray-600 rounded-full shadow-sm transition-transform duration-300 ease-out z-0"
      :class="currentLocale === 'en' ? 'translate-x-[calc(100%)]' : 'translate-x-0'"
    ></div>

    <button
      @click="setLanguage('es')"
      class="relative z-10 px-3 py-1 text-xs font-bold rounded-full transition-colors duration-300 w-12 text-center cursor-pointer"
      aria-label="Cambiar a Español"
    >
      ES
    </button>
    <button
      @click="setLanguage('en')"
      class="relative z-10 px-3 py-1 text-xs font-bold rounded-full transition-colors duration-300 w-12 text-center cursor-pointer"
      aria-label="Switch to English"
    >
      EN
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const currentLocale = computed(() => locale.value);

const setLanguage = (lang) => {
  if (locale.value !== lang) {
    locale.value = lang;
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }
};
</script>
