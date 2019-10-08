import React, { useEffect, useContext, Fragment } from 'react';
import Head from 'next/head';

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

    return (
        <Fragment>
            <Head>
                <title>Laguro</title>
            </Head>
            <DentistProfilePageView />
        </Fragment>
    );
}

export default DentistProfilePage;
