import React from 'react';
import dynamic from 'next/dynamic';

const AppWithoutSSR = dynamic(
    () => import('~/routes/ProcedurePaymentRequestPage'),
    {
        ssr: false,
    }
);

export default () => <AppWithoutSSR />;
