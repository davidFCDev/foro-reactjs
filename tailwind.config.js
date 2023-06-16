/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#051535',
				secondary: '#EF4444',
				tertiary: '#432261',
				glow: '#835EA7',
				glow2: '#381A54',
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
