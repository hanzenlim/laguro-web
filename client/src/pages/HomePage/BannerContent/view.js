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

import bannerBg from '../../../images/banner-bg.png';

const { withScreenSizes } = Responsive;

const HeroContent = styled(Container)`
    && {
        z-index: 3;
        position: relative;
    }
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
}) => (
    <Flex
        width="100%"
        height={isQuizDone ? [690, '', 862] : [450, '', 740]}
        position="relative"
        alignItems="center"
    >
        <Flex
            position="absolute"
            justifyContent="center"
            width="100%"
            height="100%"
            zIndex="1"
            style={{ overflow: 'hidden' }}
        >
            <Image
                height="100%"
                src={bannerBg}
                alt="homepage-background"
                style={{ objectFit: 'cover' }}
            />
        </Flex>

        {!isQuizDone && (
            <HeroContent color="text.white">
                <Text
                    fontSize={[29, '', 60]}
                    fontWeight="bold"
                    fontFamily="IowanOldStyle"
                    color="text.white"
                    lineHeight={[1.1]}
                    width={525}
                    maxWidth="100%"
                    mb={[32, '', 50]}
                >
                    An easier way to improve your dental experience.
                </Text>

                <Button
                    type="ghost"
                    height="auto"
                    mr={[0, '', 30]}
                    mb={[20, '', 0]}
                    width={[170, '', 270]}
                    onClick={toggleQuizVisibility}
                >
                    <Text
                        color="text.blue"
                        bg="background.white"
                        lineHeight="50px"
                        borderRadius={32}
                        style={{
                            boxShadow: '0 2px 7px 0 rgba(24, 54, 100, 0.39)',
                        }}
                    >
                        Take the quiz →
                    </Text>
                </Button>

                <Box display={['block', '', 'inline']}>
                    <Text
                        is="span"
                        color="text.white"
                        fontSize={[1, '', 2]}
                        fontWeight="light"
                    >
                        {`or `}
                    </Text>
                    <Link to="/dentist/search">
                        <Text
                            is="span"
                            color="text.white"
                            fontSize={[1, '', 2]}
                            lineHeight="14px"
                            fontWeight="medium"
                            style={{ textDecoration: 'underline' }}
                        >
                            Search for dentists
                        </Text>
                    </Link>
                </Box>

                {isQuizVisible && (
                    <PriceEstimationQuiz
                        toggleQuizVisibility={toggleQuizVisibility}
                        setQuizDone={setQuizDone}
                        setBundleGroupCoverageData={setBundleGroupCoverageData}
                        setFormValues={setFormValues}
                    />
                )}
            </HeroContent>
        )}

        {isQuizDone && (
            <PriceEstimationResult
                bundleGroupCoverageData={bundleGroupCoverageData}
                formValues={formValues}
            />
        )}

        <Box
            height={150}
            position="absolute"
            bottom={0}
            right={0}
            left={0}
            width="100%"
            zIndex="2"
            display={['none', '', 'block']}
            style={{ overflow: 'hidden' }}
        >
            <Wave width="100%" height="100%" />
        </Box>
    </Flex>
);

const Wave = props => (
    <svg
        viewBox="0 0 500 150"
        preserveAspectRatio="none"
        style={{
            height: '100%',
            width: '100%',
        }}
        width="1em"
        height="1em"
        {...props}
    >
        <path
            d="M-113.15 37.98c334.08 243.75 462.35-87.96 717.83 1.97L500 150H0z"
            fill="#f4f2ff"
        />
    </svg>
);

BannerContentView.propTypes = {
    isQuizDone: PropTypes.bool.isRequired,
    isQuizVisible: PropTypes.bool.isRequired,
    setQuizDone: PropTypes.func.isRequired,
    toggleQuizVisibility: PropTypes.func.isRequired,
    setBundleGroupCoverageData: PropTypes.func.isRequired,
    bundleGroupCoverageData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    setFormValues: PropTypes.func.isRequired,
    formValues: PropTypes.shape({}).isRequired,
};

export default withScreenSizes(BannerContentView);
