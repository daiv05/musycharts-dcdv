<template>
  <div class="flex flex-col min-h-screen bg-bg-base">
    <NavBar />

    <main class="flex-1 flex flex-col md:flex-row items-center justify-between md:justify-center p-6 md:p-8 min-h-[calc(100vh-140px)] md:min-h-0">
      <div class="flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full max-w-[800px] flex-1 md:flex-none justify-center">
        
        <!-- Logo -->
        <div class="flex flex-col items-center justify-center shrink-0 mt-8 md:mt-0">
          <img src="../assets/img/musylogo22.png" alt="musycharts logo" class="w-auto h-auto max-w-[200px] max-h-[200px] md:max-w-[300px] md:max-h-[300px] drop-shadow-2xl" />
        </div>

        <!-- Copy & Actions -->
        <div class="flex flex-col gap-3 text-center md:text-left flex-1 md:flex-none justify-end md:justify-center pb-8 md:pb-0 w-full">
          <div class="mb-4 md:mb-0">
            <h1 class="text-2xl md:text-4xl font-bold leading-tight text-text-primary px-4 md:px-0">{{ t('landing.tagline') }}</h1>
            <p class="text-[0.9rem] md:text-[0.95rem] text-text-secondary leading-relaxed max-w-[380px] mx-auto md:mx-0 mt-2 px-2 md:px-0">{{ t('landing.subtitle') }}</p>
          </div>

          <!-- Actions -->
          <div class="flex flex-col md:flex-row items-center gap-3 mt-auto md:mt-2 w-full md:w-auto">
            <button class="w-full md:w-auto flex items-center justify-center gap-2 py-3.5 md:py-2.5 px-6 bg-spotify text-black font-bold text-sm border-none rounded-full cursor-pointer transition-all hover:bg-spotify-hover hover:scale-[1.02] whitespace-nowrap" @click="login">
              <svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 md:w-4 md:h-4">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 6.628 5.374 12 12 12 6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12zm5.506 17.313a.748.748 0 01-1.03.25c-2.821-1.724-6.37-2.113-10.552-1.158a.748.748 0 01-.885-.574.747.747 0 01.574-.885c4.576-1.044 8.501-.594 11.672 1.337a.749.749 0 01.221 1.03zm1.47-3.267a.937.937 0 01-1.29.308c-3.227-1.984-8.148-2.56-11.97-1.4a.937.937 0 11-.544-1.793c4.362-1.323 9.785-.682 13.496 1.594a.936.936 0 01.308 1.291zm.126-3.402c-3.872-2.3-10.26-2.51-13.952-1.389a1.124 1.124 0 01-.652-2.151c4.245-1.288 11.297-1.04 15.75 1.607a1.124 1.124 0 01-1.146 1.933z"/>
              </svg>
              {{ t('landing.loginBtn') }}
            </button>

            <router-link :to="{ name: 'stats' }" class="w-full md:w-auto flex items-center justify-center py-3.5 md:py-2.5 px-5 bg-transparent text-text-secondary font-semibold text-sm border border-border-subtle rounded-full no-underline transition-colors hover:text-text-primary hover:border-text-mute whitespace-nowrap">
              {{ t('landing.enterBtn') }}
            </router-link>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useAuth } from '@/composables/useAuth.js'
import NavBar from '@/components/NavBar.vue'
import AppFooter from '@/components/AppFooter.vue'

const { t } = useI18n()
const { login } = useAuth()
</script>