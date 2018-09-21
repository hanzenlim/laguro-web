export const numMaxContainerWidth = 1280;

export default {
    colors: {
        text: {
            white: '#ffffff',
            trueBlack: '#000000',
            black: '#303549',
            black50: 'rgba(0, 0, 0, 0.5)',
            gray: '#c7c7c7',
            green: '#50e3c2',
        },
        background: {
            white: '#ffffff',
            whiteSmoke: '#f1f1f1',
            gray: '#c7c7c7',
            green: '#50e3c2',
            lightGray: '#efeeee',
            transparent: 'rgba(0, 0, 0, 0)',
        },
        button: {
            green: '#50e3c2',
            gray: '#c7c7c7',
            facebookBlue: '#3B5998',
            googleBlue: '#4285F4',
            white: '#ffffff',
        },
        divider: {
            white: '#ffffff',
            gray: '#dbdbdb',
            darkGray: '#c7c7c7',
            dustyGray: '#979797',
            transparent: 'rgba(0, 0, 0, 0)',
            green: '#50e3c2',
        },
        rating: {
            yellow: '#ffbf00',
            gray: '#c7c7c7',
        },
        mapPin: {
            red: '#ff2d55',
        },
        arrow: {
            black: 'rgba(0, 0, 0, 0.7);',
            gray: '#c7c7c7',
            green: '#50e3c2',
        },
        datePicker: {
            green: '#50e3c2',
            green75: 'rgba(80, 227, 194, 0.75)',
            white: '#ffffff',
        },
        icon: {
            white: '#ffffff',
            green: '#50e3c2',
            black: '#303549',
            gray: 'rgba(182, 182, 182, 0.7)',
            darkGray: 'rgba(0, 0, 0, 0.6)',
            lightGray: '#c7c7c7',
        },
        loading: {
            green: '#50e3c2',
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
    breakpoints: ['1200px', '320px'],
    space: n => `${n}px`,
    maxContainerWidth: `${numMaxContainerWidth}px`,
    fontFamily: "'Ubuntu', sans-serif",
};
