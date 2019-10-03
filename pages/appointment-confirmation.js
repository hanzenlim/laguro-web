import React from 'react';
import dynamic from 'next/dynamic';

const AppWithoutSSR = dynamic(
    () => import('~/routes/AppointmentConfirmationPage'),
    {
        ssr: false,
    }
);

export default () => <AppWithoutSSR />;
