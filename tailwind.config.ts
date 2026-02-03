import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}', './src/posts/*.md'],

	theme: {
		extend: {
			colors: {
				primary: '#0f172a',
				secondary: '#1e293b',
				accent: {
					DEFAULT: '#38bdf8',
					gradient: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)'
				}
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif']
			}
		}
	},

	plugins: [typography]
} satisfies Config;
