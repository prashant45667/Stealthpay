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
        onyx: {
          950: '#030507',
          900: '#06090D',
          850: '#0A0E13',
          800: '#0F141B',
          750: '#141A23',
          700: '#1B232E',
          600: '#252F3D',
          500: '#384659',
          400: '#64748B',
          300: '#94A3B8',
          200: '#CBD5E1',
          100: '#F1F5F9',
        },
        charcoal: {
          950: '#030507',
          900: '#06090D',
          850: '#0A0E13',
          800: '#0F141B',
          750: '#141A23',
          700: '#1B232E',
          600: '#252F3D',
          500: '#384659',
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
        },
      },
      boxShadow: {
        'neon-emerald': '0 0 25px -2px rgba(0, 255, 157, 0.3), 0 0 8px 0px rgba(0, 255, 157, 0.15)',
        'neon-cyan': '0 0 25px -2px rgba(0, 229, 255, 0.3), 0 0 8px 0px rgba(0, 229, 255, 0.15)',
        'neon-glow': '0 0 45px -5px rgba(0, 255, 157, 0.2)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.6), inset 0 1px 0 0 rgba(255, 255, 255, 0.06)',
        'luxury-card': '0 16px 40px -10px rgba(0, 0, 0, 0.7), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)',
        'pill': '0 4px 20px -2px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'emerald-gradient': 'linear-gradient(135deg, #00FF9D 0%, #00E5FF 100%)',
        'dark-glass': 'linear-gradient(180deg, rgba(15, 20, 27, 0.85) 0%, rgba(6, 9, 13, 0.95) 100%)',
        'pedestal-gradient': 'radial-gradient(ellipse at 50% 100%, rgba(0, 255, 157, 0.12) 0%, rgba(56, 189, 248, 0.05) 45%, transparent 75%)',
        'surface-gradient': 'linear-gradient(180deg, rgba(20, 26, 35, 0.6) 0%, rgba(10, 14, 19, 0.8) 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glow 2.5s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(0, 255, 157, 0.15)' },
          '100%': { boxShadow: '0 0 35px rgba(0, 255, 157, 0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};
