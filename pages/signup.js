import React, { Fragment, Component } from 'react';
import Head from 'next/head';
import LoginPage from '~/routes/LoginPage';

const Signup = () => {
    return (
        <Fragment>
            <Head>
                <title>Log in to Laguro</title>
                <meta
                    name="description"
                    content="Log in to access your Laguro account."
                />
                <link rel="canonical" href="https://www.laguro.com/login" />
            </Head>
            <LoginPage mode="getName" />
        </Fragment>
    );
};

export default Signup;
