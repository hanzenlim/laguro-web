import React from 'react';
import _get from 'lodash/get';

import {
    Text,
    Box,
    Flex,
    Link,
    Icon,
    Container,
    Grid,
} from '../../../components';

import {
    DENTIST_ONBOARDING_PROFILE_URL,
    DENTIST_SEARCH_PAGE_URL,
    OFFICE_SEARCH_PAGE_URL,
    HOST_ONBOARDING_PAGE_URL_PREFIX,
    ABOUT_PAGE_URL,
} from '../../../util/urls';

const PATIENT_LINKS_MAP = [
    { label: 'Find a dentist', url: DENTIST_SEARCH_PAGE_URL },
    { label: 'Check our locations', url: OFFICE_SEARCH_PAGE_URL },
];

const DENTIST_LINKS_MAP = [
    { label: 'Become a dentist', url: DENTIST_ONBOARDING_PROFILE_URL },
    { label: 'Book a chair', url: OFFICE_SEARCH_PAGE_URL },
];

const HOST_LINKS_MAP = [
    {
        label: 'Become a host',
        url: `${HOST_ONBOARDING_PAGE_URL_PREFIX}/add-office`,
    },
];

const LAGURO_LINKS_MAP = [
    { label: 'About us', url: ABOUT_PAGE_URL },
    { label: 'Blog', url: 'https://medium.com/@laguro', isExternal: true },
    { label: 'How it works', url: '/' },
    { label: 'Our features', url: '/' },
];

const SOCIAL_LINKS_MAP = [
    { label: 'Facebook', url: 'https://www.facebook.com/LaguroDental/' },
    {
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/company/lagurodental/',
    },
    { label: 'Instagram', url: 'https://www.instagram.com/lagurodental/' },
    { label: 'Medium', url: 'https://medium.com/@laguro' },
];

const Footer = () => {
    const pathname = _get(window, 'location.pathname');
    const shouldShowFooter =
        !pathname.startsWith('/host-onboarding') &&
        !pathname.includes('search');
    if (!shouldShowFooter) return null;

    return (
        <Flex
            is="footer"
            width="100%"
            bg="background.navyBlue"
            flex="0 0 auto"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
        >
            <Container>
                <Grid
                    mt={['52px', '', '66px']}
                    gridTemplateColumns={[
                        'repeat(2, 1fr)',
                        '',
                        'repeat(5, 1fr)',
                    ]}
                >
                    <Box mb="30px">
                        <Text
                            fontWeight="500"
                            color="text.white"
                            fontSize={[0, '', 1]}
                            mb="5px"
                        >
                            Patients
                        </Text>
                        {PATIENT_LINKS_MAP.map(link => {
                            return (
                                <Box key={link.label}>
                                    <Link to={link.url}>
                                        <Text
                                            fontWeight="300"
                                            color="text.white"
                                            fontSize={[0, '', 1]}
                                        >
                                            {link.label}
                                        </Text>
                                    </Link>
                                </Box>
                            );
                        })}
                    </Box>

                    <Box mb="30px">
                        <Text
                            fontWeight="500"
                            color="text.white"
                            fontSize={[0, '', 1]}
                            mb="5px"
                        >
                            Dentists
                        </Text>
                        {DENTIST_LINKS_MAP.map(link => {
                            return (
                                <Box key={link.label}>
                                    <Link to={link.url}>
                                        <Text
                                            fontWeight="300"
                                            color="text.white"
                                            fontSize={[0, '', 1]}
                                        >
                                            {link.label}
                                        </Text>
                                    </Link>
                                </Box>
                            );
                        })}
                    </Box>

                    <Box mb="30px">
                        <Text
                            fontWeight="500"
                            color="text.white"
                            fontSize={[0, '', 1]}
                            mb="5px"
                        >
                            Hosts
                        </Text>
                        {HOST_LINKS_MAP.map(link => {
                            return (
                                <Box key={link.label}>
                                    <Link to={link.url}>
                                        <Text
                                            fontWeight="300"
                                            color="text.white"
                                            fontSize={[0, '', 1]}
                                        >
                                            {link.label}
                                        </Text>
                                    </Link>
                                </Box>
                            );
                        })}
                    </Box>

                    <Box mb="30px">
                        <Text
                            fontWeight="500"
                            color="text.white"
                            fontSize={[0, '', 1]}
                            mb="5px"
                        >
                            Laguro
                        </Text>
                        {LAGURO_LINKS_MAP.map(link => {
                            return (
                                <Box key={link.label}>
                                    <Link
                                        to={link.url}
                                        isExternal={link.isExternal}
                                    >
                                        <Text
                                            fontWeight="300"
                                            color="text.white"
                                            fontSize={[0, '', 1]}
                                        >
                                            {link.label}
                                        </Text>
                                    </Link>
                                </Box>
                            );
                        })}
                    </Box>

                    <Box mb="30px">
                        <Text
                            fontWeight="500"
                            color="text.white"
                            fontSize={[0, '', 1]}
                            mb="5px"
                        >
                            Follow us
                        </Text>
                        <Flex>
                            {SOCIAL_LINKS_MAP.map(link => {
                                return (
                                    <Box key={link.label} mr="6px">
                                        <Link
                                            to={link.url}
                                            isExternal
                                            target="_blank"
                                        >
                                            <Box
                                                background="white"
                                                width="26px"
                                                height="26px"
                                                borderRadius="50%"
                                            >
                                                <Icon
                                                    fontSize="25px"
                                                    type={link.label.toLowerCase()}
                                                />
                                            </Box>
                                        </Link>
                                    </Box>
                                );
                            })}
                        </Flex>
                    </Box>
                </Grid>
            </Container>

            <Box mt={['30px', '', '40px']} px={[25, 0, 0]} width="100%">
                <Container
                    display="flex"
                    height={[75, '', 80]}
                    borderTop="0.5px solid"
                    borderColor="divider.gray"
                    justifyContent={['center', '', 'space-between']}
                    alignItems="center"
                    flexDirection={['column', '', 'row']}
                    px={20}
                >
                    <Text fontWeight="300" fontSize={0} color="white">
                        © Laguro, Inc
                    </Text>
                    <Flex>
                        <Link ml={[0, '', 50]} to={'/terms'}>
                            <Text
                                fontWeight="300"
                                fontSize={[0, '', 1]}
                                mb={2}
                                color="white"
                            >
                                Terms
                            </Text>
                        </Link>
                        <Link ml={50} to={'/privacy'}>
                            <Text
                                fontWeight="300"
                                fontSize={[0, '', 1]}
                                color="white"
                            >
                                Privacy
                            </Text>
                        </Link>
                    </Flex>
                </Container>
            </Box>
        </Flex>
    );
};

export default Footer;
