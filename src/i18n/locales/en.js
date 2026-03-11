export default {
  // Landing
  landing: {
    tagline: "Your music taste like you've never seen it",
    subtitle: "Discover your top artists, genres, and most listened songs — powered by Spotify.",
    loginBtn: "Connect with Spotify",
    enterBtn: "Enter",
  },

  // Nav
  nav: {
    back: "Back",
    home: "Home",
    charts: "Charts",
    share: "Share",
    profile: "Profile",
    logout: "Log out",
    disconnectTitle: "Remove app access",
    disconnectMsg:
      "After confirming you'll be redirected to your Spotify profile. Find musycharts and click Remove Access.",
    disconnectConfirm: "Disconnect",
    disconnectCancel: "Cancel",
  },

  // Dashboard (charts list)
  dashboard: {
    title: "My Charts",
    toggleArtists: "Artists",
    toggleTracks: "Tracks",
    pie: {
      name: "Musypie",
      desc: "Your top {type} in a pie chart.",
    },
    bubble: {
      name: "Musybubble",
      desc: "Your most listened {type} in a bubble map.",
    },
    radar: {
      name: "Musyradar",
      desc: "Your most listened {type} in a radar chart.",
    },
    gauge: {
      name: "Musygauge",
      desc: "Your most listened {type} in circular bars.",
    },
    period: {
      short: "1 month",
      medium: "6 months",
      long: "All time",
    },
  },

  // Chart detail
  detail: {
    topGenres: "Top Genres",
    topArtists: "Top Artists",
    topTracks: "Top Tracks",
    pieType: {
      pie: "Pie",
      radius: "Variable radius",
      gradient: "Gradient",
    },
    export: "Export",
    loading: "Loading...",
    openSpotify: "Open Spotify",
    openOnSpotify: "OPEN ON SPOTIFY",
  },

  // Export card
  export: {
    title: "My music taste",
    topArtists: "Top Artists",
    topTracks: "Top Tracks",
    topGenres: "Top Genres",
    poweredBy: "Powered by Spotify",
    formatSquare: "Square (1:1)",
    formatStory: "Story (9:16)",
    download: "Download image",
    cancel: "Cancel",
    period: {
      short_term: "Last month",
      medium_term: "Last 6 months",
      long_term: "All time",
    },
  },

  // Errors
  error: {
    authExpired: "Session expired. Please log in again.",
    authError: "Authorization error. Please log in again.",
    stateMismatch: "Security error during login. Please try again.",
    generic: "An unexpected error occurred.",
    ok: "OK",
  },

  // Footer
  footer: {
    copy: "© {year} musycharts. Powered by Spotify AB.",
  },
};
