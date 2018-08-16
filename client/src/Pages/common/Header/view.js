import React from 'react';
import logo from '../../../components/Image/logo.svg';
import whiteLogo from '../../../components/Image/whiteLogo.svg';
import { Flex, Link, Container, Text, Image } from '../../../components';

const loginButton = (auth, onLandingPage) => {
    if (!auth) {
        return (
            <Link ml={60} to={'/'}>
                <Text
                    color={onLandingPage ? 'text.white' : 'text.black'}
                    fontSize={1}
                    mb={4}
                >
                    sign in
                </Text>
            </Link>
        );
    }
    // user IS logged in
    return (
        <Link ml={60} to={'/'}>
            <Text
                color={onLandingPage ? 'text.white' : 'text.black'}
                fontSize={1}
                mb={4}
            >
                sign out
            </Text>
        </Link>
    );
};

const profileButton = (auth, onLandingPage) => {
    if (!auth) {
        return null;
    }

    const firstName = auth && auth.firstName;
    const lastName = auth && auth.lastName;

    return (
        <Link ml={60} to={'/'}>
            <Text
                color={onLandingPage ? 'text.white' : 'text.black'}
                fontSize={1}
                mb={4}
            >{`${firstName.toLowerCase()} ${lastName.toLowerCase()}`}</Text>
        </Link>
    );
};

const Header = props => (
    <Flex
        is="header"
        width={1}
        height={120}
        bg={props.onLandingPage ? 'rgba(0, 0, 0, 0.0)' : '#fff'}
        borderBottom={props.onLandingPage ? 'none' : '1px solid'}
        borderColor="divider.gray"
        flex="0 0 auto"
        alignItems="center"
        justifyContent="center"
    >
        <Container
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
        >
            <Link to={'/'}>
                <Image
                    height={60}
                    src={props.onLandingPage ? whiteLogo : logo}
                    alt="logo"
                />
            </Link>
            <Flex>
                <Link ml={60} to={'/landlord-onboarding/add-office'}>
                    <Text
                        color={
                            props.onLandingPage ? 'text.white' : 'text.black'
                        }
                        fontSize={1}
                        mb={4}
                    >
                        rent your dental office
                    </Text>
                </Link>
                {profileButton(props.auth, props.onLandingPage)}
                {loginButton(props.auth, props.onLandingPage)}
            </Flex>
        </Container>
    </Flex>
);

export default Header;
