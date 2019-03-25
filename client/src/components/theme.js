export const containerPaddings = 50;
export const contentWidthInPixels = 1280;
export const numMaxContainerWidth = contentWidthInPixels + containerPaddings;
export const breakpointsInPixels = [768, 1025, 1200];
export const APPLE_SD_GOTHIC_NEO = 'AppleSDGothicNeo-Regular';
export const PLACE_HOLDER_OPACITY = 0.65;
export const MOBILE_SCREEN_WIDTH_IN_PIXELS = 375;

export default {
    colors: {
        text: {
            white: '#ffffff',
            trueBlack: '#000000',
            black: '#303549',
            black50: 'rgba(0, 0, 0, 0.5)',
            gray: '#c7c7c7',
            lightGray: '#9b9b9b',
            darkGray: '#4a4a4a',
            blue: '#3481F8',
            darkBlue: '#286ABA',
            yellow: '#FFCE70',
            red: '#ff2d55',
            green: '#417505',
        },
        background: {
            white: '#ffffff',
            whiteSmoke: '#f1f1f1',
            gray: '#c7c7c7',
            blue: '#3481F8',
            lightGray: '#efeeee',
            transparent: 'rgba(0, 0, 0, 0)',
            yellow: '#FFCE70',
            orange: '#FF9554',
            darkBlue: '#286ABA',
            aquaBlue: '#f7f8fc',
            lightBlue: 'rgba(175, 211, 253, 0.23)',
            navyBlue: '#091426',
        },
        button: {
            blue: '#3481F8',
            gray: '#c7c7c7',
            facebookBlue: '#3B5998',
            googleBlue: '#4285F4',
            white: '#ffffff',
            ghost: 'rgba(255, 255, 255, 0.7)',
        },
        divider: {
            white: '#ffffff',
            gray: '#dbdbdb',
            darkGray: '#c7c7c7',
            dustyGray: '#979797',
            transparent: 'rgba(0, 0, 0, 0)',
            blue: '#3481F8',
        },
        rating: {
            yellow: '#FFCE70',
            gray: '#c7c7c7',
        },
        mapPin: {
            red: '#ff2d55',
        },
        arrow: {
            black: 'rgba(0, 0, 0, 0.7);',
            gray: '#c7c7c7',
            blue: '#3481F8',
        },
        datePicker: {
            blue: '#3481F8',
            white: '#ffffff',
        },
        icon: {
            white: '#ffffff',
            blue: '#3481F8',
            black: '#303549',
            gray: 'rgba(182, 182, 182, 0.7)',
            darkGray: 'rgba(0, 0, 0, 0.6)',
            lightGray: '#c7c7c7',
        },
        loading: {
            blue: '#3481F8',
        },
    },
    fontSizes: ['12px', '14px', '16px', '18px', '20px', '30px', '45px', '55px'],
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
        inputElement: 200,
    },
    shadows: [
        '1px 1px 7px 0 rgba(0, 0, 0, 0.15)',
        '0 1px 4px 0 rgba(0, 0, 0, 0.3)',
    ],
    breakpoints: breakpointsInPixels.map(bp => `${bp}px`),
    space: n => `${n}px`,
    maxContainerWidth: `${numMaxContainerWidth}px`,
    fontFamily: "'Silka', sans-serif",
};
