<template>
  <div class="flex flex-col bg-bg-surface border border-border-subtle rounded-xl overflow-hidden transition-colors hover:border-[#3a3a3a]">
    <img :src="image" :alt="name" class="w-full h-40 object-cover" />
    <div class="flex flex-col gap-2 p-4">
      <h3 class="text-base font-bold text-text-primary">{{ name }}</h3>
      <p class="text-xs text-text-secondary leading-snug">{{ desc }}</p>
      <div class="flex flex-wrap gap-2 mt-1">
        <button
          v-for="p in periods"
          :key="p.value"
          class="px-3 py-1 rounded-full border border-border-subtle bg-transparent text-text-primary text-xs font-medium cursor-pointer transition-colors hover:bg-spotify hover:border-spotify hover:text-black"
          @click="$emit('navigate', { chartType, timeRange: p.value, isTrack })"
        >
          {{ p.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  chartType: { type: String, required: true },
  name: { type: String, required: true },
  desc: { type: String, required: true },
  image: { type: String, required: true },
  isTrack: { type: Number, default: 0 },
})

defineEmits(['navigate'])

const { t } = useI18n()

const periods = computed(() => [
  { value: 'short_term',  label: t('dashboard.period.short') },
  { value: 'medium_term', label: t('dashboard.period.medium') },
  { value: 'long_term',   label: t('dashboard.period.long') },
])
</script>
