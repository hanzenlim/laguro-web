import React from 'react';
import _get from 'lodash/get';
import { transparentize } from 'polished';
import { HashLink } from 'react-router-hash-link';

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
    { label: 'Check our offices', url: OFFICE_SEARCH_PAGE_URL },
];

const HOST_LINKS_MAP = [
    {
        label: 'Become a host',
        url: `${HOST_ONBOARDING_PAGE_URL_PREFIX}/add-office`,
    },
];

const LAGURO_LINKS_MAP = [
    { label: 'About us', url: ABOUT_PAGE_URL },
    { label: 'Blog', url: 'https://blog.laguro.com', isExternal: true },
    { label: 'How it works', url: '/#how-it-works', isAnchorTag: true },
    { label: 'Our features', url: '/#our-features', isAnchorTag: true },
];

const SOCIAL_LINKS_MAP = [
    {
        label: 'Facebook',
        url: 'https://www.facebook.com/LaguroDental/',
        isExternal: true,
    },
    {
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/company/lagurodental/',
        isExternal: true,
    },
    {
        label: 'Instagram',
        url: 'https://www.instagram.com/lagurodental/',
        isExternal: true,
    },
    { label: 'Medium', url: 'https://medium.com/@laguro', isExternal: true },
];

// Main Component
const Footer = () => {
    const pathname = _get(window, 'location.pathname');
    const shouldShowFooter =
        !pathname.startsWith('/host-onboarding') &&
        !pathname.includes('/office/search');
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
                    gridTemplateColumns={['1fr 1fr']}
                    gridColumnGap={[24, '', 74]}
                    gridRowGap={28}
                    pt={[52, '', 66]}
                    pb={[80, '', 90]}
                    width="100%"
                    maxWidth={604}
                    mx="auto"
                >
                    <LinkGroup head="Laguro" links={LAGURO_LINKS_MAP} />
                    <LinkGroup head="Patients" links={PATIENT_LINKS_MAP} />
                    <LinkGroup head="Dentists" links={DENTIST_LINKS_MAP} />
                    <LinkGroup head="Hosts" links={HOST_LINKS_MAP} />
                </Grid>

                <BottomLinks />
            </Container>
        </Flex>
    );
};

// Component for the group of links in the grid
const LinkGroup = ({ head, links }) => (
    <Box>
        <Text
            fontWeight="500"
            color="text.white"
            fontSize={[0, '', 1]}
            mb="5px"
        >
            {head}
        </Text>
        {links.map(link => {
            const LinkElement = link.isAnchorTag ? HashLink : Link;
            return (
                <Box key={link.label}>
                    <LinkElement
                        to={link.url}
                        {...link.isAnchorTag && { smooth: true }}
                        {...link.isExternal && {
                            target: '_blank',
                            rel: 'noopener noreferrer',
                            isExternal: true,
                        }}
                    >
                        <Text
                            fontWeight="300"
                            color="text.white"
                            fontSize={[0, '', 1]}
                        >
                            {link.label}
                        </Text>
                    </LinkElement>
                </Box>
            );
        })}
    </Box>
);

// Bottom component in the footer below the line
const BottomLinks = () => (
    <Flex
        borderTop="0.5px solid"
        borderColor={transparentize(0.5, '#dbdbdb')}
        justifyContent={['center', '', 'space-between']}
        alignItems="center"
        flexDirection="row"
        flexWrap="wrap"
        py={[16, '', 25]}
    >
        <Text fontWeight="light" fontSize={0} color="text.white">
            © Laguro, Inc
        </Text>

        <Flex ml="auto">
            <Link mr={[16, '', 30]} to="/terms">
                <Text
                    fontWeight="300"
                    fontSize={[0, '', 1]}
                    mb={2}
                    color="white"
                >
                    Terms
                </Text>
            </Link>
            <Link mr={[0, '', 30]} to="/privacy">
                <Text fontWeight="300" fontSize={[0, '', 1]} color="white">
                    Privacy
                </Text>
            </Link>
        </Flex>

        <Flex width={['100%', '', 'auto']} mt={[10, '', 0]}>
            {SOCIAL_LINKS_MAP.map((link, index) => (
                <Link
                    key={link.label}
                    to={link.url}
                    isExternal
                    target="_blank"
                    mr={SOCIAL_LINKS_MAP.length - 1 === index ? 0 : 6}
                >
                    <Box
                        background="white"
                        width="26px"
                        height="26px"
                        borderRadius="50%"
                    >
                        <Icon fontSize="25px" type={link.label.toLowerCase()} />
                    </Box>
                </Link>
            ))}
        </Flex>
    </Flex>
);

export default Footer;
