<template>
  <div class="flex flex-col min-h-screen bg-bg-base">
    <NavBar />

    <!-- Top bar -->
    <div class="flex items-center justify-between p-2.5 px-4 border-b border-bg-surface gap-2">
      <button class="flex items-center gap-1.5 bg-transparent border-none text-text-secondary text-sm cursor-pointer whitespace-nowrap py-1 transition-colors hover:text-text-primary" @click="$router.go(-1)">
        <svg class="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M10 19l-7-7m0 0l7-7m-7 7h18" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        {{ t('nav.back') }}
      </button>

      <div class="flex flex-col items-center text-center flex-1 min-w-0">
        <span class="text-[0.9rem] font-bold text-text-primary">{{ isTrack == 1 ? t('detail.topTracks') : t('detail.topGenres') }}</span>
        <span class="text-[0.7rem] text-text-secondary">{{ t(`export.period.${time_limit}`) }}</span>
      </div>

      <button class="flex items-center gap-[5px] bg-transparent border border-border-subtle text-text-secondary text-[0.75rem] py-1 px-2.5 rounded-lg cursor-pointer whitespace-nowrap transition-colors hover:text-text-primary hover:border-text-mute" @click="showExport = true">
        <svg class="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        {{ t('detail.export') }}
      </button>
    </div>

    <!-- Main layout: chart + list -->
    <div class="flex flex-col md:flex-row flex-1 pb-20 md:pb-0">
      
      <!-- Custom DOM Charts Area (No amCharts) -->
      <section class="p-6 flex flex-col items-center justify-center gap-6 md:flex-1 w-full mx-auto overflow-hidden min-h-[400px]">
        
        <template v-if="!loading && genreData10 && genreData10.length > 0">
          
          <!-- Abstract Brutalist Typographic View (Pie replacement) -->
          <div v-if="chart_type === 'pie'" class="flex flex-col items-center justify-center w-full h-full text-center gap-4 animate-fade-in">
            <div class="text-[0.6rem] font-bold tracking-[0.2em] text-spotify uppercase border border-spotify px-3 py-1 rounded-full">The Pinnacle</div>
            <h3 class="text-6xl md:text-8xl font-black text-text-primary uppercase tracking-tighter leading-none break-all">
              {{ genreData10[0][0] }}
            </h3>
            <p class="text-text-secondary mt-2 max-w-sm text-sm">
              Your auditory landscape is dominated by <strong class="text-white">{{ genreData10[0][0] }}</strong>, capturing {{ Math.round((genreData10[0][1] / genreData10.reduce((a,b)=>a+b[1],0))*100) }}% of your top genres.
            </p>
            <div class="flex flex-wrap justify-center gap-2 mt-4 max-w-md">
              <span v-for="(g, i) in genreData10.slice(1, 5)" :key="g[0]" class="bg-bg-surface text-text-secondary px-3 py-1 rounded-full text-xs font-semibold">
                #{{ i+2 }} {{ g[0] }}
              </span>
            </div>
          </div>

          <!-- The Stack (Radar replacement) -->
          <div v-else-if="chart_type === 'radar'" class="flex items-end justify-center w-full h-[300px] md:h-[400px] gap-2 md:gap-4 animate-fade-in">
            <div v-for="(g, i) in genreData10.slice(0, 7)" :key="g[0]" class="flex flex-col items-center justify-end h-full gap-2 w-10 md:w-16">
              <span class="text-[0.65rem] text-text-mute font-bold -rotate-90 origin-bottom mb-8 whitespace-nowrap">{{ g[0] }}</span>
              <div class="w-full bg-spotify rounded-t-sm transition-all duration-1000 ease-out"
                   :style="{ height: `${(g[1] / genreData10[0][1]) * 100}%`, backgroundColor: getChartColor(i) }">
              </div>
              <span class="text-xs font-bold text-text-primary">{{ Math.round((g[1] / genreData10.reduce((a,b)=>a+b[1],0))*100) }}%</span>
            </div>
          </div>

          <!-- The Scale (Gauge replacement) -->
          <div v-else-if="chart_type === 'gauge'" class="flex flex-col justify-center w-full max-w-lg gap-4 animate-fade-in">
            <div class="text-[0.6rem] font-bold tracking-[0.2em] text-text-secondary uppercase mb-2">The Spectrum</div>
            <div v-for="(g, i) in genreData10.slice(0, 6)" :key="g[0]" class="flex flex-col gap-1 w-full">
              <div class="flex justify-between text-sm font-bold">
                <span class="uppercase tracking-wide text-text-primary">{{ g[0] }}</span>
                <span class="text-text-secondary">{{ g[1] }}</span>
              </div>
              <div class="w-full bg-bg-surface h-6 md:h-8 rounded-sm overflow-hidden">
                <div class="h-full transition-all duration-1000 ease-out flex items-center px-3"
                     :class="getChartColorClass(i)"
                     :style="{ width: `${(g[1] / genreData10[0][1]) * 100}%` }">
                     <span class="text-[10px] text-black font-black opacity-50 block md:hidden">{{ Math.round((g[1] / genreData10.reduce((a,b)=>a+b[1],0))*100) }}%</span>
                </div>
              </div>
            </div>
          </div>

          <!-- The Cluster (Bubble replacement) -->
          <div v-else class="flex flex-wrap items-center justify-center content-center w-full h-[300px] md:h-[400px] gap-2 md:gap-4 max-w-2xl animate-fade-in">
            <div v-for="(g, i) in genreData10" :key="g[0]" 
                 class="flex items-center justify-center rounded-full text-center transition-transform hover:scale-105"
                 :class="[getChartColorClass(i), i === 0 ? 'text-black font-black' : 'text-black/80 font-bold']"
                 :style="{ 
                   width: `${Math.max(60, (g[1] / genreData10[0][1]) * 180)}px`, 
                   height: `${Math.max(60, (g[1] / genreData10[0][1]) * 180)}px`,
                   fontSize: `${Math.max(0.6, (g[1] / genreData10[0][1]) * 1.5)}rem` 
                 }">
              <span class="px-2 break-words leading-tight uppercase">{{ g[0] }}</span>
            </div>
          </div>
          
        </template>
        
        <!-- Loading UI for Charts -->
        <div v-else class="flex flex-col gap-4 animate-pulse w-full max-w-md">
           <div class="w-full h-8 bg-border-subtle rounded-sm"></div>
           <div class="w-3/4 h-8 bg-border-subtle rounded-sm"></div>
           <div class="w-5/6 h-8 bg-border-subtle rounded-sm"></div>
        </div>
      </section>

      <!-- List area -->
      <section class="bg-bg-soft p-4 md:w-[340px] md:shrink-0 md:border-l md:border-bg-surface overflow-y-auto md:max-h-[calc(100vh-112px)]">
        <!-- Loading state -->
        <div v-if="loading" class="flex flex-col gap-2">
          <div v-for="i in 10" :key="i" class="flex gap-3 items-center">
            <div class="w-[46px] h-[46px] rounded-md shrink-0 bg-border-subtle animate-pulse"></div>
            <div>
              <div class="h-[13px] w-[140px] mb-1.5 rounded bg-border-subtle animate-pulse"></div>
              <div class="h-[11px] w-[90px] rounded bg-border-subtle animate-pulse"></div>
            </div>
          </div>
        </div>

        <!-- Artists list -->
        <template v-else-if="isTrack == 0 && artist_info10">
          <div class="flex items-center justify-between mb-3">
            <a
              href="https://www.spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center no-underline opacity-85 transition-opacity hover:opacity-100"
              :aria-label="t('detail.openSpotify')"
            >
              <img src="../assets/img/logo_spotify.png" alt="Spotify" class="h-6 min-w-[72px] w-auto bg-white px-2 py-1 rounded-md" />
            </a>
            <p class="text-xs text-text-mute">Top {{ artist_info10.length }}</p>
          </div>
          <div class="flex flex-col gap-2">
            <a
              v-for="(artist, i) in artist_info10"
              :key="artist.name"
              :href="artist.external_urls.spotify"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 no-underline p-2 rounded-lg border border-transparent transition-colors hover:bg-bg-surface hover:border-border-subtle group"
              :aria-label="`${t('detail.openOnSpotify')}: ${artist.name}`"
            >
              <span class="text-[0.7rem] font-bold text-text-mute w-[22px] text-center shrink-0">#{{ i + 1 }}</span>
              <img :src="artist.images?.[0]?.url" :alt="artist.name" class="w-[46px] h-[46px] rounded-[4px] lg:rounded-lg object-cover shrink-0" />
              <div class="flex flex-col min-w-0 flex-1">
                <p class="text-[0.875rem] font-semibold text-text-primary truncate">{{ artist.name }}</p>
                <p class="text-xs text-text-secondary truncate">{{ artist.genres?.slice(0,2).join(', ') }}</p>
                <p class="text-[0.6rem] font-bold tracking-[0.06em] text-spotify uppercase mt-0.5 opacity-0 transition-opacity group-hover:opacity-100">{{ t('detail.openOnSpotify') }}</p>
              </div>
            </a>
          </div>
        </template>

        <!-- Tracks list -->
        <template v-else-if="isTrack == 1 && tracksData10">
          <div class="flex items-center justify-between mb-3">
            <a
              href="https://www.spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center no-underline opacity-85 transition-opacity hover:opacity-100"
              :aria-label="t('detail.openSpotify')"
            >
              <img src="../assets/img/logo_spotify.png" alt="Spotify" class="h-6 min-w-[72px] w-auto bg-white px-2 py-1 rounded-md" />
            </a>
            <p class="text-xs text-text-mute">Top {{ tracksData10.length }}</p>
          </div>
          <div class="flex flex-col gap-2">
            <a
              v-for="(track, i) in tracksData10"
              :key="track.id"
              :href="track.external_urls.spotify"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 no-underline p-2 rounded-lg border border-transparent transition-colors hover:bg-bg-surface hover:border-border-subtle group"
              :aria-label="`${t('detail.openOnSpotify')}: ${track.name}`"
            >
              <span class="text-[0.7rem] font-bold text-text-mute w-[22px] text-center shrink-0">#{{ i + 1 }}</span>
              <img :src="track.album?.images?.[0]?.url" :alt="track.name" class="w-[46px] h-[46px] rounded-[4px] lg:rounded-lg object-cover shrink-0" />
              <div class="flex flex-col min-w-0 flex-1">
                <p class="text-[0.875rem] font-semibold text-text-primary truncate">{{ track.name }}</p>
                <p class="text-xs text-text-secondary truncate">{{ track.artists?.[0]?.name }}</p>
                <p class="text-[0.6rem] font-bold tracking-[0.06em] text-spotify uppercase mt-0.5 opacity-0 transition-opacity group-hover:opacity-100">{{ t('detail.openOnSpotify') }}</p>
              </div>
            </a>
          </div>
        </template>
      </section>
    </div>

    <!-- Export modal -->
    <ExportCard
      v-if="showExport"
      :profile="profile"
      :top-genres="genreData10 || []"
      :top-items="isTrack == 1 ? (tracksData10 || []) : (artist_info10 || [])"
      :is-track="Number(isTrack)"
      :time-range="time_limit"
      @close="showExport = false"
    />

    <!-- Bottom nav (mobile) -->
    <BottomNav />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSpotify } from '@/composables/useSpotify.js'

