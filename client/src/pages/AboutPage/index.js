import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import AboutPageView from './view';
import Newsletter from '../common/Newsletter';
import { Flex } from '../../components';

const AboutPage = () => (
    <Fragment>
        <Flex
            flexDirection="column"
            justifyContent="space-between"
            minHeight="100vh"
        >
            <Helmet>
                <title>About Us | Laguro</title>
                <meta
                    name="description"
                    content="Our Mission: To create efficiency and transparency in the provision of dental care to patients, one office at a time."
                />
            </Helmet>
            <AboutPageView />
            <Newsletter />
        </Flex>
    </Fragment>
);

export default AboutPage;
