import React, { Fragment } from 'react';
import Intercom from 'react-intercom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Dropdown } from 'antd';
import isEmpty from 'lodash/isEmpty';
import SearchBox from '../SearchBox';
import logo from '../../../components/Image/logo.png';
import whiteLogo from '../../../components/Image/whiteLogo.png';
import {
    Flex,
    Link,
    Container,
    Icon,
    Text,
    Image,
    Responsive,
} from '../../../components';
import defaultUserImage from '../../../components/Image/defaultUserImage.svg';
import LoginModal from '../Modals/LoginModal';
import RegistrationModal from '../Modals/RegistrationModal';
import ForgotPassModal from '../Modals/ForgotPassModal';
import { intercomKey } from '../../../config/keys';

import ProfileMenu from './ProfileMenu';

const { Desktop } = Responsive;

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

const ProfileImage = styled(Flex)`
    cursor: pointer;
`;

const ProfileButton = ({
    auth,
    openLoginModal,
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
            <ProfileImage alignItems="center">
                <Image
                    src={auth.imageUrl ? auth.imageUrl : defaultUserImage}
                    width={50}
                    height={50}
                    borderRadius={50}
                    ml={60}
                />
                <Icon
                    ml={4}
                    transform="scale(0.8)"
                    fill={onLandingPage ? '#FFF' : '#3481F8'}
                    type="downArrow"
                />
            </ProfileImage>
        </Dropdown>
    ) : (
        <Fragment>
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
    pathname,
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
    isSubmitting,
}) => {
    let placeholder;
    let logoType;

    const onLandingPage = pathname === '/';
    const onOnboardingPage = pathname.includes('host-onboarding');
    if (pathname.startsWith('/office')) {
        logoType = onLandingPage ? 'whiteDentistLogo' : 'dentistLogo';
        placeholder = 'Search offices';
    } else {
        placeholder = 'Search dentists';
    }

    const onSearchPage =
        pathname.includes('/office/search') ||
        pathname.includes('/dentist/search');

    const position = () => {
        if (onSearchPage) return 'fixed';
        if (onLandingPage) return 'absolute';
        return 'relative';
    };

    return (
        <Flex
            is="header"
            width="100vw"
            height={120}
            bg={onLandingPage ? 'background.transparent' : 'background.white'}
            borderBottom={onLandingPage ? 'none' : '1px solid'}
            borderColor="divider.gray"
            flex="0 0 auto"
            alignItems="center"
            justifyContent="center"
            style={{ zIndex: 600 }}
            position={position()}
        >
            <IntercomContainer auth={auth} />
            <LoginModal
                login={login}
                openRegistrationModal={openRegistrationModal}
                openForgotPassModal={openForgotPassModal}
                closeModal={closeModal}
                visible={visibleModal === 'login'}
                isSubmitting={isSubmitting}
            />
            <RegistrationModal
                signup={signup}
                openLoginModal={openLoginModal}
                closeModal={closeModal}
                visible={visibleModal === 'register'}
                isSubmitting={isSubmitting}
            />
            <ForgotPassModal
                sendPassResetLink={sendPassResetLink}
                openLoginModal={openLoginModal}
                closeModal={closeModal}
                visible={visibleModal === 'forgotPass'}
                isSubmitting={isSubmitting}
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

                <Desktop>
                    {!onLandingPage && (
                        <SearchBox placeholder={placeholder} size="small" />
                    )}
                </Desktop>

                <Flex alignItems="center">
                    <Desktop>
                        {!onOnboardingPage && (
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
                                    {isHost
                                        ? 'add a new office'
                                        : 'become a host'}
                                </Text>
                            </NavBarLink>
                        )}
                    </Desktop>
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
    closeModal: () => {},
    isSubmitting: false,
};

Header.propTypes = {
    visibleModal: PropTypes.string,
    auth: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func,
    openLoginModal: PropTypes.func,
    closeModal: PropTypes.func,
    isSubmitting: PropTypes.bool,
};

export default Header;
