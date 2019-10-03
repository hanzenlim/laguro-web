import React from 'react';
import dynamic from 'next/dynamic';

const AppWithoutSSR = dynamic(
    () => import('~/routes/KioskDentistProfilePage'),
    {
        ssr: false,
    }
);

export default () => <AppWithoutSSR />;
