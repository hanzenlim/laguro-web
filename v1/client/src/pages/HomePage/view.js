import React from 'react';
import hero1 from '../../images/Hero-img.jpg';
import { Container, Box, Text } from '../../components';
import FeaturedList from './FeaturedList';
import SearchBox from '../common/SearchBox/index';

const HomePageView = () => (
    <Box>
        <Box
            data-name="hero-shot"
            background={`url(${hero1}) no-repeat right bottom 0/1920px auto`}
            backgroundSize="cover"
            height="100vh"
            width="100%"
        >
            <Container
                color="text.white"
                m="auto"
                minWidth="840px"
                pt="32vh"
                textAlign="center"
            >
                <Box mb={80}>
                    <Text
                        fontWeight="bold"
                        color="text.white"
                        fontSize={6}
                        fontStyle="italic"
                        lineHeight="50px"
                    >
                        find your next dentist,
                    </Text>
                    <Text
                        lineHeight="50px"
                        color="text.white"
                        fontWeight="light"
                        fontStyle="italic"
                        fontSize={6}
                    >
                        book an appointment today
                    </Text>
                </Box>
                <SearchBox size="large" />
            </Container>
        </Box>
        <FeaturedList />
    </Box>
);

export default HomePageView;
