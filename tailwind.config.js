/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#edf6ff',
          100: '#dbeeff',
          200: '#bae0ff',
          300: '#81caff',
          400: '#42b0ff',
          500: '#1a91ff',
          600: '#0077ff',
          700: '#0062df',
          800: '#0052b5',
          900: '#00448f',
        },
        secondary: {
          50: '#f9f9f0',
          100: '#f5f5e0',
          200: '#efefd6',
          300: '#e5e5c6',
          400: '#ddd9aa',
          500: '#d0c98f',
          600: '#c5bc7f',
          700: '#b5a96c',
          800: '#a99d64',
          900: '#968a59',
        },
        dark: {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#666666',
          600: '#4d4d4d',
          700: '#3d3d3d',
          800: '#292929',
          900: '#121212',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
} 