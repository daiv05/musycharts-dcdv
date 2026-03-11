<template>
  <div
    class="flex flex-col group transition-all duration-300 ease-in-out bg-zinc-50 dark:bg-zinc-900/40 border-2 border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 dark:hover:border-emerald-500 rounded-2xl overflow-hidden h-full"
  >
    <div
      class="relative overflow-hidden aspect-video w-full border-b-2 border-zinc-200 dark:border-zinc-800 group-hover:border-emerald-500 transition-colors duration-300"
    >
      <img class="absolute inset-0 w-full h-full object-cover" :src="imageSrc" :alt="title" />
    </div>
    <div class="flex flex-col flex-1 p-5 md:p-6">
      <div
        class="font-bold text-xl mb-2 text-zinc-900 dark:text-zinc-100 transition-colors group-hover:text-emerald-500"
      >
        {{ title }}
      </div>
      <p class="text-sm md:text-base text-zinc-600 dark:text-zinc-400 mb-6 flex-1 leading-relaxed">
        {{ description }}
      </p>

      <!-- Actions at the bottom -->
      <div
        class="flex flex-wrap gap-2 mt-auto pt-4 border-t-2 border-zinc-200 dark:border-zinc-800 transition-colors duration-300 group-hover:border-emerald-500/30"
      >
        <router-link
          v-for="period in periods"
          :key="period.id"
          :to="{
            name: 'top-genres',
            params: {
              chart_type: chartType,
              time_limit: period.id,
              is_track: isTrack,
            },
          }"
          class="flex-1 min-w-[30%]"
        >
          <span
            class="flex items-center justify-center w-full px-3 py-2 bg-zinc-200 dark:bg-zinc-800 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 text-zinc-700 dark:text-zinc-300 rounded-lg text-xs font-bold tracking-wider uppercase cursor-pointer transition-colors duration-300"
          >
            {{ period.label }}
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageSrc: {
    type: String,
    required: true,
  },
  chartType: {
    type: String,
    required: true,
  },
  toggleGenre: {
    type: Number,
    required: true,
  },
});

const { t } = useI18n();

const isTrack = computed(() => (props.toggleGenre ? 1 : 0));

const periods = computed(() => [
  { id: "short_term", label: t("dashboard.period.short") },
  { id: "medium_term", label: t("dashboard.period.medium") },
  { id: "long_term", label: t("dashboard.period.long") },
]);
</script>
