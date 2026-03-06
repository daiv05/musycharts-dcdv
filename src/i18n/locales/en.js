export default {
  // Landing
  landing: {
    tagline: 'Your music taste like you\'ve never seen it',
    subtitle: 'Discover your top artists, genres, and most listened songs — powered by Spotify.',
    loginBtn: 'Connect with Spotify',
    enterBtn: 'Enter',
  },

  // Nav
  nav: {
    back: 'Back',
    home: 'Home',
    charts: 'Charts',
    share: 'Share',
    profile: 'Profile',
    logout: 'Log out',
    disconnectTitle: 'Remove app access',
    disconnectMsg: 'After confirming you\'ll be redirected to your Spotify profile. Find musycharts and click Remove Access.',
    disconnectConfirm: 'Disconnect',
    disconnectCancel: 'Cancel',
  },

  // Dashboard (charts list)
  dashboard: {
    title: 'My Charts',
    toggleArtists: 'Artists',
    toggleTracks: 'Tracks',
    pie: {
      name: 'The Pinnacle',
      desc: 'Your top {type} and the genres dominating your auditory landscape.',
    },
    bubble: {
      name: 'The Cluster',
      desc: 'A network cluster of the genres currently defining your taste in {type}.',
    },
    radar: {
      name: 'The Stack',
      desc: 'A stacked vertical distribution of genres across your {type}.',
    },
    gauge: {
      name: 'The Scale',
      desc: 'A scaling spectrum of proportions for the genres tied to your {type}.',
    },
    period: {
      short: '1 month',
      medium: '6 months',
      long: 'All time',
    },
  },

  // Chart detail
  detail: {
    topGenres: 'Top Genres',
    topArtists: 'Top Artists',
    topTracks: 'Top Tracks',
    pieType: {
      pie: 'Pie',
      radius: 'Variable radius',
      gradient: 'Gradient',
    },
    export: 'Export',
    loading: 'Loading...',
    openSpotify: 'Open Spotify',
    openOnSpotify: 'OPEN ON SPOTIFY',
  },

  // Export card
  export: {
    title: 'My music taste',
    topArtists: 'Top Artists',
    topTracks: 'Top Tracks',
    topGenres: 'Top Genres',
    poweredBy: 'Powered by Spotify',
    formatSquare: 'Square (1:1)',
    formatStory: 'Story (9:16)',
    download: 'Download image',
    cancel: 'Cancel',
    period: {
      short_term: 'Last month',
      medium_term: 'Last 6 months',
      long_term: 'All time',
    },
  },

  // Errors
  error: {
    authExpired: 'Session expired. Please log in again.',
    authError: 'Authorization error. Please log in again.',
    stateMismatch: 'Security error during login. Please try again.',
    generic: 'An unexpected error occurred.',
    ok: 'OK',
  },

  // Footer
  footer: {
    copy: '© {year} musycharts. Powered by Spotify AB.',
  },
}
