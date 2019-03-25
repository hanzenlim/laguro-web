import React from 'react';
import styled from 'styled-components';
import {
    Box,
    Button,
    Container,
    Image,
    Flex,
    Text,
    Link,
    Grid,
    Responsive,
} from '../../components';
import SearchBox from '../common/SearchBox/index';
import homepageBackground from '../../images/homepageSearchBackground_2560px.png';
import tabletHomepageBackground from '../../images/homepageSearchBackground_tablet_1024px.png';
import { HowItWorks } from './HowItWorks';
import { HowWeAreDiff } from './HowWeAreDiff';
import { SectionHeading } from './common';
import {
    DENTIST_ONBOARDING_PROFILE_URL,
    HOST_ONBOARDING_PAGE_URL_PREFIX,
} from '../../util/urls';
import desktopHotItWorksAI from '../../images/homepageHowItWorksAI_2560x420.png';
import tabletHotItWorksAI from '../../images/homepageHowItWorksAI_1024x371.png';
import mobileHotItWorksAI from '../../images/homepageHowItWorksAI_767x302.png';
import howWeAreDiffBackground from '../../images/WhatMakesUsDifferent_2560x1954.png';
import questionAI from '../../images/bubbles.png';
import howWeAreDiffBackgroundMobile from '../../images/whatMakesUsDifferent_1024x1076.png';
import aboutUsDesktop from '../../images/aboutUs_2560x631.png';
import aboutUsMobile from '../../images/aboutUs_1024x323.png';

const { Desktop, withScreenSizes } = Responsive;

const HeroContent = styled(Container)`
    && {
        z-index: 100;
        position: relative;
    }

    && > * {
        z-index: 100;
        opacity: 1;
    }
`;

const StyledImage = styled(Image)`
    object-fit: cover;
`;

const StyledFlex = styled(Flex)`
    overflow: hidden;
`;

const questionDescriptionProps = {
    mb: 30,
    fontSize: [3, 3, 20],
    maxWidth: ['unset', 'unset', 515],
    textAlign: ['left', 'center', ''],
    height: ['auto', '', 145],
};

const renderLink = (text1, text2) => (
    <Text
        color="text.blue"
        fontSize={3}
        letterSpacing="-0.49px"
        textAlign={['', '', 'center']}
    >
        {text1}{' '}
        <Text is="span" color="inherit" fontWeight="medium">
            {text2}{' '}
        </Text>
        >
    </Text>
);

const aboutUsTextProps = {
    color: 'text.white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: [24, '', 45],
    letterSpacing: '-0.49px',
};

export const AnchorTag = ({ id, children }) => (
    <Box position="relative">
        <Box position="absolute" top={-40}>
            <a id={id}>
                <div />
            </a>
        </Box>
        {children}
    </Box>
);

