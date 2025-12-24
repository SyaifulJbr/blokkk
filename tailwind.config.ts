import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#16a34a'
      },
      boxShadow: {
        neon: '0 0 15px rgba(34, 197, 94, 0.5)'
      }
    }
  },
  plugins: []
}

export default config
