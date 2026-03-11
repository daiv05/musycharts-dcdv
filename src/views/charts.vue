<template>
  <!-- Regresar a la pagina anterior -->
  <div class="flex bg-gray-950 justify-left items-center space-x-4">
    <a @click="$router.go(-1)" href="#" class="mr-4 flex items-center">
      <img src="../assets/img/arrow-left.svg" alt="Regresar" class="h-6 w-6 mr-1" />
      {{ $t("nav.back") }}
    </a>
  </div>
  <div class="grid grid-cols-12 bg-gray-950 h-full">
    <!-- PERFIL LOGIN INFO -->
    <div class="col-span-3 md:col-span-2 items-start justify-center">
      <div
        v-if="perfil != null"
        class="text-center mt-20 py-4 mb-4 mx-4 bg-slate-950 border border-slate-800 rounded-lg overflow-hidden"
      >
        <a v-if="perfil.images[0]" :href="perfil.external_urls.spotify" target="_blank">
          <img :src="perfil.images[0].url" class="mx-auto mb-4 w-20 md:w-24" alt="Avatar" />
          <h5 class="mb-2 text-lg md:text-xl font-medium leading-tight">
            {{ perfil.display_name + " - " + perfil.country }}
          </h5>
        </a>
        <a v-else :href="perfil.external_urls.spotify" target="_blank">
          <img src="../assets/img/boy.png" class="mx-auto mb-4 w-20 md:w-24" alt="Avatar" />
          <h5 class="mb-2 text-lg md:text-xl font-medium leading-tight">
            {{ perfil.display_name + " - " + perfil.country }}
          </h5>
        </a>
        <div class="mt-2">
          <a
            @click="disconnect_app()"
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
          <Toggle @change="change_toggle()" />
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
    </div>
    <!-- CARDS -->
    <div class="col-span-9 items-center justify-center mb-4 pt-8">
      <div class="grid grid-cols-12">
        <!-- Grafico de pastel -->
        <div
          class="md:col-span-6 col-span-11 transition-colors hover:border-gray-500 ease-in-out mx-4 pb-8 mb-4 bg-gray-900 border border-gray-800 rounded-lg overflow-hidden"
        >
          <img
            class="w-full h-35 md:h-64 object-cover"
            src="../assets/img/pastel-img.png"
            alt="Sunset in the mountains"
          />
          <div class="px-4 py-2">
            <div class="font-bold text-lg md:text-xl mb-2">{{ $t("dashboard.pie.name") }}</div>
            <p class="text-sm md:text-base text-gray-400">
              {{
                $t("dashboard.pie.desc", {
                  type: toggle_genre
                    ? $t("dashboard.toggleTracks").toLowerCase()
                    : $t("dashboard.toggleArtists").toLowerCase(),
                })
              }}
            </p>
          </div>
          <div class="px-4 py-2">
            <router-link
              :to="{
                name: 'top-genres',
                params: {
                  chart_type: 'pie',
                  time_limit: 'short_term',
                  is_track: toggle_genre ? 1 : 0,
                },
              }"
              class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ..."
            >
              <span
                class="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-2 mb-2"
                >{{ $t("dashboard.period.short") }}</span
              >
            </router-link>
            <router-link
              :to="{
                name: 'top-genres',
                params: {
                  chart_type: 'pie',
                  time_limit: 'medium_term',
                  is_track: toggle_genre ? 1 : 0,
                },
              }"
              class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ..."
            >
              <span
                class="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-2 mb-2"
                >{{ $t("dashboard.period.medium") }}</span
              >
            </router-link>
            <router-link
              :to="{
                name: 'top-genres',
                params: {
                  chart_type: 'pie',
                  time_limit: 'long_term',
                  is_track: toggle_genre ? 1 : 0,
                },
              }"
              class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ..."
            >
              <span
                class="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-2 mb-2"
                >{{ $t("dashboard.period.long") }}</span
              >
            </router-link>
          </div>
        </div>
        <!-- Grafico de burbujas -->
        <div
          class="md:col-span-6 col-span-11 transition-colors hover:border-gray-500 ease-in-out delay-100 mx-4 mb-4 pb-8 bg-gray-900 border border-gray-800 rounded-lg overflow-hidden"
        >
          <img
            class="w-full h-35 md:h-64 object-cover"
            src="../assets/img/bubble-img.png"
            alt="Sunset in the mountains"
          />
          <div class="px-4 py-2">
            <div class="font-bold text-lg md:text-xl mb-2">{{ $t("dashboard.bubble.name") }}</div>
            <p class="text-sm md:text-base text-gray-400">
              {{
                $t("dashboard.bubble.desc", {
                  type: toggle_genre
                    ? $t("dashboard.toggleTracks").toLowerCase()
                    : $t("dashboard.toggleArtists").toLowerCase(),
                })
              }}
            </p>
          </div>
          <div class="px-4 py-2">
            <router-link
              :to="{
                name: 'top-genres',
                params: {
                  chart_type: 'bubble',
                  time_limit: 'short_term',
                  is_track: toggle_genre ? 1 : 0,
                },
              }"
              class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ..."
            >
              <span
                class="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-2 mb-2"
                >{{ $t("dashboard.period.short") }}</span
              >
            </router-link>
            <router-link
              :to="{
                name: 'top-genres',
                params: {
                  chart_type: 'bubble',
                  time_limit: 'medium_term',
                  is_track: toggle_genre ? 1 : 0,
                },
              }"
              class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ..."
            >
              <span
                class="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-2 mb-2"
                >{{ $t("dashboard.period.medium") }}</span
              >
            </router-link>
            <router-link
              :to="{
                name: 'top-genres',
                params: {
                  chart_type: 'bubble',
                  time_limit: 'long_term',
                  is_track: toggle_genre ? 1 : 0,
                },
              }"
              class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ..."
            >
              <span
                class="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-2 mb-2"
                >{{ $t("dashboard.period.long") }}</span
              >
            </router-link>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-12">
        <!-- Grafico de radar -->
        <div
          class="md:col-span-6 col-span-11 transition-colors hover:border-gray-500 ease-in-out delay-100 mx-4 mb-4 pb-8 bg-gray-900 border border-gray-800 rounded-lg overflow-hidden"
        >
          <img
            class="w-full h-35 md:h-64 object-cover"
            src="../assets/img/radar-img.jpeg"
            alt="Sunset in the mountains"
          />
          <div class="px-4 py-2">
            <div class="font-bold text-lg md:text-xl mb-2">{{ $t("dashboard.radar.name") }}</div>
            <p class="text-sm md:text-base text-gray-400">
              {{
                $t("dashboard.radar.desc", {
                  type: toggle_genre
                    ? $t("dashboard.toggleTracks").toLowerCase()
                    : $t("dashboard.toggleArtists").toLowerCase(),
                })
              }}
            </p>
          </div>
          <div class="px-4 py-2">
            <router-link
              :to="{
                name: 'top-genres',
                params: {
                  chart_type: 'radar',
                  time_limit: 'short_term',
                  is_track: toggle_genre ? 1 : 0,
                },
              }"
              class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ..."
            >
              <span
                class="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-2 mb-2"
                >{{ $t("dashboard.period.short") }}</span
              >
            </router-link>
            <router-link
              :to="{
                name: 'top-genres',
                params: {
                  chart_type: 'radar',
                  time_limit: 'medium_term',
                  is_track: toggle_genre ? 1 : 0,
                },
              }"
              class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ..."
            >
              <span
                class="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-2 mb-2"
                >{{ $t("dashboard.period.medium") }}</span
              >
            </router-link>
            <router-link
              :to="{
                name: 'top-genres',
                params: {
                  chart_type: 'radar',
                  time_limit: 'long_term',
                  is_track: toggle_genre ? 1 : 0,
                },
              }"
              class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ..."
            >
              <span
                class="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-2 mb-2"
                >{{ $t("dashboard.period.long") }}</span
              >
            </router-link>
          </div>
        </div>
        <!-- Grafico gauge -->
        <div
          class="md:col-span-6 col-span-11 transition-colors hover:border-gray-500 ease-in-out delay-100 mx-4 mb-4 pb-8 bg-gray-900 border border-gray-800 rounded-lg overflow-hidden"
        >
          <img
            class="w-full h-35 md:h-64 object-cover"
            src="../assets/img/gauge-img.jpeg"
            alt="Sunset in the mountains"
          />
          <div class="px-4 py-2">
            <div class="font-bold text-lg md:text-xl mb-2">{{ $t("dashboard.gauge.name") }}</div>
            <p class="text-sm md:text-base text-gray-400">
              {{
                $t("dashboard.gauge.desc", {
                  type: toggle_genre
                    ? $t("dashboard.toggleTracks").toLowerCase()
                    : $t("dashboard.toggleArtists").toLowerCase(),
                })
              }}
            </p>
          </div>
          <div class="px-4 py-2">
            <router-link
              :to="{
                name: 'top-genres',
                params: {
                  chart_type: 'gauge',
                  time_limit: 'short_term',
                  is_track: toggle_genre ? 1 : 0,
                },
              }"
              class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ..."
            >
              <span
                class="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-2 mb-2"
                >{{ $t("dashboard.period.short") }}</span
              >
            </router-link>
            <router-link
              :to="{
                name: 'top-genres',
                params: {
                  chart_type: 'gauge',
                  time_limit: 'medium_term',
                  is_track: toggle_genre ? 1 : 0,
                },
              }"
              class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ..."
            >
              <span
                class="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-2 mb-2"
                >{{ $t("dashboard.period.medium") }}</span
              >
            </router-link>
            <router-link
              :to="{
                name: 'top-genres',
                params: {
                  chart_type: 'gauge',
                  time_limit: 'long_term',
                  is_track: toggle_genre ? 1 : 0,
                },
              }"
              class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ..."
            >
              <span
                class="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-2 mb-2"
                >{{ $t("dashboard.period.long") }}</span
              >
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Footer -->
  <footer class="bg-gray-200 py-4 mt-2 w-full">
    <div class="flex justify-center items-center space-x-4">
      <a
        href="https://github.com/daiv05/musycharts-dcdv"
        target="_blank"
        rel="noopener"
        class="mr-4"
      >
        <img src="../assets/img/github.svg" alt="GitHub" class="h-6 w-6" />
      </a>
      <a href="https://twitter.com/daiv_09" target="_blank" rel="noopener" class="mr-4">
        <img src="../assets/img/twitter.svg" alt="Twitter" class="h-6 w-6" />
      </a>
      <a href="mailto:davidderas50@gmail.com" target="_blank" rel="noopener" class="mr-4">
        <img src="../assets/img/brand-gmail.svg" alt="Gmail" class="h-6 w-6" />
      </a>
    </div>
    <div class="text-center mt-2">
      <p class="text-gray-700">{{ $t("footer.copy", { year: new Date().getFullYear() }) }}</p>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import swal from "sweetalert";
