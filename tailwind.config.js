/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: '#05080A',
          900: '#080C0E',
          850: '#0B1115',
          800: '#0F181D',
          750: '#142128',
          700: '#1A2A33',
          600: '#253C47',
          500: '#3A5766',
        },
        emerald: {
          neon: '#00FF9D',
          glow: '#05DF85',
          muted: '#00B36B',
          dark: '#073B2B',
          deep: '#032017',
        },
        cyan: {
          neon: '#00E5FF',
          glow: '#38BDF8',
          dark: '#033544',
        },
        amber: {
          neon: '#FFB800',
          glow: '#F59E0B',
          dark: '#3D2800',
        },
        rose: {
          neon: '#FF3366',
          glow: '#F43F5E',
          dark: '#400814',
        }
      },
      boxShadow: {
        'neon-emerald': '0 0 20px -2px rgba(0, 255, 157, 0.35), 0 0 8px 0px rgba(0, 255, 157, 0.2)',
        'neon-cyan': '0 0 20px -2px rgba(0, 229, 255, 0.35), 0 0 8px 0px rgba(0, 229, 255, 0.2)',
        'neon-glow': '0 0 35px -5px rgba(0, 255, 157, 0.25)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'emerald-gradient': 'linear-gradient(135deg, #00FF9D 0%, #00E5FF 100%)',
        'dark-glass': 'linear-gradient(180deg, rgba(15, 24, 29, 0.8) 0%, rgba(8, 12, 14, 0.95) 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glow 2s ease-in-out infinite alternate',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 10px rgba(0, 255, 157, 0.2)' },
          '100%': { boxShadow: '0 0 25px rgba(0, 255, 157, 0.5)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        }
      }
    },
  },
  plugins: [],
};
