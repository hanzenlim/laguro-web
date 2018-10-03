import React from 'react';
import styled from 'styled-components';
import hero from '../../components/Image/hero.jpg';
import {
    Box,
    Button,
    Container,
    Image,
    Flex,
    Text,
    Card,
    Link,
} from '../../components';
import FeaturedList from './FeaturedList';
import SearchBox from '../common/SearchBox/index';
import aboutUs from '../../components/Image/aboutUs.svg';
import Wave from '../../components/Image/wave';
import chair from '../../components/Image/chair.svg';
import office from '../../components/Image/office.svg';

const StyledCard = styled(Card)`
    && {
        width: 620px;
        box-shadow: ${props => props.theme.shadows[2]};
        border-color: ${props => props.theme.colors.divider.gray};
        padding: 40px 70px;
    }

    && .ant-card-head {
        border-bottom: none;
        padding: 0;
    }

    && .ant-card-body {
        padding: 0;
    }
`;

const Background = styled(Box)`
    width: 100%;
    height: 100%;
    background: url(${hero}) no-repeat center -175px scroll;
    background-size: cover;
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
`;

const Filter = styled(Box)`
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.73;
    z-index: 2;
    position: absolute;
    top: 0;
    left: 0;
`;

const HeroContent = styled(Container)`
    && {
        z-index: 100;
        position: relative;
    }

    && * {
        z-index: 100;
        opacity: 1;
    }
`;

const HomePageView = () => (
    <Box mb={-5}>
        <Box height="720px" width="100%" position="relative">
            <Filter />
            <Background />
            <HeroContent
                color="text.white"
                m="auto"
                pt={280}
                minWidth="840px"
                textAlign="left"
            >
                <Box mb={70}>
                    <Text fontWeight="bold" color="text.white" fontSize={6}>
                        Smile anywhere.
                    </Text>
                    <Text
                        color="text.white"
                        fontSize={5}
                        lineHeight={1.4}
                        fontWeight="medium"
                    >
                        Find your next dentist
                    </Text>
                    <Text
                        color="text.white"
                        lineHeight={1.4}
                        fontSize={5}
                        fontWeight="medium"
                    >
                        and book an appointment today
                    </Text>
                </Box>
                <SearchBox
                    size="large"
                    placeholder="Search for dentists by name, location, or specialty"
                />
            </HeroContent>
        </Box>
        <FeaturedList />

        <Container>
            <Text color="text.black50" fontSize={4} mb={36}>
                ARE YOU A DENTIST?
            </Text>
            <Flex data-name="role-boxes" justifyContent="space-between" mb={75}>
                <StyledCard title={<Image src={office} />}>
                    <Text fontSize={5} color="text.black" mb={8}>
                        Become a host
                    </Text>
                    <Text fontSize={4} color="text.black" mb={22}>
                        Have empty chairs and unused equipment in your office?
                        List them here and start sharing your space today!
                    </Text>
                    <Link to="/host-onboarding/add-office">
                        <Text
                            fontSize={4}
                            mr={5}
                            color="text.blue"
                            fontWeight="bold"
                        >
                            Create a listing ➞
                        </Text>
                    </Link>
                </StyledCard>
                <StyledCard title={<Image src={chair} />}>
                    <Text fontSize={5} color="text.black" mb={8}>
                        Book a chair
                    </Text>
                    <Text fontSize={4} color="text.black" mb={22}>
                        Want to see your patients when you want, where you want?
                        Book a chair and equipment you need here.
                    </Text>
                    <Link to="/office/search">
                        <Text
                            fontSize={4}
                            mr={5}
                            color="text.blue"
                            fontWeight="bold"
                        >
                            Search for chairs ➞
                        </Text>
                    </Link>
                </StyledCard>
            </Flex>

            <Flex width="100%" height="520px" mb={-170}>
                <Image
                    width="810px"
                    src={aboutUs}
                    alt="about us cartoon"
                    style={{ zIndex: 100 }}
                />
                <Flex width={450} flexDirection="column" pt={120} pl={80}>
                    <Text
                        color="text.black"
                        fontWeight="bold"
                        fontSize={5}
                        mb={20}
                    >
                        Laguro has arrived
                    </Text>
                    <Text color="text.black" fontSize={4}>
                        Meet Laguro and
                    </Text>
                    <Text color="text.black" fontSize={4} mb={50}>
                        learn more about what we do!
                    </Text>
                    <Link to="/about">
                        <Button width="260px" height="80px">
                            <Text
                                color="text.white"
                                fontSize={4}
                                fontWeight="bold"
                            >
                                About us
                            </Text>
                        </Button>
                    </Link>
                </Flex>
            </Flex>
        </Container>
        <Wave />
    </Box>
);

export default HomePageView;
