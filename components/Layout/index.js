import React from 'react';
import styled from 'styled-components';

const StyledLayout = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 100vh;
    align-items: center;

    @font-face {
        font-family: 'Silka';
        font-style: normal;
        font-weight: 300;
        src: url('/static/fonts/silka/silka-light-webfont.woff2')
                format('woff2'),
            url('/static/fonts/silka/silka-light-webfont.woff') format('woff'),
            url('/static/fonts/silka/silka-light-webfont.ttf')
                format('truetype');
    }

    @font-face {
        font-family: 'Silka';
        font-style: normal;
        font-weight: 400;
        src: url('/static/fonts/silka/silka-regular-webfont.woff2')
                format('woff2'),
            url('/static/fonts/silka/silka-regular-webfont.woff') format('woff'),
            url('/static/fonts/silka/silka-regular-webfont.ttf')
                format('truetype');
    }

    @font-face {
        font-family: 'Silka';
        font-style: normal;
        font-weight: 500;
        src: url('/static/fonts/silka/silka-medium-webfont.woff2')
                format('woff2'),
            url('/static/fonts/silka/silka-medium-webfont.woff') format('woff'),
            url('/static/fonts/silka/silka-medium-webfont.ttf')
                format('truetype');
    }

    @font-face {
        font-family: 'Silka';

        font-style: normal;
        font-weight: 700;
        src: url('/static/fonts/silka/silka-bold-webfont.woff2') format('woff2'),
            url('/static/fonts/silka/silka-bold-webfont.woff') format('woff'),
            url('/static/fonts/silka/silka-bold-webfont.ttf') format('truetype');
    }

    @font-face {
        font-family: 'IowanOldStyle';
        src: url('/static/fonts/iowan-old-style/iowan-old-style-bold.woff2')
                format('woff2'),
            url('/static/fonts/iowan-old-style/iowan-old-style-bold.woff')
                format('woff'),
            url('/static/fonts/iowan-old-style/iowan-old-style-bold.ttf')
                format('truetype');
        font-weight: 700;
        font-style: normal;
    }

    @font-face {
        font-family: 'IowanOldStyle';
        src: url('/static/fonts/iowan-old-style/iowan-old-style-bold-italic.woff2')
                format('woff2'),
            url('/static/fonts/iowan-old-style/iowan-old-style-bold-italic.woff')
                format('woff'),
            url('/static/fonts/iowan-old-style/iowan-old-style-bold-italic.ttf')
                format('truetype');
        font-weight: 700;
        font-style: italic;
    }

    @font-face {
        font-family: 'IowanOldStyle';
        src: url('/static/fonts/iowan-old-style/iowan-old-style.woff2')
                format('woff2'),
            url('/static/fonts/iowan-old-style/iowan-old-style.woff')
                format('woff'),
            url('/static/fonts/iowan-old-style/iowan-old-style.ttf')
                format('truetype');
        font-weight: normal;
        font-style: normal;
    }

    @font-face {
        font-family: 'IowanOldStyle';
        src: url('/static/fonts/iowan-old-style/iowan-old-style-italic.woff2')
                format('woff2'),
            url('/static/fonts/iowan-old-style/iowan-old-style-italic.woff')
                format('woff'),
            url('/static/fonts/iowan-old-style/iowan-old-style-italic.ttf')
                format('truetype');
        font-weight: normal;
        font-style: italic;
    }
`;

const Layout = props => {
    const { children } = props;

    return <StyledLayout>{children}</StyledLayout>;
};

export default Layout;
