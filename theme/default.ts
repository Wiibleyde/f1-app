import { createTheme } from '@shopify/restyle';

const palette = {
    background: '#000',
    primary: '#ee0000',
    secondary: '#D9D9D9',
    text: '#fff',
};

const theme = createTheme({
    colors: {
        background: palette.background,
        primary: palette.primary,
        secondary: palette.secondary,
        text: palette.text,
    },
    spacing: {
        s: 8,
        m: 16,
        l: 24,
        xl: 40,
    },
    textVariants: {
        date: {
            fontSize: 13,
            fontFamily: 'Formula1Regular',
        },
        text: {
            fontSize: 16,
            fontFamily: 'Formula1Regular',
        },
        title: {
            fontSize: 28,
            fontFamily: 'Formula1Bold',
        },
        defaults: {
            fontSize: 16,
            fontFamily: 'Formula1Regular',
        },
    },
});

export type Theme = typeof theme;
export default theme;
