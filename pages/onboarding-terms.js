import React from 'react';
import dynamic from 'next/dynamic';

const AppWithoutSSR = dynamic(() => import('~/routes/Onboarding/Terms'), {
    ssr: false,
});

export default () => <AppWithoutSSR />;
