/* eslint-disable react/no-danger */
import React, { useEffect, Fragment } from 'react';
import { compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import qs from 'query-string';
import { message } from 'antd';
import { Helmet } from 'react-helmet';

import { Responsive, Box } from '../../components';
import history from '../../history';
import HowItWorks from './HowItWorks';
import Newsletter from '../common/Newsletter';
import ResponsivePropTypes from '../../types/responsive';
import BannerContent from './BannerContent';
import BottomCallToAction from './BottomCallToAction';
import AboutSection from './AboutSection';
import BlogEntries from './BlogEntries';
import TopCallToAction from './TopCallToAction';
import FeatureTabs from './FeatureTabs';

const { withScreenSizes } = Responsive;

// Main Component
const HomePageView = ({ location }) => {
    useEffect(() => {
        const params = qs.parse(history.location.search);

        if (params && params.reason && params.reason === 'token-expiry') {
            message.error('Please login again', 5, () => {
                history.push('/');
            });
        }
    }, [location]);

    return (
        <Box style={{ overflow: 'hidden' }}>
            <BannerContent />
            <TopCallToAction />
            <HowItWorks />
            <FeatureTabs />
            <BlogEntries />
            <AboutSection />
            <BottomCallToAction />
            <Newsletter />
        </Box>
    );
};

const EnhancedHomePageView = compose(
    withScreenSizes,
    withRouter
)(HomePageView);

// Helmet Wrapper
const HomePageContainer = () => (
    <Fragment>
        <Helmet title="Laguro">
            <link rel="canonical" href="https://www.laguro.com/" />
            <meta
                name="description"
                content="Laguro is a dental care platform matching patients with the right dentist anytime, anywhere"
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'http://schema.org',
                        '@type': 'WebSite',
                        url: 'https://www.laguro.com/',
                        potentialAction: {
                            '@type': 'SearchAction',
                            target:
                                'https://www.laguro.com/dentist/search?text={query}',
                            query: 'Dentist',
                        },
                    }),
                }}
            />
        </Helmet>
        <EnhancedHomePageView />
    </Fragment>
);

HomePageView.propTypes = {
    ...ResponsivePropTypes,
};

export default HomePageContainer;
