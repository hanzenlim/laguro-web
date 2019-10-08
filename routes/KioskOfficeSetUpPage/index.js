import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import cookies from 'browser-cookies';
import Head from 'next/head';

import { Flex, Input, Box, Text } from '~/components/index';
import { KIOSK_OFFICE_ID_COOKIE_VARIABLE_NAME } from '~/routes/KioskPage';
import { redirect } from '~/util/history';
import { KIOSK_REG_PAGE_URL } from '~/util/urls';

const StyledForm = styled.form`
    display: grid;
    grid-template-columns: auto auto;
    grid-column-gap: 10px;
`;
class KioskOfficeSetUpPage extends Component {
    render() {
        return (
            <Fragment>
                <Head>
                    <title>Laguro</title>
                </Head>
                <Box mx={300} p={50}>
                    <Text textAlign="left" mb={20}>
                        The officeId you provided in the cookie does not exist
                        in the backend. Add new officeId and start over.
                    </Text>
                    <Flex>
                        <StyledForm
                            onSubmit={() => {
                                cookies.erase(
                                    KIOSK_OFFICE_ID_COOKIE_VARIABLE_NAME
                                );
                                cookies.set(
                                    KIOSK_OFFICE_ID_COOKIE_VARIABLE_NAME,
                                    document.getElementById('kiosk-office-id')
                                        .value,
                                    { expires: 0 }
                                );

                                localStorage.setItem(
                                    KIOSK_OFFICE_ID_COOKIE_VARIABLE_NAME,
                                    document.getElementById('kiosk-office-id')
                                        .value
                                );

                                redirect({ url: KIOSK_REG_PAGE_URL });
                            }}
                        >
                            <Text> officeId </Text>
                            <Box />
                            <Input id="kiosk-office-id" />
                            <button height={32} type="submit">
                                Submit
                            </button>
                        </StyledForm>
                    </Flex>
                </Box>
            </Fragment>
        );
    }
}
export default KioskOfficeSetUpPage;
