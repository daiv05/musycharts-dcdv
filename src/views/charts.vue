<template>
  <div class="flex flex-col min-h-screen bg-bg-base" :class="{ 'opacity-50 pointer-events-none': !profile }">
    <NavBar />

    <div class="flex flex-1">
      <!-- Sidebar (desktop) -->
      <aside class="hidden md:flex flex-col w-[240px] shrink-0 border-r border-bg-surface p-5 gap-4">
        <div class="flex flex-col gap-4 sticky top-[72px]">
          <ProfileCard :profile="profile" @logout="handleLogout" />
          <ToggleMode v-model="isTrack" class="self-start" />
        </div>
      </aside>

      <!-- Main content -->
      <main class="flex-1 p-5 pb-20 md:p-6 md:pb-6">
        <!-- Mobile: profile + toggle inline -->
        <div class="flex flex-col gap-3 mb-4 md:hidden">
          <ProfileCard :profile="profile" @logout="handleLogout" />
          <div class="flex">
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
    </div>

    <!-- Footer -->
    <footer class="hidden md:block p-4 text-center border-t border-bg-surface text-xs text-text-mute">
      <p>{{ t('footer.copy', { year: new Date().getFullYear() }) }}</p>
    </footer>

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

// ── Chart list ─────────────────────────────────────────────────────────────
const chartList = computed(() => [
  {
    type: 'pie',
    name: t('dashboard.pie.name'),
    desc: t('dashboard.pie.desc', { type: isTrack.value ? t('dashboard.toggleTracks') : t('dashboard.toggleArtists') }),
    image: pastelImg,
  },
  {
    type: 'bubble',
    name: t('dashboard.bubble.name'),
    desc: t('dashboard.bubble.desc'),
    image: bubbleImg,
  },
  {
    type: 'radar',
    name: t('dashboard.radar.name'),
    desc: t('dashboard.radar.desc'),
    image: radarImg,
  },
  {
    type: 'gauge',
    name: t('dashboard.gauge.name'),
    desc: t('dashboard.gauge.desc'),
    image: gaugeImg,
  },
])

// ── Auth & init ─────────────────────────────────────────────────────────────
onMounted(async () => {
  // Handle OAuth callback
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
    // Remove code from URL without reloading
    window.history.replaceState({}, '', '/stats')
  } else if (!auth.isAuthenticated.value) {
    router.push('/')
    return
  }

  try {
    profile.value = await spotify.getProfile()
  } catch {
    // token may have expired — interceptor will retry; if still fails, redirect
    router.push('/')
  }
})

// ── Actions ─────────────────────────────────────────────────────────────────
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
