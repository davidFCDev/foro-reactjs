/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#051535',
				secondary: '#EF4444',
				tertiary: '#0b1e46',
				glow: '#D692D7',
				glow2: '#0a1c37',
			},
			fontFamily: {
				sans: ['Poppins', 'sans-serif'],
				comic: ['Comic Neue', 'cursive'],
				warp: ['Tilt Warp', 'cursive'],
			},
		},
	},
	plugins: [],
};
