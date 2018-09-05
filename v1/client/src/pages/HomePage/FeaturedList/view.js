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
import LinkCard from '../../common/LinkCard';
import hero1 from '../../../images/Hero-img.jpg';

const StyledSpecialtyContainer = styled(Flex)`
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
    <Container>
        <Box pb={40} />
        <Text
            color="black"
            fontSize={5}
            lineHeight="30px"
            letterSpacing="-0.8px"
        >
            Dentist Specialties
        </Text>
        <Box pb={30} />
        <StyledSpecialtyContainer data-name="specialties">
            {specialties.map((item, index) => (
                <Box width="405px" key={index} mr="32px" mb="40px">
                    <LinkCard {...item} type="rectangle" />
                </Box>
            ))}
        </StyledSpecialtyContainer>
        <Text
            color="black"
            fontSize={5}
            lineHeight="30px"
            letterSpacing="-0.8px"
        >
            you are a...
        </Text>
        <Box pb={28} />
        <Flex data-name="role-boxes" justifyContent="space-between">
            <Box width="48%" position="relative">
                <Image width="100%" height="300px" src={hero1} alt="hero1" />
                <Box pb={18} />
                <Text color="black" fontSize={4} lineHeight="30px">
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
                            fontSize={6}
                            lineHeight="51px"
                            float="right"
                        >
                            landlord
                        </Text>
                    </Flex>
                </Box>
            </Box>
            <Box width="48%" position="relative">
                <Image width="100%" height="300px" src={hero1} alt="hero1" />
                <Box pb={18} />
                <Text color="black" fontSize={4} lineHeight="30px">
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
                            fontSize={6}
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
            fontSize={5}
            lineHeight="30px"
            letterSpacing="-0.8px"
        >
            this is{' '}
        </Text>
        <Text
            is="span"
            color="black"
            fontSize={5}
            fontWeight="bold"
            lineHeight="30px"
            letterSpacing="-0.8px"
        >
            laguro
        </Text>
        <div>
            <Text
                color="black"
                fontSize={4}
                lineHeight="30px"
                letterSpacing="-0.8px"
            >
                a practical solution for renting out your commercial space
            </Text>
        </div>
        <Box pb={28} />
        <Box data-name="explore" position="relative">
            <Image width="100%" height="300px" src={hero1} alt="hero1" />
            <Flex
                alignItems="center"
                height="100%"
                justifyContent="center"
                position="absolute"
                top="0"
                width="100%"
            >
                <Button width="180px">explore</Button>
            </Flex>
        </Box>
    </Container>
);

export default FeaturedListView;