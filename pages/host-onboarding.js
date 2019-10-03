import React from 'react';
import dynamic from 'next/dynamic';

const AppWithoutSSR = dynamic(() => import('~/routes/HostOnboarding'), {
    ssr: false,
});

export default () => <AppWithoutSSR />;
