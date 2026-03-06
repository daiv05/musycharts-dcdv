<template>
  <footer class="flex flex-col items-center gap-2 py-5 px-6 border-t border-bg-surface w-full mt-auto">
    <div class="flex gap-4 items-center">
      <a href="https://github.com/daiv05/musycharts-dcdv" target="_blank" rel="noopener">
        <img src="../assets/img/github.svg" alt="GitHub" class="w-5 h-5 opacity-50 transition-opacity hover:opacity-100 invert" />
      </a>
      <a href="https://twitter.com/daiv_09" target="_blank" rel="noopener">
        <img src="../assets/img/twitter.svg" alt="Twitter" class="w-5 h-5 opacity-50 transition-opacity hover:opacity-100 invert" />
      </a>
      <a href="mailto:david@deras.dev" target="_blank" rel="noopener">
        <img src="../assets/img/brand-gmail.svg" alt="Gmail" class="w-5 h-5 opacity-50 transition-opacity hover:opacity-100 invert" />
      </a>
    </div>
    <p class="text-[10px] sm:text-xs text-text-mute text-center">{{ t('footer.copy', { year: new Date().getFullYear() }) }}</p>
  </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
