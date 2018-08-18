import React from 'react';
import styled from 'styled-components';
import {
    Box,
    Button,
    Container,
    Icon,
    Image,
    Flex,
    Text,
} from '../../../components';
import SearchResultsCard from '../../common/SearchResultsCard';
import hero1 from '../../../legacyComponents/images/Hero-img.jpg';

const StyledImage = styled(Image)`
    width: 100%;
    height: 300px;
    object-fit: cover;
`;

const StyledImgBox = styled(Box)`
    height: 300px;
    overflow: hidden;
`;

const StyledButton = styled(Button)`
    && {
        position: absolute;
    }
    top: 150px;
    left: 50%;
    width: 180px;
    transform: translate(-50%, -50%);
`;

const StyledSearchResultsContainer = styled(Flex)`
    width: 100%;
    flex-wrap: wrap;
    flex: 1;
    align-content: start;

    > *:nth-child(3n) {
        @media screen and (min-width: 1200px) {
            margin-right: 0;
        }
    }
`;

const specialties = [
    {
        subtitle: 'Orthodontics and Orthopedics',
        image: 'http://via.placeholder.com/405x300',
    },
    {
        subtitle: 'Pediatric Dentistry',
        image: 'http://via.placeholder.com/405x300',
    },
    {
        subtitle: 'Oral Surgery',
        image: 'http://via.placeholder.com/405x300',
    },
    {
        subtitle: 'Endodontics',
        image: 'http://via.placeholder.com/405x300',
    },
    {
        subtitle: 'Prosthodontics',
        image: 'http://via.placeholder.com/405x300',
    },
    {
        subtitle: 'Periodontics',
        image: 'http://via.placeholder.com/405x300',
    },
];

const FeaturedListView = () => (
    // For flexibility in layout, let's put max width containers here
    // instead inside of HomePage/index.js
    <Container>
        <Box pb={40} />
        <Text
            color="black"
            fontSize={4}
            lineHeight="30px"
            letterSpacing="-0.8px"
        >
            Dentist Specialties
        </Text>
        <Box pb={30} />
        <StyledSearchResultsContainer>
            {specialties.map(item => (
                <Box width="405px" mr="32px" mb="40px">
                    <SearchResultsCard {...item} />
                </Box>
            ))}
        </StyledSearchResultsContainer>
        <Text
            color="black"
            fontSize={4}
            lineHeight="30px"
            letterSpacing="-0.8px"
        >
            you are a...
        </Text>
        <Box pb={28} />
        <Flex justifyContent="space-between">
            <Box width="48%" position="relative">
                <StyledImgBox>
                    <StyledImage src={hero1} alt="hero1" />
                </StyledImgBox>
                <Box pb={18} />
                <Text color="black" fontSize={3} lineHeight="30px">
                    if you have chairs that can be rented out
                </Text>
                <Box
                    left="50%"
                    position="absolute"
                    top="150px"
                    transform="translate(-50%, -50%)"
                >
                    <Flex>
                        <Flex
                            height="51px"
                            flexDirection="column"
                            justifyContent="center"
                        >
                            <Icon
                                type="locationPin"
                                width="40px"
                                height="40px"
                            />
                        </Flex>
                        <Text
                            color="black"
                            fontSize={5}
                            lineHeight="51px"
                            float="right"
                        >
                            landlord
                        </Text>
                    </Flex>
                </Box>
            </Box>
            <Box width="48%" position="relative">
                <StyledImgBox>
                    <StyledImage src={hero1} alt="hero1" />
                </StyledImgBox>
                <Box pb={18} />
                <Text color="black" fontSize={3} lineHeight="30px">
                    if you are looking for chairs for your practice
                </Text>
                <Box
                    left="50%"
                    position="absolute"
                    top="150px"
                    transform="translate(-50%, -50%)"
                >
                    <Flex>
                        <Flex
                            height="51px"
                            flexDirection="column"
                            justifyContent="center"
                        >
                            <Icon
                                type="locationPin"
                                width="40px"
                                height="40px"
                            />
                        </Flex>
                        <Text
                            color="black"
                            fontSize={5}
                            lineHeight="51px"
                            float="right"
                        >
                            dentist
                        </Text>
                    </Flex>
                </Box>
            </Box>
        </Flex>
        <Box pb={40} />
        <Text
            is="span"
            color="black"
            fontSize={4}
            lineHeight="30px"
            letterSpacing="-0.8px"
        >
            this is{' '}
        </Text>
        <Text
            is="span"
            color="black"
            fontSize={4}
            fontWeight="bold"
            lineHeight="30px"
            letterSpacing="-0.8px"
        >
            laguro
        </Text>
        <div>
            <Text
                color="black"
                fontSize={3}
                lineHeight="30px"
                letterSpacing="-0.8px"
            >
                a practical solution for renting out your commercial space
            </Text>
        </div>
        <Box pb={28} />
        <Box position="relative">
            <StyledImgBox>
                <StyledImage src={hero1} alt="hero1" />
            </StyledImgBox>
            <StyledButton>explore</StyledButton>
        </Box>
    </Container>
);

export default FeaturedListView;
