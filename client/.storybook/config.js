import React, { Fragment } from 'react';
import { configure, addDecorator } from '@storybook/react';
import { injectGlobal, ThemeProvider } from 'styled-components';
import theme from '../src/components/theme';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import 'antd/dist/antd.css';

injectGlobal([], {
    '*': {
        boxSizing: 'border-box',
    },
    body: {
        fontFamily: 'Ubuntu',
    },
    // TODO: Add focus visible from https://nelo.is/writing/styling-better-focus-states/
    '*:focus': {
        outline: 'none',
    },
    '[role="button"]': {
        cursor: 'pointer',
    },
});

addDecorator(story => (
    <ThemeProvider theme={theme}>
        <Fragment>{story()}</Fragment>
    </ThemeProvider>
));

const req = require.context('.', true, /\.js$/);

const load = () => {
    req.keys().forEach(req);
};

configure(load, module);
