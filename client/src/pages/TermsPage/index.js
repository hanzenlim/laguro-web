import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import TermsPageView from './view';

const PrivacyPage = () => (
    <Fragment>
        <Helmet>
            <title>Terms of Service | Laguro</title>
            <meta
                name="description"
                content="Please read these Terms of Service carefully as they contain important information about your legal rights, remedies and obligations. By accessing or using the Laguro Platform, you agree to comply with and be bound by these Terms of Service."
            />
        </Helmet>
        <TermsPageView />
    </Fragment>
);

export default PrivacyPage;
