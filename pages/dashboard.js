import React, { Fragment } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const DashboardPage = dynamic(() => import('../routes/Dashboard'), {
    ssr: false,
});

const Dashboard = () => (
    <Fragment>
        <Head>
            <script src="https://cdn.dwolla.com/1/dwolla.js" />
        </Head>
        <DashboardPage />
    </Fragment>
);

export default Dashboard;
