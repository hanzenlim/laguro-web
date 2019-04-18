import React, { Fragment } from 'react';
import { configure, addDecorator } from '@storybook/react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import theme from '../src/components/theme';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import 'antd/dist/antd.css';
import '../src/Silka.css';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box,
    }
    body {
        font-family: "'Silka', sans-serif";
    }
    *:focus {
        outline: none;
    }

    [role="button"] {
        cursor: pointer;
    }
`;

addDecorator(story => (
    <ThemeProvider theme={theme}>
        <Fragment>
            {story()}
            <GlobalStyle />
        </Fragment>
    </ThemeProvider>
));

const req = require.context('.', true, /\.js$/);

const load = () => {
    req.keys().forEach(req);
};

configure(load, module);
