<template>
  <div class="inline-flex bg-[#2a2a2a] rounded-lg p-[3px] gap-[2px]" role="group">
    <button
      class="px-4 py-1.5 text-xs font-semibold border-none rounded-md bg-transparent text-text-secondary cursor-pointer transition-colors hover:text-text-primary [&.active]:bg-bg-surface [&.active]:text-text-primary"
      :class="{ active: modelValue === 0 }"
      @click="$emit('update:modelValue', 0)"
    >
      {{ t('dashboard.toggleArtists') }}
    </button>
    <button
      class="px-4 py-1.5 text-xs font-semibold border-none rounded-md bg-transparent text-text-secondary cursor-pointer transition-colors hover:text-text-primary [&.active]:bg-bg-surface [&.active]:text-text-primary"
      :class="{ active: modelValue === 1 }"
      @click="$emit('update:modelValue', 1)"
    >
      {{ t('dashboard.toggleTracks') }}
    </button>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
defineProps({ modelValue: { type: Number, default: 0 } })
defineEmits(['update:modelValue'])
</script>