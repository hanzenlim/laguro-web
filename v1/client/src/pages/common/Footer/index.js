import React from 'react';

import { Text, Flex, Box, Link, Icon, Container } from '../../../components';

const StyledLink = ({ target = '/', name }) => (
    <Link to={target}>
        <Text fontSize={1} mb={2}>
            {name}
        </Text>
    </Link>
);

const LinkGroup = ({ title, children }) => (
    <Box mr={100}>
        <Text fontWeight="bold" mb={14}>
            {title}
        </Text>
        {children}
    </Box>
);

const Footer = () => (
    <Flex
        is="footer"
        width={1}
        height={345}
        bg={'#fff'}
        borderTop="1px solid"
        borderColor="divider.gray"
        flex="0 0 auto"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
    >
        <Flex
            flexDirection="row"
            flexWrap="wrap"
            width={1}
            justifyContent="center"
            alignItems="flex-start"
            mt={100}
        >
            <LinkGroup title="laguro">
                <StyledLink target="/" name="contact" />
                <StyledLink target="/" name="about us" />
            </LinkGroup>

            <LinkGroup title="landlord">
                <StyledLink target="/" name="create office" />
                <StyledLink target="/" name="profile page" />
                <StyledLink target="/" name="payment history" />
                <StyledLink target="/" name="payout funds" />
            </LinkGroup>

            <LinkGroup title="dentist">
                <StyledLink target="/" name="reserve office space" />
                <StyledLink target="/" name="profile page" />
                <StyledLink target="/" name="payment history" />
                <StyledLink target="/" name="payout funds" />
            </LinkGroup>

            <LinkGroup title="patient">
                <StyledLink target="/" name="book appointment" />
                <StyledLink target="/" name="profile page" />
                <StyledLink target="/" name="payment history" />
            </LinkGroup>

            <Flex alignSelf="center">
                <Link mr={25} to={'/'}>
                    <Icon color="icon.black" fontSize={4} type="facebook" />
                </Link>
                <Link mr={25} to={'/'}>
                    <Icon color="icon.black" fontSize={4} type="twitter" />
                </Link>
                <Link mr={25} to={'/'}>
                    <Icon color="icon.black" fontSize={4} type="instagram" />
                </Link>
            </Flex>
        </Flex>

        <Container
            display="flex"
            height={64}
            borderTop="1px solid"
            borderColor="divider.gray"
            justifyContent="space-between"
            alignItems="center"
        >
            <Flex alignItems="center">
                <Icon width={20} height={20} mr={8} type="Pin" alt="logo" />
                <Text>© 2018&nbsp;</Text>
                <Text fontWeight="bold">laguro</Text>
                <Text>&nbsp;LLC. all rights reserved.</Text>
            </Flex>
            <Flex>
                <Link ml={50} to={'/terms'}>
                    <Text fontSize={1} mb={2} color="black">
                        terms
                    </Text>
                </Link>
                <Link ml={50} to={'/privacy'}>
                    <Text fontSize={1} mb={2} color="black">
                        privacy
                    </Text>
                </Link>
                <Link ml={50} to={'/'}>
                    <Text fontSize={1} mb={2}>
                        site map
                    </Text>
                </Link>
            </Flex>
        </Container>
    </Flex>
);

export default Footer;
