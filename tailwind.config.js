module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primaryText: '#FFFFFF',
        muted: '#636382',
      },
      textColor: {
        primary: '#FFFFFF',
        secondary: '#D4D4DE',
      },
      backgroundColor: {
        primary: '#1A1A22',
        secondary: '#353545',
      },
      fontFamily: {
        primary: 'Nunito',
        mono: 'SourceCodePro',
      },
      gradientColorStops: {
        accentFrom: '#FF832B',
        accentTo: '#FFC02B',
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
        dash: 'dash 1.5s ease-in-out infinite',
        color: 'color 1.5s ease-in-out infinite',
      },
      keyframes: {
        dash: {
          '0%': {
            'stroke-dasharray': '1, 150',
            'stroke-dashoffset': '0',
          },
          '50%': {
            'stroke-dasharray': '90, 150',
            'stroke-dashoffset': '-35',
          },
          '100%': {
            'stroke-dasharray': '90, 150',
            'stroke-dashoffset': '-124',
          },
        },
        color: {
          '0%': {
            stroke: '#FF832B',
          },
          '100%': {
            stroke: '#FFC02B',
          },
        },
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
  },
};
