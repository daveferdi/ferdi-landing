import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0E1B2C',
        'navy-light': '#1D3147',
        teal: '#A9C7DB',
        'teal-light': '#8FCBD0',
        support: '#6D8EAE',
        blush: '#E7D8E0',
        'bg-light': '#F5F8FB',
        surface: '#EDF3F7',
        'text-dark': '#1D3147',
        ink: '#0E1B2C',
        border: '#D8E3EA',
        hero: {
          bg: '#F5F8FB',
          card: 'rgba(237,243,247,0.88)',
          ink: '#0E1B2C',
          muted: '#5A7287',
          line: 'rgba(29,49,71,0.14)',
          accent: '#A9C7DB',
          shadow: 'rgba(14,27,44,0.08)',
          radius: '32px',
        },
      },
      fontFamily: {
        sora: ['Sora', 'Heebo', 'sans-serif'],
        inter: ['Inter', 'Heebo', 'sans-serif'],
        heebo: ['Heebo', 'sans-serif'],
      },
      borderRadius: {
        hero: '32px',
        'hero-panel': '34px',
      },
      boxShadow: {
        hero: '0 24px 60px rgba(8,26,43,0.12)',
      },
      animation: {
        driftSlow: 'driftSlow 64s ease-in-out infinite',
        'driftSlow-reverse': 'driftSlow 76s ease-in-out infinite reverse',
        fadeUpStagger: 'fadeUpStagger 700ms cubic-bezier(0.22, 1, 0.36, 1) both',
        shine: 'shine 1150ms ease-out both',
      },
      keyframes: {
        driftSlow: {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(1.6%, -1.2%, 0) scale(1.02)' },
        },
        fadeUpStagger: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shine: {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(210%)' },
        },
      },
    },
  },
  plugins: [],
}

export default config

