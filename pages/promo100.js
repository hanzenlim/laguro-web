import React, { Fragment, Component } from 'react';
import Head from 'next/head';
import LoginPage from '~/routes/LoginPage';

const Promo100 = () => {
    return (
        <Fragment>
            <Head>
                <title>Sign up to Laguro</title>
                <meta name="description" content="Signup to laguro" />
                <link rel="canonical" href="https://www.laguro.com/promo100" />
            </Head>
            <LoginPage />
        </Fragment>
    );
};

export default Promo100;
