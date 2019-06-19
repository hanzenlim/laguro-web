import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
    Box,
    Button,
    Text,
    Link,
    Container,
    Flex,
    Responsive,
    Image,
} from '../../../components';
import PriceEstimationQuiz from '../PriceEstimationQuiz';
import PriceEstimationResult from '../PriceEstimationResult';

import homepageBackground from '../../../images/homepageSearchBackground_2560px.png';
import tabletHomepageBackground from '../../../images/homepageSearchBackground_tablet_1024px.png';

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

const BannerContentView = ({
    isQuizDone,
    isQuizVisible,
    bundleGroupCoverageData,
    formValues,
    toggleQuizVisibility,
    setQuizDone,
    setBundleGroupCoverageData,
    setFormValues,
    tabletMobileOnly,
}) => (
    <Flex
        width="100%"
        height={isQuizDone ? [690, '', 862] : [567, '', 635]}
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
                        Answer a few questions, get price estimation with your
                        insurance coverage, and we’ll curate your dentist search
                        for you!
                    </Text>

                    <Button
                        type="ghost"
                        height="auto"
                        mb={20}
                        width={277}
                        onClick={toggleQuizVisibility}
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
                            toggleQuizVisibility={toggleQuizVisibility}
                            setQuizDone={setQuizDone}
                            setBundleGroupCoverageData={
                                setBundleGroupCoverageData
                            }
                            setFormValues={setFormValues}
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

        {isQuizDone && (
            <PriceEstimationResult
                bundleGroupCoverageData={bundleGroupCoverageData}
                formValues={formValues}
            />
        )}
    </Flex>
);

BannerContentView.propTypes = {
    isQuizDone: PropTypes.bool.isRequired,
    isQuizVisible: PropTypes.bool.isRequired,
    setQuizDone: PropTypes.func.isRequired,
    toggleQuizVisibility: PropTypes.func.isRequired,
    setBundleGroupCoverageData: PropTypes.func.isRequired,
    tabletMobileOnly: PropTypes.bool.isRequired,
    bundleGroupCoverageData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    setFormValues: PropTypes.func.isRequired,
    formValues: PropTypes.shape({}).isRequired,
};

export default withScreenSizes(BannerContentView);
