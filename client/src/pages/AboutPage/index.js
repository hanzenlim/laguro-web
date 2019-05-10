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
                <title>About Laguro</title>
                <link rel="canonical" href="https://www.laguro.com/about" />
                <meta
                    name="description"
                    content="Now you can smile anytime, anywhere. Learn more about Laguro and what we do"
                />
            </Helmet>
            <AboutPageView />
            <Newsletter />
        </Flex>
    </Fragment>
);

export default AboutPage;
