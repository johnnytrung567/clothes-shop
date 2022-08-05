/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                roboto: ['roboto', 'san-serif'],
            },
            fontSize: {
                13: '13px',
            },
            colors: {
                'brown-300': '#c89979',
                'brown-400': '#b98a6a',
                'brown-600': '#d26e4b',
                'gray-500': '#666',
                'gray-700': '#353535',
            },
            boxShadow: {
                sm: '0 0 5px #ccc',
            },
        },
    },
    plugins: [],
}
