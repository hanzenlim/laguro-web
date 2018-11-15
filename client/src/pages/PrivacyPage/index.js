import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import PrivacyPageView from './view';

const PrivacyPage = () => (
    <Fragment>
        <Helmet>
            <title>Privacy Policy | Laguro</title>
        </Helmet>
        <PrivacyPageView />
    </Fragment>
);

export default PrivacyPage;
