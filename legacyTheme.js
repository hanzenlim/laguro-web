export const breakPointsInPixels = ['600'];

export default {
    // TODO: Update to use generic color names
    colors: {
        black: '#000',
        white: '#fff',
        abbey: '#484e51',
        silver: '#c8c7c7',
        link_blue: '#039be5',
        appointment_green: '#28a51c',
        'carribean-green': '#0ad5B1',
        red: '#ff0000',
        darkGrey: '#484e51',
        lightGrey: '#9e9e9e',
    },
    fontSizes: [10, 12, 14, 16, 18, 32],
    fontWeights: {
        light: 300,
        regular: 400,
        medium: 500,
        bold: 700,
    },
    zIndex: {
        modal: 900,
        overlay: 800,
        dropdown: 700,
        header: 600,
        footer: 500,
    },
    space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
    breakpoints: breakPointsInPixels.map(
        breakpoint => `${breakpoint.toString()}px`
    ),
    maxContainerWidth: '960px',
};
