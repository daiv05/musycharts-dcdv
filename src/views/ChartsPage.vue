<template>
  <div class="flex flex-col min-h-screen">
    <BackButton />
    <div
      class="flex flex-col md:flex-row flex-1 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300"
    >
      <!-- PERFIL LOGIN INFO -->
      <div
        class="w-full md:w-80 lg:w-96 shrink-0 p-4 md:p-6 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800"
      >
        <ProfileCard
          :perfil="perfil"
          :toggle_genre="toggle_genre"
          @toggle-change="change_toggle"
          @disconnect="disconnect_app"
        />
      </div>
      <!-- CARDS -->
      <div class="flex-1 p-4 md:p-6 lg:p-8">
        <div
          class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6"
        >
          <DashboardCard
            :title="$t('dashboard.pie.name')"
            :description="
              $t('dashboard.pie.desc', {
                type: toggle_genre
                  ? $t('dashboard.toggleTracks').toLowerCase()
                  : $t('dashboard.toggleArtists').toLowerCase(),
              })
            "
            :image-src="pieImg"
            chart-type="pie"
            :toggle-genre="toggle_genre"
          />
          <DashboardCard
            :title="$t('dashboard.bubble.name')"
            :description="
              $t('dashboard.bubble.desc', {
                type: toggle_genre
                  ? $t('dashboard.toggleTracks').toLowerCase()
                  : $t('dashboard.toggleArtists').toLowerCase(),
              })
            "
            :image-src="bubbleImg"
            chart-type="bubble"
            :toggle-genre="toggle_genre"
          />
          <DashboardCard
            :title="$t('dashboard.radar.name')"
            :description="
              $t('dashboard.radar.desc', {
                type: toggle_genre
                  ? $t('dashboard.toggleTracks').toLowerCase()
                  : $t('dashboard.toggleArtists').toLowerCase(),
              })
            "
            :image-src="radarImg"
            chart-type="radar"
            :toggle-genre="toggle_genre"
          />
          <DashboardCard
            :title="$t('dashboard.gauge.name')"
            :description="
              $t('dashboard.gauge.desc', {
                type: toggle_genre
                  ? $t('dashboard.toggleTracks').toLowerCase()
                  : $t('dashboard.toggleArtists').toLowerCase(),
              })
            "
            :image-src="gaugeImg"
            chart-type="gauge"
            :toggle-genre="toggle_genre"
          />
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import swal from "sweetalert";
import AppFooter from "@/components/AppFooter.vue";
import BackButton from "@/components/BackButton.vue";
import ProfileCard from "@/components/ProfileCard.vue";
import DashboardCard from "@/components/DashboardCard.vue";
import pieImg from "@/assets/img/pastel-img.png";
import bubbleImg from "@/assets/img/bubble-img.png";
import radarImg from "@/assets/img/radar-img.png";
import gaugeImg from "@/assets/img/gauge-img.png";
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