import NavBar from '@/components/NavBar.vue'
import BottomNav from '@/components/BottomNav.vue'
import ExportCard from '@/components/ExportCard.vue'

// ── Props ──────────────────────────────────────────────────────────────────
const props = defineProps({
  chart_type: { type: String, required: true },
  time_limit: { type: String, required: true },
  is_track:   { type: [String, Number], default: 0 },
})

// ── State ──────────────────────────────────────────────────────────────────
const { t } = useI18n()
const spotify = useSpotify()

const loading = ref(true)
const showExport = ref(false)

const profile = ref(null)
const genreData10 = ref(null)
const artist_info10 = ref(null)
const tracksData10 = ref(null)

const isTrack = computed(() => Number(props.is_track))

const cssColors = ['#1DB954', '#ff547f', '#00befc', '#155abc', '#f2f2f2', '#a3a3a3', '#1ed760']
const tailwindColors = ['bg-spotify', 'bg-primary', 'bg-secondary', 'bg-tertiary', 'bg-text-primary', 'bg-text-secondary', 'bg-spotify-hover']

function getChartColor(i) {
  return cssColors[i % cssColors.length]
}
function getChartColorClass(i) {
  return tailwindColors[i % tailwindColors.length]
}

// ── Data loading ──────────────────────────────────────────────────────────
onMounted(async () => {
  try {
    profile.value = await spotify.getProfile()
    const artists = await spotify.getTopArtists(props.time_limit, 20)

    // Build genre data
    const counts = {}
    artists.forEach(a => a.genres.forEach(g => { counts[g] = (counts[g] || 0) + 1 }))
    let sorted = Object.entries(counts).map(([k, v]) => [k, v])
    sorted.sort((a, b) => b[1] - a[1])
    genreData10.value = sorted.slice(0, 10)

    artist_info10.value = artists.slice(0, 10)

    // Load tracks
    const tracks = await spotify.getTopTracks(props.time_limit, 10)
    tracksData10.value = tracks.slice(0, 10)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
}
</style>