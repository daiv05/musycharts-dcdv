<template>
  <div
    v-if="perfil != null"
    class="text-center mt-20 py-4 mb-4 mx-4 bg-gray-100 dark:bg-slate-950 border border-gray-300 dark:border-slate-800 rounded-lg overflow-hidden transition-colors"
  >
    <a v-if="perfil.images && perfil.images[0]" :href="perfil.external_urls.spotify" target="_blank">
      <img :src="perfil.images[0].url" class="mx-auto mb-4 w-20 md:w-24 rounded-full" alt="Avatar" />
      <h5 class="mb-2 text-lg md:text-xl font-medium leading-tight text-gray-900 dark:text-white">
        {{ perfil.display_name + " - " + perfil.country }}
      </h5>
    </a>
    <a v-else :href="perfil.external_urls.spotify" target="_blank">
      <img src="../assets/img/boy.png" class="mx-auto mb-4 w-20 md:w-24 rounded-full" alt="Avatar" />
      <h5 class="mb-2 text-lg md:text-xl font-medium leading-tight text-gray-900 dark:text-white">
        {{ perfil.display_name + " - " + perfil.country }}
      </h5>
    </a>
    <div class="mt-2">
      <a
        @click="$emit('disconnect')"
        href="#"
        class="font-normal text-center text-sm rounded"
        style="color: #651111"
      >
        <svg
          class="inline-block h-6 w-6 mr-1"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M8.00195 7C8.01406 4.82497 8.11051 3.64706 8.87889 2.87868C9.75757 2 11.1718 2 14.0002 2H15.0002C17.8286 2 19.2429 2 20.1215 2.87868C21.0002 3.75736 21.0002 5.17157 21.0002 8V16C21.0002 18.8284 21.0002 20.2426 20.1215 21.1213C19.2429 22 17.8286 22 15.0002 22H14.0002C11.1718 22 9.75757 22 8.87889 21.1213C8.11051 20.3529 8.01406 19.175 8.00195 17"
              stroke="#651111"
              stroke-width="1.5"
              stroke-linecap="round"
            ></path>
            <path
              d="M8 19.5C5.64298 19.5 4.46447 19.5 3.73223 18.7678C3 18.0355 3 16.857 3 14.5V9.5C3 7.14298 3 5.96447 3.73223 5.23223C4.46447 4.5 5.64298 4.5 8 4.5"
              stroke="#651111"
              stroke-width="1.5"
            ></path>
            <path
              d="M15 12L6 12M6 12L8 14M6 12L8 10"
              stroke="#651111"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </g>
        </svg>
        {{ $t("nav.logout") }}
      </a>
    </div>
    <div class="w-auto h-auto flex justify-center row">
      <ContentToggle @change="$emit('toggleChange')" />
    </div>
    <div class="w-auto h-auto flex justify-center row">
      <span v-if="toggle_genre" class="ml-2 text-gray-400 text-sm">{{
        $t("dashboard.toggleTracks")
      }}</span>
      <span v-else class="ml-2 text-gray-400 text-sm">{{ $t("dashboard.toggleArtists") }}</span>
    </div>
  </div>
  <div v-else class="text-center">
    <h5 class="mb-2 text-lg md:text-xl font-medium leading-tight">
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
