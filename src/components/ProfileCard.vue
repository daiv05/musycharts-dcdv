<template>
  <div v-if="profile" class="flex items-center justify-between gap-3 p-3 bg-bg-surface border border-border-subtle rounded-xl mb-4">
    <a :href="profile.external_urls?.spotify" target="_blank" class="flex items-center gap-3 no-underline">
      <img
        :src="profile.images?.[0]?.url || defaultAvatar"
        :alt="profile.display_name"
        class="w-11 h-11 rounded-full object-cover shrink-0"
      />
      <div class="flex flex-col">
        <p class="text-[0.9rem] font-semibold text-text-primary">{{ profile.display_name }}</p>
        <p class="text-xs text-text-secondary mt-[1px]">{{ profile.country }}</p>
      </div>
    </a>
    <button class="flex items-center gap-[6px] bg-transparent border border-[#3a3a3a] text-text-secondary text-xs py-1.5 px-2.5 rounded-lg cursor-pointer whitespace-nowrap transition-colors hover:text-text-primary hover:border-text-mute" @click="$emit('logout')">
      <svg class="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span class="md:hidden block">{{ t('nav.logout') }}</span>
    </button>
  </div>
  <div v-else class="flex items-center justify-between gap-3 p-3 bg-bg-surface border border-border-subtle rounded-xl mb-4 pointer-events-none">
    <div class="w-11 h-11 rounded-full shrink-0 animate-pulse bg-border-subtle"></div>
    <div class="flex flex-col flex-1 gap-1.5">
      <div class="h-3.5 rounded-md w-[120px] animate-pulse bg-border-subtle"></div>
      <div class="h-[11px] rounded-md w-[80px] animate-pulse bg-border-subtle"></div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import defaultAvatarImg from '@/assets/img/boy.png'

defineProps({ profile: Object })
defineEmits(['logout'])
const { t } = useI18n()
const defaultAvatar = defaultAvatarImg
</script>
