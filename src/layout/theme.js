import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { Global } from '@emotion/react';

export const Fonts = () => (
  <Global
    styles={`
        @font-face {
            font-family: Roboto;
            src: url(/fonts/Roboto-Light.ttf);
        }
        @font-face {
            font-family: Roboto;
            src: url(/fonts/Roboto-Bold.ttf);
            font-weight: bold;
        }
    `}
  />
);

export const Theme = extendTheme({
  colors: {
    violet: {
      50: '#f7ebff',
      100: '#ddc9eb',
      200: '#c3a6d9',
      300: '#aa84c9',
      400: '#9261b8',
      500: '#78479e',
      600: '#5e377c',
      700: '#43275a',
      800: '#291738',
      900: '#100619',
    },
    black: {
      100: '#d4d1d3',
      400: '#666466',
      700: '#4a494a',
      800: '#2b2a2b',
      900: '#161B19',
    },
  },

  styles: {
    global: (props) => ({
      html: {
        height: '100%',
      },
      body: {
        height: '100%',
        margin: '0px',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        fontFamily: 'Roboto',
        fontSize: '15px',
        backgroundImage: './images/bg.png',
      },
    }),
  },
  fonts: {
    body: 'Roboto, sans-serif',
  },
});
