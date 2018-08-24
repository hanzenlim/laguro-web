export default {
    colors: {
        text: {
            white: '#ffffff',
            black: '#303549',
            gray: '#c7c7c7',
        },
        background: {
            white: '#ffffff',
            gray: '#c7c7c7',
            lightGray: '#efeeee',
        },
        button: {
            green: '#50e3c2',
            gray: '#c7c7c7',
        },
        divider: {
            white: '#ffffff',
            gray: '#dbdbdb',
            darkGray: '#c7c7c7',
        },
        rating: {
            yellow: '#ffbf00',
            gray: '#c7c7c7',
        },
        mapPin: {
            red: '#ff2d55',
        },
        arrow: {
            gray: '#c7c7c7',
            green: '#50e3c2',
        },
        datePicker: {
            green: '#50e3c2',
            white: '#ffffff',
        },
        icon: {
            black: '#303549',
        },
    },
    fontSizes: ['12px', '14px', '18px', '20px', '30px', '45px', '55px'],
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
    breakpoints: ['1200px', '320px'],
    space: n => `${n}px`,
    maxContainerWidth: '1280px',
};
