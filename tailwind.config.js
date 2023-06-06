module.exports = {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        avenir: ['Avenir', 'sans-serif'],
        avenirblack: ['Avenir Black', 'sans-serif'],
        agency: ['AgencyFB Regular', 'sans-serif'],
        agencybold: ['AgencyFB Bold', 'sans-serif'],
        agencywide: ['AgencyFB BlackWide', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        robotomedium: ['Roboto Medium', 'sans-serif'],
        druk: ['Druk Wide Medium Regular', 'sans-serif'],
        madela: ['Madela', 'sans-serif']
      },
      colors:{
        white: '#FFF',
        black: '#000',
        red: '#c8102e',
        green: '#008000',
        blue: '#1d428a',
        orange: '#ffa500',
        grey: '#444444'
      },
      fontSize: {
        xxs: '10px',
        xs: '12px',
        ssm:'13px',
        sm: '14px',
        basesm: '15px',
        base: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '28px',
        '4xl': '32px',
        '5xl': '38px',
        '6xl': '44px',
        '7xl': '48px',
        '8xl': '58px',
        '9xl': '68px',
        '10xl': '78px'
      },
      lineHeight: {        
        xxs: '11px',
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '28px',
        '4xl': '32px',
        '5xl': '38px',
        '6xl': '44px',
        '7xl': '48px',
        '8xl': '58px',
        '9xl': '68px',
        '10xl': '78px'
      },
      height: {
        '300': '300px',        
        '500': '500px',  
        '50': '50vh'    
      },

      container: {
        center: true,
        padding: {
          DEFAULT: '15px',
          sm: '15px',
          lg: '15px',
          xl: '10px'
        },
        screens: {
          sm: '600px',
          md: '767px',
          lg: '992px',
          xl: '1200px',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    
  ],
}

