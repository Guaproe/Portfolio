import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0f',
        'accent-primary': '#7c3aed',
        'accent-light': '#a78bfa',
        'accent-secondary': '#06b6d4',
        'text-primary': '#ffffff',
        'text-muted': '#94a3b8',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(135deg, #7c3aed, #a78bfa)',
      },
    },
  },
  plugins: [],
}

export default config
