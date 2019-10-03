import React from 'react';
import { transparentize } from 'polished';
import { useRouter } from 'next/router';

import {
    Text,
    Box,
    Flex,
    Link,
    Icon,
    Container,
    Grid,
    Image,
} from '~/components';

import {
    DENTIST_ONBOARDING_PROFILE_URL,
    DENTIST_SEARCH_PAGE_URL,
    OFFICE_SEARCH_PAGE_URL,
    HOST_ONBOARDING_PAGE_URL_PREFIX,
    ABOUT_PAGE_URL,
    TERMS_PAGE_URL,
    PRIVACY_PAGE_URL,
    getLTMBaseUrl,
} from '~/util/urls';

const PATIENT_LINKS_MAP = [
    { label: 'Find a dentist', url: DENTIST_SEARCH_PAGE_URL },
    { label: 'Check our locations', url: OFFICE_SEARCH_PAGE_URL },
];

const DENTIST_LINKS_MAP = [
    { label: 'Become a dentist', url: DENTIST_ONBOARDING_PROFILE_URL },
    { label: 'Book a chair', url: OFFICE_SEARCH_PAGE_URL },
    {
        label: 'Advanced training program',
        url: 'https://www.lagurouniversity.com/advancedtrainingprogram',
        isExternal: true,
    },
    {
        label: 'Laguro Treatment Module',
        url: getLTMBaseUrl(),
        isExternal: true,
    },
    {
        label: 'Laguro University',
        url: 'https://www.lagurouniversity.com/join',
        isExternal: true,
    },
];

const HOST_LINKS_MAP = [
    {
        label: 'Become a host',
        url: `${HOST_ONBOARDING_PAGE_URL_PREFIX}/add-office`,
    },
    {
        label: 'Laguro University',
        url: 'https://www.lagurouniversity.com/join',
        isExternal: true,
    },
];

const LAGURO_LINKS_MAP = [
    { label: 'About us', url: ABOUT_PAGE_URL },
    { label: 'Blog', url: 'https://blog.laguro.com', isExternal: true },
    { label: 'How it works', url: '/#how-it-works', isAnchorTag: true },
    { label: 'Our features', url: '/#our-features', isAnchorTag: true },
    // TODO: add link later
    // { label: 'Earn a $25 gift card', url: '/' },
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
];

// Main Component
const Footer = () => {
    const { pathname } = useRouter();
    const shouldShowFooter =
        !pathname.startsWith('/host-onboarding') &&
        !pathname.includes('/office/search') &&
        !pathname.includes('/kiosk');
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
                    gridTemplateColumns={['1fr 1fr', '', '1fr 1fr auto']}
                    gridColumnGap={[16, '', 74]}
                    gridRowGap={28}
                    pt={[52, '', 77]}
                    pb={[48, '', 75]}
                    width="100%"
                    maxWidth={770}
                    mx="auto"
                >
                    <GridItem order={1}>
                        <LinkGroup head="Laguro" links={LAGURO_LINKS_MAP} />
                    </GridItem>
                    <GridItem order={2}>
                        <LinkGroup head="Patients" links={PATIENT_LINKS_MAP} />
                    </GridItem>
                    <GridItem order={[5, '', 3]}>
                        <SocialLinks />
                    </GridItem>
                    <GridItem order={[3, '', 4]}>
                        <LinkGroup head="Dentists" links={DENTIST_LINKS_MAP} />
                    </GridItem>
                    <GridItem order={[4, '', 5]}>
                        <LinkGroup head="Hosts" links={HOST_LINKS_MAP} />
                    </GridItem>
                </Grid>

                <FooterBottom />
            </Container>
        </Flex>
    );
};

const GridItem = ({ children, ...props }) => <Box {...props}>{children}</Box>;

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
        {links.map(link => (
            <Box key={link.label}>
                <Link
                    to={link.url}
                    {...(link.isExternal && {
                        target: '_blank',
                        rel: 'noopener noreferrer',
                        isExternal: true,
                    })}
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
        ))}
    </Box>
);

const SocialLinks = () => (
    <Flex width={['100%', '', 'auto']} mt={[10, '', 0]}>
        {SOCIAL_LINKS_MAP.map((link, index) => (
            <Link
                key={link.label}
                to={link.url}
                isExternal
                target="_blank"
                mr={SOCIAL_LINKS_MAP.length - 1 === index ? 0 : 6}
                {...(link.isExternal && {
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    isExternal: true,
                })}
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
);

const FooterBottom = () => (
    <Box
        pt={[16, '', 30]}
        pb={[50, '', 64]}
        borderTop="0.5px solid"
        borderColor={transparentize(0.5, '#dbdbdb')}
    >
        <Grid
            gridTemplateColumns="1fr auto"
            gridColumnGap={10}
            width="100%"
            maxWidth={770}
            mx="auto"
        >
            <Flex justifyContent="center" flexDirection="column">
                <Flex
                    width={['100%', '', 'auto']}
                    flexDirection={['column', '', 'row']}
                >
                    <Link to={TERMS_PAGE_URL} mb={[12, '', 10]}>
                        <Text
                            fontWeight="300"
                            color="text.white"
                            fontSize={[0, '', 1]}
                        >
                            {`Terms & Condition`}
                        </Text>
                    </Link>
                    <Text
                        color="text.white"
                        mx={24}
                        display={['none', '', 'block']}
                    >
                        |
                    </Text>
                    <Link to={PRIVACY_PAGE_URL} mb={[12, '', 10]}>
                        <Text
                            fontWeight="300"
                            color="text.white"
                            fontSize={[0, '', 1]}
                        >
                            Privacy Policy
                        </Text>
                    </Link>
                    <Text
                        color="text.white"
                        mx={24}
                        display={['none', '', 'block']}
                    >
                        |
                    </Text>
                    <Link
                        to="mailto:support@laguro.com"
                        isExternal
                        target="_blank"
                        rel="noopener noreferrer"
                        mb={[12, '', 10]}
                    >
                        <Text
                            fontWeight="300"
                            color="text.white"
                            fontSize={[0, '', 1]}
                        >
                            support@laguro.com
                        </Text>
                    </Link>
                </Flex>
                <Text
                    fontWeight="light"
                    fontSize={[0, '', 1]}
                    color="text.white"
                    opacity={['0.62', '', '1']}
                >
                    ©2019 Laguro, All Rights Reserved
                </Text>
            </Flex>
            <Flex alignItems={['flex-end', '', 'center']}>
                <Image
                    src="/static/images/HIPAA-Compliance.svg"
                    alt="HIPAA Compliance"
                />
            </Flex>
        </Grid>
    </Box>
);

export default Footer;
