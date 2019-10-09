import React, { Fragment } from 'react';
import Head from 'next/head';
import _get from 'lodash/get';
import { useRouter } from 'next/router';
import validate from 'uuid-validate';

import DentistDetailsPage from '../routes/Dentist/DentistDetailsPage';
import {
    fetchDentistFromES,
    fetchDentistFromESByPermalink,
} from '../routes/Dentist/queries';
import GeneralErrorPage from '../routes/GeneralErrorPage';
import Error404Page from '../routes/Error404Page';

const DentistDetailsPageContainer = ({ dentist, ...rest }) => {
    const router = useRouter();

    if (!dentist) {
        return <Error404Page />;
    }

    if (!dentist.isVerified) {
        return <GeneralErrorPage />;
    }

    const dentistName = `Dr. ${_get(dentist, 'name')}`;
    const specialty = _get(dentist, 'specialty');
    const bio = _get(dentist, 'bio');

    return (
        <Fragment>
            <Head>
                <title>{`${dentistName} | Laguro`}</title>
                <meta
                    name="description"
                    content={`${dentistName}. ${specialty}. ${bio}`}
                />
                <link
                    rel="canonical"
                    href={`https://www.laguro.com${router.asPath}`}
                />
            </Head>
            <DentistDetailsPage dentist={dentist} id={dentist.id} {...rest} />
        </Fragment>
    );
};

DentistDetailsPageContainer.getInitialProps = async ({ req }) => {
    try {
        const id = _get(req, 'params.id', '');

        if (!id) {
            return {};
        }

        let result = {};

        if (validate(id)) {
            result = await fetchDentistFromES(id);
        } else {
            result = await fetchDentistFromESByPermalink(id);
        }

        const dentist = _get(result, '_source', {});

        return { dentist };
    } catch (error) {
        console.log(`Get dentist error: ${error.message}`);
        return null;
    }
};

export default DentistDetailsPageContainer;
