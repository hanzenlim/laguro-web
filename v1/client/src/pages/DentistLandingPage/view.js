import React from 'react';
import hero1 from '../../images/Hero-img.jpg';
import { Box, Flex, Icon, Text } from '../../components';
import FeaturedList from './FeaturedList';

const DentistLandingPageView = () => (
    <Box>
        <Box
            data-name="hero-shot"
            background={`url(${hero1}) no-repeat right bottom 0/1920px auto`}
            backgroundSize="cover"
            height="500px"
            width="100%"
        >
            <Box
                color="text.white"
                m="auto"
                pt="200px"
                width="385px"
                height="100%"
            >
                <Flex justifyContent="center">
                    <Flex
                        height="82px"
                        flexDirection="column"
                        justifyContent="center"
                    >
                        <Icon
                            color="icon.white"
                            type="locationPin"
                            width="52px"
                            height="64px"
                            mr={8}
                        />
                    </Flex>
                    <Text color="text.white" fontWeight="bold" fontSize={6}>
                        dentist
                    </Text>
                </Flex>
                <Text
                    lineHeight="30px"
                    color="text.white"
                    fontWeight="medium"
                    fontSize={4}
                    textAlign="center"
                >
                    find your next office here
                </Text>
            </Box>
        </Box>
        <FeaturedList />
    </Box>
);

export default DentistLandingPageView;
