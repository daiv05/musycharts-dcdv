<template>
  <footer class="bg-gray-100 dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 py-6 md:mt-4 mt-2 w-full transition-colors duration-300">
    <div class="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
      
      <!-- Toggles on the left (or top on mobile) -->
      <div class="flex items-center space-x-4">
        <ThemeToggle />
        <LanguageToggle />
      </div>

      <!-- Socials in the center -->
      <div class="flex items-center space-x-4">
        <a
          href="https://github.com/daiv05/musycharts-dcdv"
          target="_blank"
          rel="noopener"
          class="mr-4 hover:opacity-70 transition-opacity"
        >
          <img src="../assets/svg/github.svg" alt="GitHub" class="h-6 w-6 dark:invert" />
        </a>
        <a href="https://twitter.com/daiv_09" target="_blank" rel="noopener" class="mr-4 hover:opacity-70 transition-opacity">
          <img src="../assets/svg/twitter.svg" alt="Twitter" class="h-6 w-6 dark:invert" />
        </a>
        <a href="mailto:davidderas50@gmail.com" target="_blank" rel="noopener" class="mr-4 hover:opacity-70 transition-opacity">
          <img src="../assets/svg/brand-gmail.svg" alt="Gmail" class="h-6 w-6 dark:invert" />
        </a>
      </div>
      
      <!-- Copyright on the right (or bottom on mobile) -->
      <div class="text-center md:text-right">
        <p class="text-sm text-gray-600 dark:text-gray-400 font-medium">
          {{ $t("footer.copy", { year: new Date().getFullYear() }) }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import ThemeToggle from './ThemeToggle.vue';
import LanguageToggle from './LanguageToggle.vue';
</script>
