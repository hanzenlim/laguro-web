import React, { Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import logo from '../../../components/Image/logo.svg';
import whiteLogo from '../../../components/Image/whiteLogo.svg';
import {
    Flex,
    Link,
    Container,
    Text,
    Image,
    Popover,
} from '../../../components';
import defaultUserImage from '../../../components/Image/defaultUserImage.svg';
import LoginModal from '../Modals/LoginModal';
import RegistrationModal from '../Modals/RegistrationModal';

const NavBarLink = styled(Link)`
    padding: 10px;
    border-bottom: 7px solid;
    border-color: ${props => props.theme.colors.divider.transparent};
    margin-left: 60px;

    &&:hover,
    &&:focus {
        border-color: ${props => props.theme.colors.divider.green};
        text-decoration: none;
    }
`;

const ProfileMenu = ({ logout }) => (
    <Flex flexDirection="column">
        <Link to={'/'}>edit profile</Link>
        <Link to={'/'}>invite friends</Link>
        <Link to={'/'}>become a dentist</Link>
        <Link to={'/'}>account settings</Link>
        <Link to={'#'} onClick={logout}>
            log out
        </Link>
    </Flex>
);

const ProfileButton = ({
    auth,
    openLoginModal,
    openRegistrationModal,
    logout,
    onLandingPage,
}) =>
    auth ? (
        <Popover
            placement="bottomRight"
            content={<ProfileMenu logout={logout} />}
            arrowPointAtCenter
        >
            <Image
                src={auth.imageUrl ? auth.imageUrl : defaultUserImage}
                width={70}
                height={70}
                borderRadius={70}
                ml={60}
            />
        </Popover>
    ) : (
        <Fragment>
            <NavBarLink onClick={openRegistrationModal} to={'#'}>
                <Text
                    color={onLandingPage ? 'text.white' : 'text.black'}
                    fontSize={1}
                    mb={4}
                >
                    sign up
                </Text>
            </NavBarLink>
            <NavBarLink onClick={openLoginModal} to={'#'}>
                <Text
                    color={onLandingPage ? 'text.white' : 'text.black'}
                    fontSize={1}
                    mb={4}
                >
                    log in
                </Text>
            </NavBarLink>
        </Fragment>
    );

const Header = ({
    onLandingPage,
    openLoginModal,
    openRegistrationModal,
    closeModal,
    visibleModal,
    login,
    logout,
    auth,
}) => (
    <Flex
        is="header"
        width={1}
        height={120}
        bg={onLandingPage ? 'background.transparent' : 'background.white'}
        borderBottom={onLandingPage ? 'none' : '1px solid'}
        borderColor="divider.gray"
        flex="0 0 auto"
        alignItems="center"
        justifyContent="center"
        zIndex="zIndex.header"
        position={onLandingPage ? 'absolute' : 'relative'}
    >
        <LoginModal
            login={login}
            openRegistrationModal={openRegistrationModal}
            closeModal={closeModal}
            visible={visibleModal === 'login'}
        />
        <RegistrationModal
            closeModal={closeModal}
            visible={visibleModal === 'register'}
        />
        <Container
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
        >
            <Link to={'/'}>
                <Image
                    height={60}
                    src={onLandingPage ? whiteLogo : logo}
                    alt="logo"
                />
            </Link>
            <Flex alignItems="center">
                <NavBarLink to={'/landlord-onboarding/add-office'}>
                    <Text
                        color={onLandingPage ? 'text.white' : 'text.black'}
                        fontSize={1}
                        mb={4}
                    >
                        rent your dental office
                    </Text>
                </NavBarLink>
                <ProfileButton
                    auth={auth}
                    openLoginModal={openLoginModal}
                    openRegistrationModal={openRegistrationModal}
                    logout={logout}
                    onLandingPage={onLandingPage}
                />
            </Flex>
        </Container>
    </Flex>
);

Header.defaultProps = {
    visibleModal: null,
    auth: null,
    login: () => {},
    logout: () => {},
    openLoginModal: () => {},
    openRegistrationModal: () => {},
    closeModal: () => {},
};

Header.propTypes = {
    visibleModal: PropTypes.string,
    auth: PropTypes.string,
    login: PropTypes.func,
    logout: PropTypes.func,
    openLoginModal: PropTypes.func,
    openRegistrationModal: PropTypes.func,
    closeModal: PropTypes.func,
};

export default Header;
