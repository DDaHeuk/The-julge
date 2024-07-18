import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      md: '744px',
      // => @media (min-width: 744px) 태블릿
      lg: '1440px',
      // => @media (min-width: 1440px) PC
    },
    colors: {
      primary: '#EA3C12',
      black: '#111322',
      gray50: '#7D7986',
      gray40: '#A4A1AA',
      gray30: '#CBC9CF',
      gray20: '#E5E4E7',
      gray10: '#F2F2F3',
      gray5: '#FAFAFA',
      white: '#FFFFFF',
      red40: '#FF4040',
      red30: '#FF8D72',
      red20: '#FFAF9B',
      red10: '#FFEBE7',
      blue20: '#0080FF',
      blue10: '#CCE6FF',
      green20: '#20A81E',
      green10: '#D4F7D4',
      violet: '#5534DA',
      kakao: '#FEE500',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
