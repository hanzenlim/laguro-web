import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import AboutPageView from './view';

const AboutPage = () => (
    <Fragment>
        <Helmet>
            <title>About Us | Laguro</title>
        </Helmet>
        <AboutPageView />
    </Fragment>
);

export default AboutPage;
