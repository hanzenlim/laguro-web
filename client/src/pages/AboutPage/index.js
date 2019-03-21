import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import AboutPageView from './view';
import Newsletter from '../common/Newsletter';

const AboutPage = () => (
    <Fragment>
        <Helmet>
            <title>About Us | Laguro</title>
            <meta
                name="description"
                content="Our Mission: To create efficiency and transparency in the provision of dental care to patients, one office at a time."
            />
        </Helmet>
        <AboutPageView />
        <Newsletter />
    </Fragment>
);

export default AboutPage;
