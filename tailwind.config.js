/** @type {import('tailwindcss').Config} */
module.exports = {
    theme: {
        extend: {
            colors: {
                'global': '#1e293b',
                'invitedex': '#e11d48',
                'invitedex-dark': 'rgb(225 29 72 / 0.3)',
                'biper': '#38bdf8',
                'biper-dark': '#0ea5e9',
                'borders': '#1e293b',
                'red': '#ef4444',
                'orange': '#eab308',
                'green': '#22c55e',
                'blue': '#0ea5e9',
                'separation': '#7f1d1d',
                'screen-container': '#cbd5e1',
                'screen': '#1f293731'
            },
            fontFamily: {
                pkmn: ['PKMN_RBYGSC']
            },
            fontSize: {
                xss: '.575rem'
            },
            width: {
                'sprite': '56px'
            },
            height: {
                'sprite': '56px'
            }
        },
    },
    plugins: [],
    content: [],
}
