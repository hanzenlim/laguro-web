import React, { Fragment } from 'react';
import Head from 'next/head';

import { Box, Text } from '~/components/';
import Terms from '~/common/Terms';

const TermsPage = () => (
    <Fragment>
        <Head>
            <title>Terms of Service | Laguro</title>
            <meta
                name="description"
                content="Please read these Terms of Service carefully as they contain important information about your legal rights, remedies and obligations. By accessing or using the Laguro Platform, you agree to comply with and be bound by these Terms of Service."
            />
        </Head>
        <Box m="40px auto" px={25} width="100%" maxWidth={900}>
            <Text fontWeight="bold" mb={20} fontSize={3}>
                Terms of Service
            </Text>
            <Terms />
        </Box>
    </Fragment>
);

export default TermsPage;
