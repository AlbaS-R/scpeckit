export default {
  theme: {
    extend: {
      colors: {
        arcane: {
          dark: '#060a14',
          darker: '#030612',
          card: '#0f1528',
          gold: '#c8a96e',
          'gold-light': '#e0c88a',
          'gold-dark': '#a08050',
          cyan: '#00d4ff',
          'cyan-dark': '#0099cc',
          shimmer: '#ff0060',
          zaun: '#00bfa5',
          purple: '#7c4dff',
          text: '#e8eaf6',
          'text-muted': '#7986cb',
          border: '#1a237e',
        },
        ability: {
          q: '#00d4ff',
          w: '#ff0060',
          e: '#00bfa5',
          r: '#7c4dff',
          p: '#5c6bc0',
        },
      },
      fontFamily: {
        display: ['"Raleway"', '"Inter"', 'sans-serif'],
        body: ['"Inter"', '"Raleway"', 'sans-serif'],
      },
      animation: {
        'arcane-glow': 'arcane-glow 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'pulse-cyan': 'pulse-cyan 2s ease-in-out infinite',
      },
    },
  },
}
