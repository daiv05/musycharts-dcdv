<template>
  <!-- Modal overlay -->
  <div class="fixed inset-0 z-[200] bg-black/75 flex items-center justify-center p-4 backdrop-blur-sm" @click.self="$emit('close')">
    <div class="bg-bg-surface border border-border-subtle rounded-2xl p-5 w-full max-w-[480px] max-h-[90vh] overflow-y-auto flex flex-col gap-4">
      <div class="flex justify-between items-center">
        <h2 class="text-base font-bold text-text-primary">{{ t('detail.export') }}</h2>
        <button class="bg-transparent border-none text-text-secondary text-lg cursor-pointer leading-none p-1 transition-colors hover:text-text-primary" @click="$emit('close')">✕</button>
      </div>

      <!-- Controls -->
      <div class="flex flex-col gap-3 mb-2">
        <!-- Content to Export -->
        <div>
          <span class="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2 block">Content</span>
          <div class="flex gap-2">
            <button
              class="flex-1 py-1.5 px-3 rounded-lg border border-border-subtle bg-transparent text-text-secondary text-sm font-medium cursor-pointer transition-colors [&.active]:bg-spotify [&.active]:border-spotify [&.active]:text-black hover:text-text-primary"
              :class="{ active: exportType === 'genres' }"
              @click="exportType = 'genres'"
            >Top Genres</button>
            <button
              class="flex-1 py-1.5 px-3 rounded-lg border border-border-subtle bg-transparent text-text-secondary text-sm font-medium cursor-pointer transition-colors [&.active]:bg-spotify [&.active]:border-spotify [&.active]:text-black hover:text-text-primary"
              :class="{ active: exportType === 'artists' }"
              @click="exportType = 'artists'"
            >Top {{ isTrack ? 'Tracks' : 'Artists' }}</button>
          </div>
        </div>

        <!-- Format selector -->
        <div>
          <span class="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2 block">Format</span>
          <div class="flex gap-2">
            <button
              class="flex-1 py-1.5 px-3 rounded-lg border border-border-subtle bg-transparent text-text-secondary text-sm font-medium cursor-pointer transition-colors [&.active]:bg-spotify [&.active]:border-spotify [&.active]:text-black hover:text-text-primary"
              :class="{ active: format === 'square' }"
              @click="format = 'square'"
            >{{ t('export.formatSquare') }}</button>
            <button
              class="flex-1 py-1.5 px-3 rounded-lg border border-border-subtle bg-transparent text-text-secondary text-sm font-medium cursor-pointer transition-colors [&.active]:bg-spotify [&.active]:border-spotify [&.active]:text-black hover:text-text-primary"
              :class="{ active: format === 'story' }"
              @click="format = 'story'"
            >{{ t('export.formatStory') }}</button>
          </div>
        </div>
        
        <!-- Theme selector -->
        <div>
          <span class="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2 block">Theme</span>
          <div class="flex gap-2">
            <button
              class="flex-1 py-1.5 px-3 rounded-lg border border-border-subtle bg-transparent text-text-secondary text-sm font-medium cursor-pointer transition-colors hover:text-text-primary [&.active]:border-white [&.active]:text-white"
              :class="{ active: theme === 'dark' }"
              @click="theme = 'dark'"
            >Dark</button>
            <button
              class="flex-1 py-1.5 px-3 rounded-lg border border-border-subtle bg-transparent text-text-secondary text-sm font-medium cursor-pointer transition-colors hover:text-text-primary [&.active]:bg-white [&.active]:text-black"
              :class="{ active: theme === 'light' }"
              @click="theme = 'light'"
            >Light</button>
            <button
              class="flex-1 py-1.5 px-3 rounded-lg border border-border-subtle bg-transparent text-text-secondary text-sm font-medium cursor-pointer transition-colors hover:text-text-primary [&.active]:bg-spotify [&.active]:border-spotify [&.active]:text-black"
              :class="{ active: theme === 'spotify' }"
              @click="theme = 'spotify'"
            >Spotify</button>
          </div>
        </div>
      </div>

      <!-- Card preview -->
      <div class="flex justify-center bg-[#0a0a0a] rounded-xl p-4 overflow-hidden border border-border-subtle">
        <div
          ref="cardRef"
          class="flex flex-col gap-4 font-sans overflow-hidden shrink-0 transition-all duration-300"
          :class="[
            format === 'story' ? 'w-[180px] aspect-[9/16] p-4 text-[0.6rem]' : 'w-[320px] aspect-square p-5 text-sm',
            themeClasses
          ]"
        >
          <!-- Header -->
          <div class="flex justify-between items-start w-full">
            <div class="font-bold tracking-tight" :class="format === 'story' ? 'text-lg' : 'text-xl'">musy<span :class="theme === 'spotify' ? 'text-black' : 'text-spotify'">charts</span></div>
            <div class="text-right flex flex-col">
              <span class="font-semibold opacity-90">{{ profile?.display_name }}</span>
              <span class="opacity-70 text-[0.8em]">{{ t(`export.period.${timeRange}`) }}</span>
            </div>
          </div>

          <!-- Content: Genres -->
          <div v-if="exportType === 'genres'" class="flex flex-col gap-3 flex-1 justify-center">
            <p class="font-bold tracking-widest uppercase text-[0.7em] opacity-90" :class="theme === 'spotify' ? 'text-black' : 'text-spotify'">{{ t('export.topGenres') }}</p>
            
            <!-- Custom Chart for Genres (Limit to 5) -->
            <div class="flex flex-col gap-2 w-full">
              <div v-for="(g, i) in topGenres.slice(0, 5)" :key="g[0]" class="flex flex-col gap-1 w-full">
                <div class="flex justify-between items-end text-[0.85em] font-semibold">
                  <span class="truncate pr-2">#{{ i + 1 }} {{ g[0] }}</span>
                </div>
                <!-- Dynamic Bar -->
                <div class="w-full flex h-[10px] rounded-full overflow-hidden" :class="theme === 'light' ? 'bg-black/10' : 'bg-white/10'">
                  <div class="h-full rounded-full transition-all" 
                       :class="getBarColor(i, theme)"
                       :style="{ width: `${(g[1] / (topGenres[0]?.[1] || 1)) * 100}%` }">
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Content: Items (Artists / Tracks) -->
          <div v-else class="flex flex-col gap-2 flex-1 justify-center">
            <p class="font-bold tracking-widest uppercase text-[0.7em] opacity-90" :class="theme === 'spotify' ? 'text-black' : 'text-spotify'">
              {{ isTrack ? t('export.topTracks') : t('export.topArtists') }}
            </p>
            
            <div class="flex flex-col gap-2">
              <!-- Limit to 5 items -->
              <div
                v-for="(item, i) in topItems.slice(0, 5)"
                :key="item.id || item.name"
                class="flex items-center gap-2"
              >
                <!-- Avatar -->
                <img
                  :src="isTrack ? item.album?.images?.[0]?.url : item.images?.[0]?.url"
                  :alt="item.name"
                  class="rounded object-cover shrink-0"
                  :class="format === 'story' ? 'w-8 h-8' : 'w-10 h-10'"
                  crossorigin="anonymous"
                />
                
                <div class="flex flex-col min-w-0 flex-1">
                  <div class="flex items-center gap-1.5">
                    <span class="font-bold opacity-50 text-[0.85em] shrink-0">#{{ i + 1 }}</span>
                    <span class="font-bold truncate" :class="format === 'story' ? 'text-[0.9em]' : 'text-sm'">{{ item.name }}</span>
                  </div>
                  <span class="opacity-70 truncate text-[0.8em]">
                    {{ isTrack ? item.artists?.[0]?.name : (item.genres?.[0] || 'Artist') }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer: Spotify attribution -->
          <div class="mt-auto flex gap-1.5 items-center justify-center opacity-90 text-[0.9em]">
            <img :src="spotifyLogoUrl" alt="Spotify" class="h-4 w-auto bg-white px-1.5 py-0.5 rounded-sm" crossorigin="anonymous" />
          </div>
        </div>
      </div>

      <button class="w-full py-3 rounded-xl border-none bg-spotify text-black font-bold text-sm cursor-pointer transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed mt-2 shadow-lg shadow-spotify/20" :disabled="generating" @click="downloadImage">
        <span v-if="!generating">{{ t('export.download') }}</span>
        <span v-else>{{ t('detail.loading') }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import html2canvas from 'html2canvas'
import spotifyLogoUrl from '@/assets/img/logo_spotify.png'

const props = defineProps({
  profile:   { type: Object, default: null },
  topGenres: { type: Array,  default: () => [] },
  topItems:  { type: Array,  default: () => [] },
  isTrack:   { type: Number, default: 0 },
  timeRange: { type: String, default: 'medium_term' },
})

defineEmits(['close'])
const { t } = useI18n()
const cardRef = ref(null)
const format = ref('square')
const theme = ref('dark')
const exportType = ref('genres') // 'genres' | 'artists'
const generating = ref(false)

const themeClasses = computed(() => {
  if (theme.value === 'light') return 'bg-white text-black'
  if (theme.value === 'spotify') return 'bg-spotify text-black'
  return 'bg-[#0f0f0f] text-[#f2f2f2]'
})

const themeBgHex = computed(() => {
  if (theme.value === 'light') return '#ffffff'
  if (theme.value === 'spotify') return '#1DB954'
  return '#0f0f0f'
})

function getBarColor(index, th) {
  const customColors = ['bg-primary', 'bg-secondary', 'bg-tertiary']
  if (th === 'spotify') {
    return 'bg-black' 
  } else if (th === 'light') {
    return ['bg-spotify', 'bg-[#ff547f]', 'bg-[#155abc]'][index % 3]
  }
  return customColors[index % customColors.length]
}

async function downloadImage() {
  if (!cardRef.value) return
  generating.value = true
  
  await nextTick()
  await new Promise(r => setTimeout(r, 100))
  
  try {
    const canvas = await html2canvas(cardRef.value, {
      backgroundColor: themeBgHex.value,
      scale: 3, 
      useCORS: true,
      allowTaint: true,
      logging: false,
      onclone: (documentClone) => {
        const clonedCard = documentClone.querySelector('.flex.flex-col.gap-4.font-sans')
        if (clonedCard) {
          clonedCard.style.fontFamily = "'Inter', -apple-system, sans-serif"
        }
      }
    })
    const link = document.createElement('a')
    link.download = `musycharts-${exportType.value}-${format.value}-${theme.value}.png`
    link.href = canvas.toDataURL('image/png', 1.0)
    link.click()
  } finally {
    generating.value = false
  }
}
</script>
