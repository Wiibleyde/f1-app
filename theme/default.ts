import { createTheme } from "@shopify/restyle"

const palette = {
    background: '#000',
    primary: '#ee0000',
    secondary: '#D9D9D9',
    text: '#fff',
}


const theme = createTheme({
    colors: {
        background: palette.background,
        primary: palette.primary,
        secondary: palette.secondary,
        text: palette.text,
    },
    spacing: {},
    textVariants: {
        text: {
            fontSize: 16,
            fontWeight: 'bold',
        },
        title: {
            fontSize: 32,
            fontWeight: 'bold',
        },
        defaults: {
            fontSize: 16,
            fontWeight: 'normal',
        },
    },
})

export type Theme = typeof theme
export default theme