const HomePageView = props => {
    let background;

    if (props.desktopOnly) {
        background = desktopHotItWorksAI;
    } else if (props.tabletOnly) {
        background = tabletHotItWorksAI;
    } else {
        background = mobileHotItWorksAI;
    }
    return (
        <StyledFlex
            bg="#f7f8fc"
            flexDirection="column"
            height="100%"
            justifyContent="space-between"
        >
            <Box
                width="100%"
                height={[405, '', 595]}
                mb={[80, '', 137]}
                position="relative"
            >
                <StyledFlex
                    position="absolute"
                    justifyContent="center"
                    width="100%"
                    height="100%"
                    zIndex={2}
                >
                    <StyledImage
                        height="100%"
                        src={
                            props.tabletMobileOnly
                                ? tabletHomepageBackground
                                : homepageBackground
                        }
                        alt="homepage-background"
                    />
                </StyledFlex>
                <Desktop>
                    {/* blue rectangular box for screens bigger than 2560px */}
                    <Box
                        position="absolute"
                        width="100%"
                        height={367} // comes from the side width of homepageBackground
                        zIndex={1}
                        bg="background.blue"
                    />
                </Desktop>

                <HeroContent
                    color="text.white"
                    pt={[65, 50, 197]}
                    textAlign="center"
                >
                    <Box mb={[40, 35, 50]}>
                        <Text
                            fontWeight="bold"
                            color="text.white"
                            fontSize={[4, 5, 6]}
                            mb={[3, '', 0]}
                        >
                            Smile anywhere.
                        </Text>
                        <Text
                            color="text.white"
                            fontSize={[2, 3, 4]}
                            lineHeight={1.4}
                        >
                            Find your next dentist and book an appointment today
                        </Text>
                    </Box>
                    <Flex justifyContent="center">
                        <SearchBox
                            size="large"
                            placeholder="Search by name, location, or specialty"
                        />
                    </Flex>
                </HeroContent>
            </Box>

            <Container>
                <AnchorTag id="how-it-works">
                    <HowItWorks />
                </AnchorTag>
            </Container>
            <Box height={[302, 371, 420]} mb={[215, '', 213]}>
                <StyledFlex
                    position="absolute"
                    justifyContent="center"
                    width="100%"
                    zIndex={2}
                >
                    <StyledImage
                        height="100%"
                        src={background}
                        alt="background"
                    />
                </StyledFlex>
            </Box>
            <Box position="relative">
                <StyledFlex
                    position="absolute"
                    justifyContent="center"
                    width="100%"
                    zIndex={3}
                    top={[-476, '', -476]}
                >
                    <StyledImage
                        height="100%"
                        src={
                            props.desktopOnly
                                ? howWeAreDiffBackground
                                : howWeAreDiffBackgroundMobile
                        }
                        alt="background"
                    />
                </StyledFlex>
            </Box>
            <Box zIndex={4}>
                <Box mb={[30, 40, 220]}>
                    <Container>
                        <Box mt={[-185, -225, 0]} mb={[140, 240, 380]}>
                            <AnchorTag id="our-features">
                                <HowWeAreDiff />
                            </AnchorTag>
                        </Box>
                        <Flex justifyContent="center" mb={[50, 60, 165]}>
                            <Box width={400}>
                                <Image
                                    width="100%"
                                    height="auto"
                                    src={questionAI}
                                />
                            </Box>
                        </Flex>
                        <Box mb={100}>
                            <Grid
                                gridTemplateColumns={
                                    props.tabletDesktopOnly
                                        ? 'repeat(2, 1fr)'
                                        : 'auto'
                                }
                                gridRowGap={props.tabletMobileOnly ? 100 : 0}
                            >
                                <Flex
                                    justifyContent={[
                                        'center',
                                        'unset',
                                        'unset',
                                    ]}
                                    flexDirection="column"
                                    alignItems={
                                        props.tabletDesktopOnly && 'center'
                                    }
                                >
                                    <SectionHeading heading="Are you a dentist?" />
                                    <Text {...questionDescriptionProps}>
                                        Come join our team and work with us at a
                                        local Dental Clinic near you. You can
                                        start being your own boss by building
                                        your list of patients and providing
                                        premium services your patients have
                                        always wanted!
                                    </Text>
                                    <Link to={DENTIST_ONBOARDING_PROFILE_URL}>
                                        {renderLink(
                                            'Become a',
                                            'Laguro dentist'
                                        )}
                                    </Link>
                                </Flex>
                                <Flex
                                    justifyContent={[
                                        'center',
                                        'unset',
                                        'unset',
                                    ]}
                                    flexDirection="column"
                                    alignItems={
                                        props.tabletDesktopOnly && 'center'
                                    }
                                >
                                    <SectionHeading heading="Want to become a host?" />
                                    <Text {...questionDescriptionProps}>
                                        Do you own a dental office? List your
                                        current practice and become a Host to
                                        start earning passive income with us
                                        today.
                                    </Text>
                                    <Link
                                        to={`${HOST_ONBOARDING_PAGE_URL_PREFIX}/add-office`}
                                    >
                                        {renderLink('Become a', 'Laguro host')}
                                    </Link>
                                </Flex>
                            </Grid>
                        </Box>
                    </Container>
                </Box>
                <Flex height={[323, '', 631]} position="relative">
                    <StyledFlex
                        position="absolute"
                        justifyContent="center"
                        width="100%"
                        zIndex={1}
                    >
                        <StyledImage
                            height="100%"
                            src={
                                props.desktopOnly
                                    ? aboutUsDesktop
                                    : aboutUsMobile
                            }
                            alt="background"
                        />
                    </StyledFlex>
                    <Flex
                        py={60}
                        px={24}
                        width="100%"
                        height={[323, '', 631]}
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                        zIndex={2}
                    >
                        <Text {...aboutUsTextProps}>Start smiling again.</Text>
                        <Text {...aboutUsTextProps} mb={44}>
                            We&#39;ve got you covered
                        </Text>
                        <Link to="/about" width={['100%', 'unset', 'unset']}>
                            <Button width={['100%', 250, 260]} height={66}>
                                <Text
                                    color="text.white"
                                    fontSize={[3, 4, 4]}
                                    fontWeight="medium"
                                    letterSpacing="-0.49"
                                >
                                    About us
                                </Text>
                            </Button>
                        </Link>
                    </Flex>
                </Flex>
            </Box>
        </StyledFlex>
    );
};

export default withScreenSizes(HomePageView);
