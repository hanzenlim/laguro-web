import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
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
import PriceEstimationQuiz from './PriceEstimationQuiz';
import homepageBackground from '../../images/homepageSearchBackground_2560px.png';
import tabletHomepageBackground from '../../images/homepageSearchBackground_tablet_1024px.png';
import { HowItWorks } from './HowItWorks';
import { HowWeAreDiff } from './HowWeAreDiff';
import { SectionHeading } from './common';
import desktopHotItWorksAI from '../../images/homepageHowItWorksAI_2560x420.png';
import tabletHotItWorksAI from '../../images/homepageHowItWorksAI_1024x371.png';
import mobileHotItWorksAI from '../../images/homepageHowItWorksAI_767x302.png';
import howWeAreDiffBackground from '../../images/WhatMakesUsDifferent_2560x1954.png';
import questionAI from '../../images/bubbles.png';
import howWeAreDiffBackgroundMobile from '../../images/whatMakesUsDifferent_1024x1076.png';
import aboutUsDesktop from '../../images/aboutUs_2560x631.png';
import aboutUsMobile from '../../images/aboutUs_1024x323.png';
import { BecomeAHostLink, BecomeADentistLink } from '../common/Links';
import ResponsivePropTypes from '../../types/responsive';

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
    fontSize: [3, 2, 20],
    maxWidth: ['unset', 'unset', 515],
    textAlign: ['left', 'center', ''],
    height: ['auto', 26, 52],
};

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
            <div id={id}>
                <div />
            </div>
        </Box>
        {children}
    </Box>
);

class HomePageView extends PureComponent {
    state = {
        isQuizVisible: false,
        isQuizDone: false,
    };

    toggleQuizVisibility = () => {
        this.setState(({ isQuizVisible }) => ({
            isQuizVisible: !isQuizVisible,
        }));
    };

    setQuizDone = isQuizDone => this.setState({ isQuizDone });

    render() {
        const {
            desktopOnly,
            tabletOnly,
            tabletMobileOnly,
            tabletDesktopOnly,
        } = this.props;

        const { isQuizVisible, isQuizDone } = this.state;

        let background;

        if (desktopOnly) {
            background = desktopHotItWorksAI;
        } else if (tabletOnly) {
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
                <Flex
                    width="100%"
                    height={[567, '', 635]}
                    mb={[80, '', 137]}
                    position="relative"
                    alignItems="center"
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
                                tabletMobileOnly
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
                            height={392} // comes from the side width of homepageBackground
                            zIndex={1}
                            bg="background.blue"
                            alignSelf="flex-start"
                        />
                    </Desktop>

                    {!isQuizDone && (
                        <HeroContent color="text.white" textAlign="center">
                            <Box pt={[]} mb={[40, 35, 50]}>
                                <Text
                                    fontWeight="bold"
                                    color="text.white"
                                    fontSize={[4, 5, 6]}
                                    mb={[15, '', 25]}
                                >
                                    Smile anywhere.
                                </Text>
                                <Text
                                    color="text.white"
                                    fontSize={[2, 3, 4]}
                                    lineHeight={1.4}
                                    maxWidth={670}
                                    mx="auto"
                                    mb={40}
                                >
                                    Answer a few questions, get price estimation
                                    with your insurance coverage, and we’ll
                                    curate your dentist search for you!
                                </Text>

                                <Button
                                    type="ghost"
                                    height="auto"
                                    mb={20}
                                    width={277}
                                    onClick={this.toggleQuizVisibility}
                                >
                                    <Text
                                        color="text.blue"
                                        bg="background.white"
                                        lineHeight="50px"
                                        borderRadius={32}
                                        style={{
                                            boxShadow:
                                                '0 2px 7px 0 rgba(24, 54, 100, 0.39)',
                                        }}
                                    >
                                        Take the quiz →
                                    </Text>
                                </Button>

                                {isQuizVisible && (
                                    <PriceEstimationQuiz
                                        toggleQuizVisibility={
                                            this.toggleQuizVisibility
                                        }
                                        setQuizDone={this.setQuizDone}
                                    />
                                )}

                                <Text
                                    color="text.white"
                                    fontSize={[0, '', 1]}
                                    lineHeight="14px"
                                    fontWeight="light"
                                    mb={4}
                                >
                                    Want to skip this step?
                                </Text>
                                <Link to="/dentist/search">
                                    <Text
                                        color="text.white"
                                        fontSize={[0, '', 1]}
                                        lineHeight="14px"
                                        fontWeight="medium"
                                        style={{ textDecoration: 'underline' }}
                                    >
                                        Go to dentist search page instead
                                    </Text>
                                </Link>
                            </Box>
                        </HeroContent>
                    )}
                </Flex>

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
                                desktopOnly
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
                                        tabletDesktopOnly
                                            ? 'repeat(2, 1fr)'
                                            : 'auto'
                                    }
                                    gridRowGap={tabletMobileOnly ? 100 : 0}
                                    gridColumnGap={tabletOnly ? 10 : 0}
                                >
                                    <Flex
                                        justifyContent={[
                                            'center',
                                            'unset',
                                            'unset',
                                        ]}
                                        flexDirection="column"
                                        alignItems={
                                            tabletDesktopOnly && 'center'
                                        }
                                    >
                                        <SectionHeading heading="Are you a dentist?" />
                                        <Text {...questionDescriptionProps}>
                                            Come join our team and work with us
                                            at a local dental clinic near you.
                                        </Text>
                                        {BecomeADentistLink}
                                    </Flex>
                                    <Flex
                                        justifyContent={[
                                            'center',
                                            'unset',
                                            'unset',
                                        ]}
                                        flexDirection="column"
                                        alignItems={
                                            tabletDesktopOnly && 'center'
                                        }
                                    >
                                        <SectionHeading heading="Want to become a host?" />
                                        <Text {...questionDescriptionProps}>
                                            List your current practice and start
                                            earning passive income with us
                                            today.
                                        </Text>
                                        {BecomeAHostLink}
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
                                    desktopOnly ? aboutUsDesktop : aboutUsMobile
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
                            <Text {...aboutUsTextProps}>
                                Start smiling again.
                            </Text>
                            <Text {...aboutUsTextProps} mb={44}>
                                We&#39;ve got you covered
                            </Text>
                            <Link
                                to="/about"
                                width={['100%', 'unset', 'unset']}
                            >
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
    }
}

HomePageView.propTypes = {
    ...ResponsivePropTypes,
};

AnchorTag.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default withScreenSizes(HomePageView);
