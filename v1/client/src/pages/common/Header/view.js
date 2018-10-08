import React, { Fragment } from 'react';
import Intercom from 'react-intercom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Dropdown } from 'antd';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import SearchBox from '../SearchBox';
import logo from '../../../components/Image/logo.png';
import whiteLogo from '../../../components/Image/whiteLogo.png';
import { Flex, Link, Container, Icon, Text, Image } from '../../../components';
import defaultUserImage from '../../../components/Image/defaultUserImage.svg';
import LoginModal from '../Modals/LoginModal';
import RegistrationModal from '../Modals/RegistrationModal';
import ForgotPassModal from '../Modals/ForgotPassModal';
import { intercomKey } from '../../../config/keys';

import ProfileMenu from './ProfileMenu';

const NavBarLink = styled(Link)`
    padding: 17px 10px 10px 10px;
    border-bottom: 7px solid;
    border-color: ${props => props.theme.colors.divider.transparent};
    margin-left: ${props => props.ml || '60px'};

    &&:hover,
    &&:focus {
        border-color: ${props => props.theme.colors.divider.blue};
        text-decoration: none;
    }
`;

const ProfileImage = styled(Image)`
    cursor: pointer;
`;

const ProfileButton = ({
    auth,
    openLoginModal,
    openRegistrationModal,
    logout,
    onLandingPage,
    isDentist,
    isHost,
}) =>
    auth ? (
        <Dropdown
            overlay={
                <ProfileMenu
                    isDentist={isDentist}
                    isHost={isHost}
                    logout={logout}
                />
            }
            placement="bottomRight"
            trigger={['hover']}
        >
            <ProfileImage
                src={auth.imageUrl ? auth.imageUrl : defaultUserImage}
                width={70}
                height={70}
                borderRadius={70}
                ml={60}
            />
        </Dropdown>
    ) : (
        <Fragment>
            <NavBarLink onClick={openRegistrationModal} to={'#'}>
                <Text
                    color={onLandingPage ? 'text.white' : 'text.black'}
                    fontSize={1}
                    fontWeight="bold"
                    mb={4}
                >
                    sign up
                </Text>
            </NavBarLink>
            <NavBarLink onClick={openLoginModal} to={'#'}>
                <Text
                    color={onLandingPage ? 'text.white' : 'text.black'}
                    fontSize={1}
                    fontWeight="bold"
                    mb={4}
                >
                    log in
                </Text>
            </NavBarLink>
        </Fragment>
    );

const IntercomContainer = ({ auth }) => {
    const user = auth
        ? {
              user_id: auth.id,
              email: auth.email,
              name: auth.firstName,
              user_hash: auth.intercomHash,
          }
        : {};
    return <Intercom appID={intercomKey} {...user} />;
};

const Header = ({
    onLandingPage,
    openLoginModal,
    openRegistrationModal,
    openForgotPassModal,
    closeModal,
    visibleModal,
    signup,
    login,
    logout,
    sendPassResetLink,
    auth,
    isDentist,
    isHost,
    onOnboardingPage,
}) => {
    let placeholder;
    let logoType;
    const pathname = get(window, 'location.pathname');

    if (pathname.startsWith('/office')) {
        logoType = onLandingPage ? 'whiteDentistLogo' : 'dentistLogo';
        placeholder = 'Search offices';
    } else {
        placeholder = 'Search dentists';
    }

    return (
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
            style={{ zIndex: 600 }}
            position={onLandingPage ? 'absolute' : 'relative'}
        >
            <IntercomContainer auth={auth} />
            <LoginModal
                login={login}
                openRegistrationModal={openRegistrationModal}
                openForgotPassModal={openForgotPassModal}
                closeModal={closeModal}
                visible={visibleModal === 'login'}
            />
            <RegistrationModal
                signup={signup}
                openLoginModal={openLoginModal}
                closeModal={closeModal}
                visible={visibleModal === 'register'}
            />
            <ForgotPassModal
                sendPassResetLink={sendPassResetLink}
                openLoginModal={openLoginModal}
                closeModal={closeModal}
                visible={visibleModal === 'forgotPass'}
            />
            <Container
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Link to={'/'}>
                    {!isEmpty(logoType) ? (
                        <Icon fontSize={40} type={logoType} alt="logo" />
                    ) : (
                        <Image
                            height={40}
                            src={onLandingPage ? whiteLogo : logo}
                            alt="logo"
                        />
                    )}
                </Link>
                {!onLandingPage && (
                    <SearchBox placeholder={placeholder} size="small" />
                )}
                <Flex alignItems="center">
                    {!onOnboardingPage &&
                        auth && (
                            <NavBarLink
                                ml="0px"
                                to={auth ? '/host-onboarding/add-office' : '/'}
                                onClick={auth ? () => {} : openLoginModal}
                            >
                                <Text
                                    color={
                                        onLandingPage
                                            ? 'text.white'
                                            : 'text.black'
                                    }
                                    fontSize={1}
                                    fontWeight="bold"
                                    mb={4}
                                >
                                    become a host
                                </Text>
                            </NavBarLink>
                        )}
                    <ProfileButton
                        isDentist={isDentist}
                        isHost={isHost}
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
};

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
    auth: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func,
    openLoginModal: PropTypes.func,
    openRegistrationModal: PropTypes.func,
    closeModal: PropTypes.func,
};

export default Header;
