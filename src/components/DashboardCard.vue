<template>
  <div
    class="md:col-span-6 col-span-11 transition-colors hover:border-emerald-500 dark:hover:border-emerald-500 ease-in-out delay-100 mx-4 mb-4 pb-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm dark:shadow-none rounded-lg overflow-hidden"
  >
    <img
      class="w-full h-35 md:h-64 object-cover"
      :src="imageSrc"
      :alt="title"
    />
    <div class="px-4 py-2">
      <div class="font-bold text-lg md:text-xl mb-2 text-gray-900 dark:text-white">{{ title }}</div>
      <p class="text-sm md:text-base text-gray-600 dark:text-gray-400">
        {{ description }}
      </p>
    </div>
    <div class="px-4 py-2">
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
        class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 mr-2 mb-2 inline-block"
      >
        <span
          class="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs md:text-sm font-semibold text-gray-700"
          >{{ period.label }}</span
        >
      </router-link>
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
