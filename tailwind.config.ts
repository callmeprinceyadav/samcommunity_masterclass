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
        primary: '#7B2FF7',
        secondary: '#00D4FF',
        dark: '#0a0a0f',
        darkSecondary: '#1a1a2e',
        darkTertiary: '#2a2a3e',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 30px rgba(123, 47, 247, 0.5)',
        'glow-cyan': '0 0 30px rgba(0, 212, 255, 0.5)',
      },
    },
  },
  plugins: [],
}
export default config