import Toggle from "@/components/toggle.vue";
import { useAuth } from "@/composables/useAuth.js";
import { useSpotify } from "@/composables/useSpotify.js";
import { useI18n } from "vue-i18n";

const router = useRouter();
const route = useRoute();
const { t } = useI18n();

const { handleCallback, isAuthenticated, logout } = useAuth();
const { getProfile, clearCache } = useSpotify();

const perfil = ref(null);
const toggle_genre = ref(Number(localStorage.getItem("toggle_genre") == 1 ? 1 : 0));

function change_toggle() {
  toggle_genre.value = Number(localStorage.getItem("toggle_genre") == 1 ? 1 : 0);
}

onMounted(async () => {
  const code = route.query.code;

  if (code) {
    // Returned from Spotify Auth, handle callback. Since url changes, use location.search
    const urlParams = new URLParams(window.location.search);
    const result = await handleCallback(urlParams);

    if (!result.ok) {
      swal({
        title: t("error.generic"),
        text: t("error.stateMismatch"),
        icon: "error",
        button: t("error.ok"),
      });
      router.push("/");
      return;
    }

    // Remove code from URL manually or via router
    router.replace({ path: "/stats" });
  } else if (!isAuthenticated.value) {
    swal({
      title: t("error.generic"),
      text: t("error.authError"),
      icon: "error",
      button: t("error.ok"),
    });
    router.push("/");
    return;
  }

  // Fetch profile
  try {
    perfil.value = await getProfile();
  } catch (error) {
    console.error(error);
    swal({
      title: t("error.generic"),
      text: t("error.authExpired"),
      icon: "error",
      button: t("error.ok"),
    });
    logout(router);
  }
});

function disconnect_app() {
  swal({
    title: t("nav.disconnectTitle"),
    text: t("nav.disconnectMsg"),
    buttons: [t("nav.disconnectCancel"), t("nav.disconnectConfirm")],
    dangerMode: true,
  }).then((willDisconnect) => {
    if (willDisconnect) {
      clearCache();
      logout();
      window.open("https://www.spotify.com/account/apps/", "_blank");
      router.push("/");
    }
  });
}
</script>
