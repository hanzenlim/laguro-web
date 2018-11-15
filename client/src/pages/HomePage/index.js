import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import HomePageView from './view';

const HomePage = () => (
    <Fragment>
        <Helmet>
            <title>Smile Anywhere | Laguro</title>
            <link rel="canonical" href="https://www.laguro.com" />
        </Helmet>
        <HomePageView />
    </Fragment>
);

export default HomePage;
