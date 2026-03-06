<template>
  <nav class="fixed bottom-0 left-0 right-0 z-50 flex bg-bg-base border-t border-border-subtle pb-[env(safe-area-inset-bottom,0)] md:hidden">
    <router-link to="/" class="flex-1 flex flex-col items-center justify-center gap-1 py-2 text-text-secondary text-[0.65rem] font-medium no-underline transition-colors hover:text-spotify [&.router-link-active]:text-spotify">
      <svg class="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
      <span>{{ t('nav.home') }}</span>
    </router-link>

    <router-link to="/stats" class="flex-1 flex flex-col items-center justify-center gap-1 py-2 text-text-secondary text-[0.65rem] font-medium no-underline transition-colors hover:text-spotify [&.router-link-active]:text-spotify">
      <svg class="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
      <span>{{ t('nav.charts') }}</span>
    </router-link>
  </nav>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
