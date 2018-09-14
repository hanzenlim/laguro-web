import React from 'react';
import {
    Box,
    Button,
    Container,
    SlickCarousel,
    Icon,
    Image,
    Flex,
    Text,
} from '../../../components';
import CarouselLinkCard from '../../common/CarouselLinkCard';
import hero1 from '../../../images/Hero-img.jpg';
import { numMaxContainerWidth } from '../../../components/theme';

const carouselSpacing = 15;
const slidesToShow = 5;

const slideWidth =
    (numMaxContainerWidth - carouselSpacing * slidesToShow) / slidesToShow +
    carouselSpacing;

const FeaturedListView = props => (
    <Box mt={80}>
        <Container>
            <Text
                color="black"
                fontSize={5}
                lineHeight="30px"
                letterSpacing="-0.8px"
                mb={28}
            >
                Dentists near me
            </Text>
            <SlickCarousel
                className="slider variable-width"
                infinite={true}
                centerPadding={0}
                variableWidth={true}
            >
                {props.featuredDentists.map((item, index) => (
                    <Box
                        style={{
                            width: slideWidth + 3, // 3 is for aligning the pictures to the content width
                        }}
                        px={carouselSpacing / 2}
                        mb={90}
                        key={index}
                    >
                        <CarouselLinkCard
                            height="100%"
                            size="big"
                            {...item._source}
                        />
                    </Box>
                ))}
            </SlickCarousel>
            <Text
                color="black"
                fontSize={5}
                lineHeight="30px"
                letterSpacing="-0.8px"
            >
                FIND AND RENT
            </Text>
            <Box pb={28} />
            <Flex data-name="role-boxes" justifyContent="space-between">
                <Box width="48%" position="relative">
                    <Image
                        width="100%"
                        height="300px"
                        src={hero1}
                        alt="hero1"
                    />
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
                    <Image
                        width="100%"
                        height="300px"
                        src={hero1}
                        alt="hero1"
                    />
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
                this is
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
    </Box>
);

export default FeaturedListView;
