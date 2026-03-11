<template>
  <div
    v-if="perfil != null"
    class="w-full max-w-xs mx-auto mt-16 mb-6 p-2 md:p-4 bg-white dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-2xl transition-colors"
  >
    <!-- Profile Info -->
    <a
      :href="perfil.external_urls.spotify"
      target="_blank"
      class="group flex flex-col items-center text-center outline-none"
    >
      <div class="relative mb-4">
        <img
          v-if="perfil.images && perfil.images[0]"
          :src="perfil.images[0].url"
          class="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover ring-4 ring-gray-100 dark:ring-slate-900 group-hover:ring-emerald-500/20 transition-all duration-300"
          alt="Avatar"
        />
        <img
          v-else
          src="../assets/img/boy.png"
          class="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover ring-4 ring-gray-100 dark:ring-slate-900 group-hover:ring-emerald-500/20 transition-all duration-300"
          alt="Avatar Default"
        />
      </div>
      <div>
        <h5
          class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors"
        >
          {{ perfil.display_name }}
        </h5>
        <div class="flex items-center justify-center gap-2 mt-2">
          <span
            class="text-xs font-semibold px-2 py-0.5 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 rounded-md uppercase tracking-wider"
          >
            {{ perfil.country }}
          </span>
        </div>
      </div>
    </a>

    <!-- Divider -->
    <div class="w-full h-px bg-gray-200 dark:bg-slate-800 my-6"></div>

    <!-- Actions Area -->
    <div class="flex flex-col items-center gap-6">
      <!-- Toggle Component -->
      <div class="flex flex-col items-center gap-3 w-full">
        <ContentToggle @change="$emit('toggleChange')" />
        <span
          class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest"
        >
          {{ toggle_genre ? $t("dashboard.toggleTracks") : $t("dashboard.toggleArtists") }}
        </span>
      </div>

      <!-- Logout Button -->
      <button
        @click.prevent="$emit('disconnect')"
        class="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 border border-transparent rounded-xl transition-colors outline-none cursor-pointer"
      >
        <svg
          class="w-5 h-5 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.00195 7C8.01406 4.82497 8.11051 3.64706 8.87889 2.87868C9.75757 2 11.1718 2 14.0002 2H15.0002C17.8286 2 19.2429 2 20.1215 2.87868C21.0002 3.75736 21.0002 5.17157 21.0002 8V16C21.0002 18.8284 21.0002 20.2426 20.1215 21.1213C19.2429 22 17.8286 22 15.0002 22H14.0002C11.1718 22 9.75757 22 8.87889 21.1213C8.11051 20.3529 8.01406 19.175 8.00195 17"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
          ></path>
          <path
            d="M8 19.5C5.64298 19.5 4.46447 19.5 3.73223 18.7678C3 18.0355 3 16.857 3 14.5V9.5C3 7.14298 3 5.96447 3.73223 5.23223C4.46447 4.5 5.64298 4.5 8 4.5"
            stroke="currentColor"
            stroke-width="1.5"
          ></path>
          <path
            d="M15 12L6 12M6 12L8 14M6 12L8 10"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
        {{ $t("nav.logout") }}
      </button>
    </div>
  </div>

  <div
    v-else
    class="w-full max-w-sm mx-auto mt-16 mb-6 p-8 bg-white dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center transition-colors"
  >
    <div
      class="w-10 h-10 border-4 border-gray-200 dark:border-slate-800 border-t-emerald-500 dark:border-t-emerald-500 rounded-full animate-spin mb-4"
    ></div>
    <h5 class="text-sm font-medium text-gray-500 dark:text-gray-400">
      {{ $t("detail.loading") }}
    </h5>
  </div>
</template>

<script setup>
import ContentToggle from "@/components/ContentToggle.vue";

const props = defineProps({
  perfil: {
    type: Object,
    default: null,
  },
  toggle_genre: {
    type: Number,
    required: true,
  },
});

defineEmits(["disconnect", "toggleChange"]);
</script>
