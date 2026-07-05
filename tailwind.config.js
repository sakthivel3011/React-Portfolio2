/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      screens: {
        xs: '420px',
      },
      fontFamily: {
        display: ['Syne', 'system-ui', 'sans-serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: '#050505',
        coal: '#0a0a0a',
        smoke: '#111113',
        accent: {
          DEFAULT: '#C9FF3D',
          soft: 'rgba(201,255,61,0.55)',
          faint: 'rgba(201,255,61,0.12)',
        },
      },
      animation: {
        'float-slow': 'float 9s ease-in-out infinite',
        'float-mid': 'float 7s ease-in-out infinite reverse',
        'spin-slower': 'spin 28s linear infinite',
        'spin-reverse': 'spin 36s linear infinite reverse',
        'pulse-soft': 'pulseSoft 5s ease-in-out infinite',
        'grid-drift': 'gridDrift 24s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-22px) rotate(4deg)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '0.75' },
        },
        gridDrift: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '64px 64px' },
        },
      },
    },
  },
  plugins: [],
}
