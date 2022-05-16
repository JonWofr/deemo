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
