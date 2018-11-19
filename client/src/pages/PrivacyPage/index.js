import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import PrivacyPageView from './view';

const PrivacyPage = () => (
    <Fragment>
        <Helmet>
            <title>Privacy Policy | Laguro</title>
            <meta
                name="description"
                content="Thank you for using Laguro! This Privacy Policy describes how we collect, use, process, and disclose your information, including personal information, in conjunction with your access to and use of Laguro."
            />
        </Helmet>
        <PrivacyPageView />
    </Fragment>
);

export default PrivacyPage;
