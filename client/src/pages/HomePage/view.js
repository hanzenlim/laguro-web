import React from 'react';
import styled from 'styled-components';
import {
    Box,
    Button,
    Container,
    Image,
    Flex,
    Text,
    Card,
    Link,
    FilestackImage,
} from '../../components';
import FeaturedList from './FeaturedList';
import SearchBox from '../common/SearchBox/index';
import aboutUs from '../../components/Image/aboutUs.svg';
import Wave from '../../components/Image/wave';
import chair from '../../components/Image/chair.svg';
import office from '../../components/Image/office.svg';

const StyledCard = styled(Card)`
    && {
        box-shadow: ${props => props.theme.shadows[1]};
        border-color: ${props => props.theme.colors.divider.gray};
        padding: 20px;
        height: 100%;

        @media (min-width: ${props => props.theme.breakpoints[1]}) {
            padding: 40px 70px;
        }
    }

    && .ant-card-head {
        border-bottom: none;
        padding: 0;
        min-height: auto;

        @media (min-width: ${props => props.theme.breakpoints[1]}) {
            min-height: 48px;
        }
    }

    && .ant-card-head-title {
        padding: 0 0 16px 0;

        @media (min-width: ${props => props.theme.breakpoints[1]}) {
            padding: 16px 0;
        }
    }

    && .ant-card-body {
        padding: 0;
    }
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

    && > * {
        z-index: 100;
        opacity: 1;
    }
`;

const HomePageView = () => (
    <Flex flexDirection="column" height="100%" justifyContent="space-between">
        <Box
            height={[250, 350, 720]}
            width="100%"
            position="relative"
            mb={[200, 200, 0]}
        >
            <Filter />
            <Box position="absolute" width="100%" height="100%">
                <FilestackImage
                    handle="pc5h4Wo4RYOUluFmGfMG"
                    alt="laguro"
                    sizes={{
                        fallback: '100vw',
                    }}
                    formats={['webp', 'pjpg']}
                />
            </Box>

            <HeroContent
                color="text.white"
                pt={[120, 175, 280]}
                textAlign="left"
            >
                <Box mb={[80, 110, 70]}>
                    <Text
                        fontWeight="bold"
                        color="text.white"
                        fontSize={[2, 4, 6]}
                    >
                        Smile anywhere.
                    </Text>
                    <Text
                        color="text.white"
                        fontSize={[2, 3, 5]}
                        lineHeight={1.4}
                        fontWeight="medium"
                    >
                        Find your next dentist
                    </Text>
                    <Text
                        color="text.white"
                        lineHeight={1.4}
                        fontSize={[2, 3, 5]}
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
            <Text
                color="text.black50"
                fontSize={[1, 1, 4]}
                mb={[10, 10, 36]}
                fontWeight={['bold', '', 'regular']}
            >
                ARE YOU A DENTIST?
            </Text>
            <Flex
                data-name="role-boxes"
                justifyContent="space-between"
                mb={[10, 10, 75]}
                flexDirection={['column', '', 'row']}
            >
                <Box
                    width={['100%', '100%', '48.5%']}
                    minHeight={['auto', '', '360px']}
                    mb={[20, 20, 0]}
                >
                    <StyledCard
                        title={<Image src={office} width={[25, 25, 'auto']} />}
                    >
                        <Text
                            fontSize={[1, 1, 5]}
                            fontWeight={['medium', '', 'regular']}
                            color="text.black"
                            mb={8}
                        >
                            Become a host
                        </Text>
                        <Text fontSize={[0, 0, 2]} color="text.black" mb={22}>
                            Have empty chairs and unused equipment in your
                            office? List them here and start sharing your space
                            today!
                        </Text>
                        <Link to="/host-onboarding/add-office">
                            <Text
                                fontSize={[1, 1, 4]}
                                mr={5}
                                color="text.blue"
                                fontWeight={['medium', '', 'bold']}
                                textAlign={['right', '', 'left']}
                            >
                                Create a listing ➞
                            </Text>
                        </Link>
                    </StyledCard>
                </Box>
                <Box
                    width={['100%', '100%', '48.5%']}
                    minHeight={['auto', '', '360px']}
                    mb={[20, 20, 0]}
                >
                    <StyledCard
                        title={<Image src={chair} width={[25, 25, 'auto']} />}
                    >
                        <Text
                            fontSize={[1, 1, 5]}
                            fontWeight={['medium', '', 'regular']}
                            color="text.black"
                            mb={8}
                        >
                            Book a chair
                        </Text>
                        <Text fontSize={[0, 0, 2]} color="text.black" mb={22}>
                            Want to see your patients when you want, where you
                            want? Book a chair and equipment you need here.
                        </Text>
                        <Link to="/office/search">
                            <Text
                                fontSize={[1, 1, 4]}
                                mr={5}
                                color="text.blue"
                                fontWeight={['medium', '', 'bold']}
                                textAlign={['right', '', 'left']}
                            >
                                Search for chairs ➞
                            </Text>
                        </Link>
                    </StyledCard>
                </Box>
            </Flex>
        </Container>
        <Box mb={-5}>
            <Container>
                <Flex
                    width="100%"
                    height={['auto', '', 366]}
                    justifyContent="space-around"
                    flexDirection={['column', '', 'row']}
                    mb={[0, 0, -170]}
                >
                    <Image
                        width={['100%', '100%', 566]}
                        src={aboutUs}
                        alt="about us cartoon"
                        style={{ zIndex: 100 }}
                    />
                    <Flex
                        width={['100%', '100%', 450]}
                        flexDirection="column"
                        pt={[0, 0, 60]}
                        pl={[0, 0, 80]}
                    >
                        <Text
                            color={['text.black50', '', 'text.black']}
                            fontWeight="bold"
                            fontSize={[1, 1, 5]}
                            mb={[10, 10, 20]}
                        >
                            Laguro has arrived
                        </Text>
                        <Text
                            color="text.black"
                            fontSize={[0, 0, 4]}
                            mb={[20, 20, 50]}
                        >
                            Meet Laguro and{' '}
                            <Text is="br" display={['none', '', 'inline']} />
                            learn more about what we do!
                        </Text>
                        <Link to="/about">
                            <Button
                                width={['100%', '100%', 260]}
                                height={['40px', '50px', '80px']}
                                mb={[50, 50, 0]}
                            >
                                <Text
                                    color="text.white"
                                    fontSize={[0, 0, 4]}
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
    </Flex>
);

export default HomePageView;
