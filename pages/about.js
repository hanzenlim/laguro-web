import React, { Fragment } from 'react';
import styled from 'styled-components';
import Head from 'next/head';

import { Box, Container, Flex, Text } from '~/components';
import {
    BecomeADentistLink,
    BecomeAHostLink,
    GenericLink,
} from '~/common/Links';
import { DENTIST_SEARCH_PAGE_URL } from '../util/urls';

const StyledBox = styled(Box)`
    overflow: hidden;
`;

const StyledBanner = styled(Box)`
    &::before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.64);
    }
`;

const AboutPage = () => (
    <Fragment>
        <Flex
            flexDirection="column"
            justifyContent="space-between"
            minHeight="100vh"
        >
            <Head>
                <title>About Laguro</title>
                <link rel="canonical" href="https://www.laguro.com/about" />
                <meta
                    name="description"
                    content="Now you can smile anytime, anywhere. Learn more about Laguro and what we do"
                />
            </Head>
            <Box>
                <StyledBanner
                    position="relative"
                    height={[186, '', 586]}
                    background="url(/static/images/about-page-banner.jpeg)"
                    backgroundRepeat="no-repeat"
                    backgroundPosition="center"
                    backgroundSize={['600px', '', 'cover']}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Flex
                        alignItems="center"
                        justifyContent="center"
                        height="100%"
                        position="relative"
                        zIndex={1}
                    >
                        <Text
                            color="text.white"
                            fontWeight="bold"
                            fontSize={[20, '', 50]}
                            textAlign="center"
                        >
                            Now you can smile anytime, anywhere
                        </Text>
                    </Flex>
                </StyledBanner>
                <StyledBox>
                    <Container>
                        <Box pt={[45, '', 120]} maxWidth={1044} mx="auto">
                            <Box mb={[45, '', 120]}>
                                <Text
                                    mb={[30, '', 70]}
                                    fontSize={[1, '', 4]}
                                    lineHeight="30px"
                                >
                                    Laguro was created to simplify how you
                                    search for and make an appointment with the
                                    dentist that is right for you. As a Laguro
                                    patient, we want to give you ownership and
                                    peace of mind by providing you with upfront
                                    and clear price transparency, flexible
                                    scheduling options, completely personalized
                                    appointments, and the ownership of your
                                    dental records.
                                </Text>
                            </Box>

                            <Box
                                textAlign={['left', '', 'center']}
                                mb={[80, '', 200]}
                                position="relative"
                            >
                                <Box position="relative" zIndex={1}>
                                    <Text
                                        fontSize={[18, '', 23]}
                                        fontWeight={['medium', '', 'regular']}
                                        mb={[26, '', 36]}
                                    >
                                        We make it simple to find and connect
                                        with the right dentist for you anytime,
                                        anywhere.
                                    </Text>
                                    <Flex
                                        mx="auto"
                                        width={854}
                                        justifyContent="space-between"
                                        flexDirection={['column', '', 'row']}
                                    >
                                        <Box
                                            width="33.33%"
                                            px={[0, '', 10]}
                                            mb={[6, '', 0]}
                                        >
                                            {BecomeADentistLink}
                                        </Box>
                                        <Box
                                            width="33.33%"
                                            px={[0, '', 10]}
                                            mb={[6, '', 0]}
                                        >
                                            {BecomeAHostLink}
                                        </Box>

                                        <Box
                                            width="33.33%"
                                            px={[0, '', 10]}
                                            mb={[6, '', 0]}
                                        >
                                            <GenericLink
                                                text="Schedule an appointment"
                                                url={DENTIST_SEARCH_PAGE_URL}
                                            />
                                        </Box>
                                    </Flex>
                                </Box>
                            </Box>
                        </Box>
                    </Container>
                </StyledBox>
            </Box>
        </Flex>
    </Fragment>
);

export default AboutPage;
