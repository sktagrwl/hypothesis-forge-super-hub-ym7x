import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		fontFamily: {
  			serif: ['var(--font-fraunces)', 'Fraunces', 'serif'],
  			sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
  			mono: ['var(--font-jetbrains)', 'JetBrains Mono', 'monospace'],
  		},
  		colors: {
  			border: 'var(--rule)',
  			input: 'var(--input-border)',
  			ring: 'var(--accent)',
  			background: 'var(--bg)',
  			foreground: 'var(--text)',
  			primary: {
  				DEFAULT: 'var(--accent)',
  				foreground: 'var(--bg)'
  			},
  			secondary: {
  				DEFAULT: 'var(--surface)',
  				foreground: 'var(--text)'
  			},
  			destructive: {
  				DEFAULT: 'var(--loss)',
  				foreground: 'var(--text)'
  			},
  			muted: {
  				DEFAULT: 'var(--surface)',
  				foreground: 'var(--text-dim)'
  			},
  			accent: {
  				DEFAULT: 'var(--accent)',
  				foreground: 'var(--bg)'
  			},
  			popover: {
  				DEFAULT: 'var(--surface)',
  				foreground: 'var(--text)'
  			},
  			card: {
  				DEFAULT: 'var(--surface)',
  				foreground: 'var(--text)'
  			},
  			sidebar: {
  				DEFAULT: 'var(--surface)',
  				foreground: 'var(--text)',
  				primary: 'var(--accent)',
  				'primary-foreground': 'var(--bg)',
  				accent: 'var(--accent)',
  				'accent-foreground': 'var(--bg)',
  				border: 'var(--rule)',
  				ring: 'var(--accent)'
  			}
  		},
  		borderRadius: {
  			lg: '4px',
  			md: '4px',
  			sm: '2px'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
