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
import BannerContent from './BannerContent';

const { withScreenSizes } = Responsive;

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
    render() {
        const {
            desktopOnly,
            tabletOnly,
            tabletMobileOnly,
            tabletDesktopOnly,
        } = this.props;

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
                <BannerContent />

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
