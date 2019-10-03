import React, { useEffect, useContext } from 'react';

import DentistProfilePageView from './view';

import { AppContext } from '../../appContext';

function DentistProfilePage() {
    const { isAuth, mounted } = useContext(AppContext);

    useEffect(() => {
        const redirectToHome = () => {
            if (!isAuth) {
                window.location.href = '/';
            }
        };

        redirectToHome();
    }, [isAuth]);

    if (!mounted) return null;

    return <DentistProfilePageView />;
}

export default DentistProfilePage;
