<template>
  <div class="relative inline-flex p-1.5 bg-[#121212]/80 backdrop-blur-xl rounded-full shadow-[inset_0_4px_6px_rgba(0,0,0,0.5)] border border-white/10" role="group">
    <!-- Animated Background -->
    <div 
      class="absolute top-1.5 bottom-1.5 left-1.5 rounded-full transition-transform duration-500 ease-[cubic-bezier(0.68,-0.55,0.26,1.55)]"
      :style="{ width: 'calc(50% - 6px)', transform: modelValue === 0 ? 'translateX(0)' : 'translateX(100%)' }"
    >
      <div 
        class="w-full h-full rounded-full transition-colors duration-500"
        :class="modelValue === 0 
          ? 'bg-linear-to-r from-emerald-500 via-green-500 to-green-400' 
          : 'bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500'"
      ></div>
    </div>

    <button
      class="relative z-10 w-[80px] sm:w-[80px] py-2.5 text-[11px] sm:text-xs font-bold tracking-widest sm:tracking-[0.15em] border-none rounded-full transition-all duration-300 bg-transparent cursor-pointer outline-none flex items-center justify-center gap-2"
      :class="modelValue === 0 ? 'text-white scale-[1.02]' : 'text-gray-400 hover:text-gray-200'"
      @click="$emit('update:modelValue', 0)"
    >
      <span class="truncate">{{ t('dashboard.toggleArtists') }}</span>
    </button>
    <button
      class="relative z-10 w-[80px] sm:w-[80px] py-2.5 text-[11px] sm:text-xs font-bold tracking-widest sm:tracking-[0.15em] border-none rounded-full transition-all duration-300 bg-transparent cursor-pointer outline-none flex items-center justify-center gap-2"
      :class="modelValue === 1 ? 'text-white scale-[1.02]' : 'text-gray-400 hover:text-gray-200'"
      @click="$emit('update:modelValue', 1)"
    >
      <span class="truncate">{{ t('dashboard.toggleTracks') }}</span>
    </button>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
defineProps({ modelValue: { type: Number, default: 0 } })
defineEmits(['update:modelValue'])
</script>