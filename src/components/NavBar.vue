<template>
  <header class="sticky top-0 z-50 flex items-center justify-between px-4 h-14 bg-bg-base border-b border-border-subtle">
    <router-link to="/" class="no-underline">
      <span class="text-xl font-bold tracking-tight text-text-primary">musy<span class="text-spotify">charts</span></span>
    </router-link>

    <div class="flex items-center gap-4">
      <LanguageSwitcher />
      <template v-if="profile">
        <img
          :src="profile.images?.[0]?.url || defaultAvatar"
          :alt="profile.display_name"
          class="w-8 h-8 rounded-full object-cover border-2 border-border-subtle"
        />
      </template>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import LanguageSwitcher from './LanguageSwitcher.vue'
import { useSpotify } from '@/composables/useSpotify.js'
import { useAuth } from '@/composables/useAuth.js'
import defaultAvatarUrl from '@/assets/img/boy.png'

const { isAuthenticated } = useAuth()
const { getProfile } = useSpotify()
const defaultAvatar = defaultAvatarUrl
const profile = ref(null)

onMounted(async () => {
  if (isAuthenticated.value) {
    try { profile.value = await getProfile() } catch {}
  }
})
</script>
