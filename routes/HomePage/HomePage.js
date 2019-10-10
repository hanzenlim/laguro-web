/* eslint-disable react/no-danger */
import React, { useEffect, Fragment } from 'react';
import { message } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Box } from '~/components';
import HowItWorks from './HowItWorks';
import BannerContent from './BannerContent';
import BottomCallToAction from './BottomCallToAction';
import AboutSection from './AboutSection';
import BlogEntries from './BlogEntries';
import TopCallToAction from './TopCallToAction';
import FeatureTabs from './FeatureTabs';

// Main Component
const HomePageView = () => {
    const router = useRouter();
    const { reason } = router.query;

    useEffect(() => {
        if (reason && reason === 'token-expiry') {
            message.error('Please login again', 5, () => {
                router.push('/');
            });
        }
    }, [reason, router]);

    return (
        <Box style={{ overflow: 'hidden' }}>
            <BannerContent />
            <TopCallToAction />
            <HowItWorks />
            <FeatureTabs />
            <BlogEntries />
            <AboutSection />
            <BottomCallToAction />
        </Box>
    );
};

// Head Wrapper
const HomePageContainer = () => (
    <Fragment>
        <Head>
            <title>Laguro</title>
            <link rel="canonical" href="https://www.laguro.com/" />
            <meta
                name="description"
                content="Laguro is a dental care platform matching patients with the right dentist anytime, anywhere"
            />
            <script type="application/ld+json">
                {JSON.stringify({
                    '@context': 'http://schema.org',
                    '@type': 'WebSite',
                    url: 'https://www.laguro.com/',
                    potentialAction: {
                        '@type': 'SearchAction',
                        target:
                            'https://www.laguro.com/dentist/search?text={searchbox_target}',
                        'query-input': 'required name=searchbox_target',
                    },
                })}
            </script>
        </Head>
        <HomePageView />
    </Fragment>
);

export default HomePageContainer;
