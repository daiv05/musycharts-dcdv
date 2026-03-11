<template>
  <div v-if="items != null" class="md:w-1/3 md:ml-4 pt-4 md:mt-4 pl-8 py-8 bg-gray-100 border md:border-t-0 md:border-b-0 border-gray-200 transition-colors rounded-lg">
    <img
      src="../assets/img/logo_spotify.png"
      alt="logo_spotify"
      class="w-32 items-start mx-2 my-8"
    />
    <div class="flex flex-wrap">
      <div v-for="(item, index) in items" :key="item.id || item.name" class="md:w-1/2 px-2">
        <a :href="item.external_urls.spotify" target="_blank">
          <div
            class="w-full my-2 transition hover:-translate-y-1 hover:scale-105 ease-in-out delay-100 overflow-hidden"
          >
            <img
              :src="getImageUrl(item)"
              style="height: 100px"
              :alt="getName(item)"
              class="md:block rounded-sm shadow-sm"
            />
            <span class="text-sm text-gray-900 md:text-base mt-1" style="max-width: 100px">
              <span class="font-bold text-emerald-600 mr-1">{{ "#" + (index + 1) }}</span>
              {{ getName(item) }}
            </span>
          </div>
        </a>
      </div>
    </div>
  </div>
  <div v-else>
    <h2>{{ $t("detail.loading") }}</h2>
  </div>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: null,
  },
  isTrack: {
    type: [Number, String, Boolean],
    required: true,
  },
});

function getImageUrl(item) {
  if (props.isTrack == 1) {
    return item.album?.images[0]?.url;
  }
  return item.images && item.images[0] ? item.images[0].url : '';
}

function getName(item) {
  return item.name;
}
</script>
