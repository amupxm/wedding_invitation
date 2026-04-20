/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        script: ['"Great Vibes"', 'cursive'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        menu: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Karla', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        wedding: {
          sage: '#d8dad3',
          cream: '#f2f2ee',
          creamWarm: '#f2f1ed',
          forest: '#5e7058',
          moss: '#6b7a6e',
          mossDeep: '#6B8264',
          gold: '#b69878',
          goldWarm: '#c19a6b',
          greyGreen: '#8c9088',
          frame: '#dadbd6',
          line: '#c5c7c0',
          ink: '#2a2a28',
          wine: '#5c3d3d',
          paper: '#faf8f4',
        },
      },
      backgroundImage: {
        'paper-grain':
          'radial-gradient(ellipse 120% 80% at 50% 0%, rgba(182,152,120,0.08) 0%, transparent 50%), radial-gradient(ellipse 100% 60% at 100% 100%, rgba(94,112,88,0.06) 0%, transparent 45%)',
      },
      letterSpacing: {
        widestxl: '0.2em',
      },
    },
  },
  plugins: [],
};
