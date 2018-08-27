import React from 'react';
import styled from 'styled-components';
import hero1 from '../../images/Hero-img.jpg';
import { Box, Icon, Input, Text } from '../../components';
import FeaturedList from './FeaturedList';

const StyledInput = styled(Input)`
    && {
        width: 640px;
        height: 80px;
        border-radius: 4px;

        input::placeholder {
            color: black;
            font-style: italic;
            font-size: 18px;
            font-weight: 700;
            font-family: Ubuntu;
        }

        input {
            color: black;
            font-style: italic;
            font-size: 18px;
            font-weight: 700;
            font-family: Ubuntu;
        }

        input:not(:first-child) {
            padding-left: 55px;
        }
    }
    background-color: white;
`;

const HomePageView = () => (
    <Box>
        <Box
            data-name="hero-shot"
            background={`url(${hero1}) no-repeat right bottom 0/1920px auto`}
            backgroundSize="cover"
            height="100vh"
            width="100%"
        >
            <Box
                color="text.white"
                m="auto"
                minWidth="840px"
                pt="32vh"
                width="45%"
            >
                <Box width="65%">
                    <Text
                        fontWeight="bold"
                        color="text.white"
                        fontSize={5}
                        fontStyle="italic"
                        lineHeight="50px"
                    >
                        find your next
                    </Text>
                    <Text
                        color="text.white"
                        fontSize={6}
                        fontStyle="italic"
                        fontWeight="light"
                        lineHeight="50px"
                    >
                        dentist or specialist
                    </Text>
                    <Text
                        lineHeight="50px"
                        color="text.white"
                        fontWeight="light"
                        fontStyle="italic"
                        fontSize={5}
                    >
                        and book an appointment
                    </Text>
                </Box>
                <Box pb={30} />
                <StyledInput
                    placeholder="find your smile here"
                    prefix={
                        <Icon type="locationPin" width="40px" height="40px" />
                    }
                />
            </Box>
        </Box>
        <FeaturedList />
    </Box>
);

export default HomePageView;
