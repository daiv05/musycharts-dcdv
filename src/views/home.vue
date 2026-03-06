<template>
  <div class="flex flex-col min-h-screen bg-bg-base">
    <NavBar />

    <main class="flex-1 flex items-center justify-center p-6 md:p-8">
      <div class="flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full max-w-[800px]">
        <!-- Logo -->
        <div class="flex justify-center shrink-0">
          <img src="../assets/img/musylogo22.png" alt="musycharts logo" class="w-auto h-auto max-w-[240px] max-h-[240px] md:max-w-[300px] md:max-h-[300px]" />
        </div>

        <!-- Copy -->
        <div class="flex flex-col gap-3 text-center md:text-left">
          <h1 class="text-3xl md:text-4xl font-bold leading-tight text-text-primary">{{ t('landing.tagline') }}</h1>
          <p class="text-[0.95rem] text-text-secondary leading-relaxed max-w-[380px] mx-auto md:mx-0">{{ t('landing.subtitle') }}</p>

          <!-- Actions -->
          <div class="flex flex-col md:flex-row items-center gap-3 mt-2">
            <button class="flex items-center justify-center gap-2 py-2.5 px-6 bg-spotify text-black font-bold text-sm border-none rounded-full cursor-pointer transition-all hover:bg-spotify-hover hover:scale-[1.02] whitespace-nowrap" @click="login">
              <svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 6.628 5.374 12 12 12 6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12zm5.506 17.313a.748.748 0 01-1.03.25c-2.821-1.724-6.37-2.113-10.552-1.158a.748.748 0 01-.885-.574.747.747 0 01.574-.885c4.576-1.044 8.501-.594 11.672 1.337a.749.749 0 01.221 1.03zm1.47-3.267a.937.937 0 01-1.29.308c-3.227-1.984-8.148-2.56-11.97-1.4a.937.937 0 11-.544-1.793c4.362-1.323 9.785-.682 13.496 1.594a.936.936 0 01.308 1.291zm.126-3.402c-3.872-2.3-10.26-2.51-13.952-1.389a1.124 1.124 0 01-.652-2.151c4.245-1.288 11.297-1.04 15.75 1.607a1.124 1.124 0 01-1.146 1.933z"/>
              </svg>
              {{ t('landing.loginBtn') }}
            </button>

            <router-link :to="{ name: 'stats' }" class="flex items-center justify-center py-2.5 px-5 bg-transparent text-text-secondary font-semibold text-sm border border-border-subtle rounded-full no-underline transition-colors hover:text-text-primary hover:border-text-mute whitespace-nowrap">
              {{ t('landing.enterBtn') }}
            </router-link>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="flex flex-col items-center gap-2 py-5 px-6 border-t border-bg-surface">
      <div class="flex gap-4 items-center">
        <a href="https://github.com/daiv05/musycharts-dcdv" target="_blank" rel="noopener">
          <img src="../assets/img/github.svg" alt="GitHub" class="w-5 h-5 opacity-50 transition-opacity hover:opacity-100 invert" />
        </a>
        <a href="https://twitter.com/daiv_09" target="_blank" rel="noopener">
          <img src="../assets/img/twitter.svg" alt="Twitter" class="w-5 h-5 opacity-50 transition-opacity hover:opacity-100 invert" />
        </a>
        <a href="mailto:davidderas50@gmail.com" target="_blank" rel="noopener">
          <img src="../assets/img/brand-gmail.svg" alt="Gmail" class="w-5 h-5 opacity-50 transition-opacity hover:opacity-100 invert" />
        </a>
      </div>
      <p class="text-xs text-text-mute">{{ t('footer.copy', { year: new Date().getFullYear() }) }}</p>
    </footer>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useAuth } from '@/composables/useAuth.js'
import NavBar from '@/components/NavBar.vue'

const { t } = useI18n()
const { login } = useAuth()
</script>