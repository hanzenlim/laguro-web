import React, { Fragment } from 'react';
import Head from 'next/head';

import HomePage from '~/routes/HomePage';

function Home(props) {
    return (
        <Fragment>
            <Head>
                <link
                    href="https://blog.laguro.com"
                    rel="preconnect"
                    crossOrigin="true"
                />
            </Head>
            <HomePage {...props} />
        </Fragment>
    );
}

export default Home;
