import React, { Fragment } from 'react';
import styled from 'styled-components';

import { Text, Box, Button, Link, Icon, Flex } from '../../components';

import aboutBannerImage from '../../images/about-page-banner.jpeg';

const Pattern = styled(Box)`
    ${props => props.patternOrder === 1 && `transform: rotate(145deg);`};
    ${props => props.patternOrder === 2 && `transform: rotate(-45deg);`};
    ${props => props.patternOrder === 3 && `transform: rotate(45deg);`};
`;

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
        <StyledBanner
            position="relative"
            height={586}
            background={`url(${aboutBannerImage})`}
            backgroundRepeat="no-repeat"
            backgroundPosition="center"
            backgroundSize="cover"
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
                    fontSize={50}
                    width={720}
                    textAlign="center"
                >
                    Welcome to the
                    <br />
                    new generation of dentistry.
                </Text>
            </Flex>
        </StyledBanner>
        <StyledBox>
            <Box pt={154} maxWidth={1044} mx="auto">
                <Box mb={50} position="relative">
                    <Box position="relative" zIndex={1}>
                        <Text fontSize={36} fontWeight="bold" color="text.blue">
                            Our Mission –
                        </Text>
                        <Text fontSize={36} fontWeight="bold">
                            To create efficiency and transparency in the
                            provision of dental care to patients, one office at
                            a time.
                        </Text>
                    </Box>
                    <Pattern
                        position="absolute"
                        patternOrder={1}
                        top={-500}
                        right={-300}
                    >
                        <Icon
                            type="macaroniPattern"
                            fontSize={500}
                            opacity={0.1}
                        />
                    </Pattern>
                    <Pattern
                        position="absolute"
                        patternOrder={2}
                        top={-300}
                        left={-400}
                    >
                        <Icon
                            type="macaroniPattern"
                            fontSize={800}
                            opacity={0.1}
                        />
                    </Pattern>
                </Box>

                <Box mb={164}>
                    <Text mb={70} fontSize={4}>
                        At Laguro, we believe that there is a better way to
                        provide service and care in dentistry. A more
                        transparent, less complicated way where patients are
                        acknowledged and practitioners are recognized. It all
                        starts with going back to the basics. By applying the
                        right technology, Laguro has created a platform where
                        practitioners no longer have to worry about slow office
                        days, filling vacant clinical spaces, and ever-growing
                        overhead costs.
                    </Text>
                    <Text fontSize={4}>
                        Started by dentists and industry experts, Laguro’s
                        mission is to provide thoughtfully-built tools to
                        practitioners so they in turn can provide treatment that
                        saves their patients’ time, money, and leads to better
                        outcomes.
                    </Text>
                </Box>

                <Box textAlign="center" mb={200} position="relative">
                    <Box position="relative" zIndex={1}>
                        <Text fontSize={40} mb={60}>
                            Ready to start using Laguro?
                        </Text>
                        <Flex
                            mx="auto"
                            width={854}
                            justifyContent="space-between"
                        >
                            <Box width="33.33%" px={10}>
                                <Link to="/host-onboarding/add-office">
                                    <Button type="ghost">
                                        <Text
                                            color="text.blue"
                                            fontSize={4}
                                            fontWeight="medium"
                                        >
                                            Become a Host
                                        </Text>
                                    </Button>
                                </Link>
                            </Box>
                            <Box width="33.33%" px={10}>
                                <Link to="/office/search">
                                    <Button type="ghost">
                                        <Text
                                            color="text.blue"
                                            fontSize={4}
                                            fontWeight="medium"
                                        >
                                            Become a Dentist
                                        </Text>
                                    </Button>
                                </Link>
                            </Box>
                            <Box width="33.33%" px={10}>
                                <Link to="/dentist/search">
                                    <Button type="ghost">
                                        <Text
                                            color="text.blue"
                                            fontSize={4}
                                            fontWeight="medium"
                                        >
                                            Schedule an appointment
                                        </Text>
                                    </Button>
                                </Link>
                            </Box>
                        </Flex>
                    </Box>
                    <Pattern
                        position="absolute"
                        patternOrder={3}
                        top={-60}
                        right={-200}
                    >
                        <Icon
                            type="macaroniPattern"
                            fontSize={800}
                            opacity={0.1}
                        />
                    </Pattern>
                </Box>
            </Box>
        </StyledBox>
    </Fragment>
);

export default AboutPage;
