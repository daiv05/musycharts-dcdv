<template>
  <div class="flex flex-col min-h-screen bg-bg-base" :class="{ 'opacity-50 pointer-events-none': !profile }">
    <NavBar />

    <div class="flex flex-1">
      <!-- Sidebar (desktop) -->
      <aside class="hidden md:flex flex-col w-[240px] shrink-0 border-r border-bg-surface p-5 gap-4 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
        <ProfileCard :profile="profile" @logout="handleLogout" />
        <ToggleMode v-model="isTrack" class="self-center" />
      </aside>

      <!-- Main content column -->
      <div class="flex-1 flex flex-col min-w-0">
        <main class="flex-1 p-5 pb-20 md:p-6 md:pb-6">
        <!-- Mobile: profile + toggle inline -->
        <div class="flex flex-col gap-3 mb-4 md:hidden">
          <ProfileCard :profile="profile" @logout="handleLogout" />
          <div class="flex justify-center">
            <ToggleMode v-model="isTrack" />
          </div>
        </div>

        <h2 class="text-[1.1rem] font-bold text-text-primary mb-4">{{ t('dashboard.title') }}</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ChartCard
            v-for="chart in chartList"
            :key="chart.type"
            :chart-type="chart.type"
            :name="chart.name"
            :desc="chart.desc"
            :image="chart.image"
            :is-track="isTrack"
            @navigate="navigateToChart"
          />
        </div>
      </main>
      
      <!-- Footer -->
      <AppFooter class="hidden md:flex" />
    </div>
  </div>

    <!-- Bottom nav (mobile) -->
    <BottomNav />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuth } from '@/composables/useAuth.js'
import { useSpotify } from '@/composables/useSpotify.js'

import NavBar from '@/components/NavBar.vue'
import BottomNav from '@/components/BottomNav.vue'
import ProfileCard from '@/components/ProfileCard.vue'
import ChartCard from '@/components/ChartCard.vue'
import ToggleMode from '@/components/ToggleMode.vue'
import AppFooter from '@/components/AppFooter.vue'

import pastelImg  from '@/assets/img/pastel-img.png'
import bubbleImg  from '@/assets/img/bubble-img.png'
import radarImg   from '@/assets/img/radar-img.jpeg'
import gaugeImg   from '@/assets/img/gauge-img.jpeg'

const { t } = useI18n()
const router = useRouter()
const auth = useAuth()
const spotify = useSpotify()

const profile = ref(null)
const isTrack = ref(0)

const chartList = computed(() => {
  const currentType = isTrack.value ? t('dashboard.toggleTracks').toLowerCase() : t('dashboard.toggleArtists').toLowerCase();
  
  return [
    {
      type: 'pie',
      name: t('dashboard.pie.name'),
      desc: t('dashboard.pie.desc', { type: currentType }),
      image: pastelImg,
    },
    {
      type: 'bubble',
      name: t('dashboard.bubble.name'),
      desc: t('dashboard.bubble.desc', { type: currentType }),
      image: bubbleImg,
    },
    {
      type: 'radar',
      name: t('dashboard.radar.name'),
      desc: t('dashboard.radar.desc', { type: currentType }),
      image: radarImg,
    },
    {
      type: 'gauge',
      name: t('dashboard.gauge.name'),
      desc: t('dashboard.gauge.desc', { type: currentType }),
      image: gaugeImg,
    },
  ]
})

onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get('code')

  if (code) {
    const result = await auth.handleCallback(urlParams)
    if (!result.ok) {
      const reason = result.reason === 'state_mismatch'
        ? t('error.stateMismatch')
        : t('error.authError')
      alert(reason)
      router.push('/')
      return
    }
    window.history.replaceState({}, '', '/stats')
  } else if (!auth.isAuthenticated.value) {
    router.push('/')
    return
  }

  try {
    profile.value = await spotify.getProfile()
  } catch {
    router.push('/')
  }
})

function navigateToChart({ chartType, timeRange, isTrack: track }) {
  router.push({
    name: 'top-genres',
    params: { chart_type: chartType, time_limit: timeRange, is_track: track },
  })
}

function handleLogout() {
  if (confirm(t('nav.disconnectTitle') + '\n' + t('nav.disconnectMsg'))) {
    spotify.clearCache()
    auth.logout(router)
    window.open('https://www.spotify.com/account/apps/', '_blank')
  }
}
</script>
