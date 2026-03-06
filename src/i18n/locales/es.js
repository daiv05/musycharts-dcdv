export default {
  // Landing
  landing: {
    tagline: 'Tus gustos musicales como nunca los has visto',
    subtitle: 'Descubre tu top de artistas, géneros y canciones más escuchadas de la mano de Spotify.',
    loginBtn: 'Conectar con Spotify',
    enterBtn: 'Ingresar',
  },

  // Nav
  nav: {
    back: 'Volver',
    home: 'Inicio',
    charts: 'Charts',
    share: 'Compartir',
    profile: 'Perfil',
    logout: 'Cerrar sesión',
    disconnectTitle: 'Quitar acceso a la app',
    disconnectMsg: 'Al confirmar se te redirigirá a tu perfil de Spotify. Busca musycharts y presiona en Eliminar acceso.',
    disconnectConfirm: 'Desconectar',
    disconnectCancel: 'Cancelar',
  },

  // Dashboard (charts list)
  dashboard: {
    title: 'Mis Charts',
    toggleArtists: 'Artistas',
    toggleTracks: 'Canciones',
    pie: {
      name: 'Musypie',
      desc: 'Vista de géneros y {type} favoritos en gráfico de pastel.',
    },
    bubble: {
      name: 'Musybubble',
      desc: 'Tus géneros más escuchados en un mapa de burbujas.',
    },
    radar: {
      name: 'Musyradar',
      desc: 'Distribución de géneros en formato radar.',
    },
    gauge: {
      name: 'Musygauge',
      desc: 'Proporciones de géneros en barras circulares.',
    },
    period: {
      short: '1 mes',
      medium: '6 meses',
      long: 'Siempre',
    },
  },

  // Chart detail
  detail: {
    topGenres: 'Top Géneros',
    topArtists: 'Top Artistas',
    topTracks: 'Top Canciones',
    pieType: {
      pie: 'Pastel',
      radius: 'Radio variable',
      gradient: 'Gradiente',
    },
    export: 'Exportar',
    loading: 'Cargando...',
    openSpotify: 'Abrir Spotify',
    openOnSpotify: 'ABRIR EN SPOTIFY',
  },

  // Export card
  export: {
    title: 'Mis gustos musicales',
    topArtists: 'Top Artistas',
    topTracks: 'Top Canciones',
    topGenres: 'Top Géneros',
    poweredBy: 'Powered by Spotify',
    formatSquare: 'Cuadrado (1:1)',
    formatStory: 'Historia (9:16)',
    download: 'Descargar imagen',
    cancel: 'Cancelar',
    period: {
      short_term: 'Último mes',
      medium_term: 'Últimos 6 meses',
      long_term: 'De todos los tiempos',
    },
  },

  // Errors
  error: {
    authExpired: 'Sesión expirada. Por favor vuelve a iniciar sesión.',
    authError: 'Error de autorización. Por favor vuelve a iniciar sesión.',
    stateMismatch: 'Error de seguridad en el inicio de sesión. Inténtalo de nuevo.',
    generic: 'Ocurrió un error inesperado.',
    ok: 'Entendido',
  },

  // Footer
  footer: {
    copy: '© {year} musycharts. Powered by Spotify AB.',
  },
}
