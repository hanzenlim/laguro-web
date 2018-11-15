import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import TermsPageView from './view';

const PrivacyPage = () => (
    <Fragment>
        <Helmet>
            <title>Terms of Service | Laguro</title>
        </Helmet>
        <TermsPageView />
    </Fragment>
);

export default PrivacyPage;
