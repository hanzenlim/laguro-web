import React, { Component, Fragment } from 'react';
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
import theme from '../../../components/theme';
import { withScreenSizes } from '../../../components/Responsive';

import ProfileMenu from './ProfileMenu';

const { Desktop, Mobile } = Responsive;

const NavBarLink = styled(Link)`
    &&:hover,
    &&:focus {
        text-decoration: none;
    }

    @media (min-width: ${theme.breakpoints[1]}) {
        padding: 17px 10px 10px 10px;
        border-bottom: 7px solid;
        border-color: ${theme.colors.divider.transparent};
        margin-left: ${props => props.ml || '60px'};
        transition: all 0.2s ease-in-out;

        &&:hover,
        &&:focus {
            border-color: ${theme.colors.divider.blue};
            text-decoration: none;
        }
    }
`;

const ProfileImage = styled(Flex)`
    cursor: pointer;
`;

const StyledDropContainer = styled.div`
    @media (max-width: 991px) {
        .ant-dropdown {
            height: calc(100vh - 60px);
            overflow-y: auto;
            background-color: ${theme.colors.background.lightGray};
            top: 60px !important;
            left: 0 !important;
            right: 0 !important;
        }
    }
`;

class ProfileButton extends Component {
    openLoginForLogIn = isMobile => () => {
        const { openLoginModal } = this.props;
        if (!isMobile) {
            openLoginModal();
        }
    };

    render() {
        const {
            auth,
            pathname,
            logout,
            onLandingPage,
            isDentist,
            isHost,
            desktopOnly,
        } = this.props;
        return auth ? (
            <Fragment>
                <Dropdown
                    overlay={
                        <ProfileMenu
                            isDentist={isDentist}
                            isHost={isHost}
                            logout={logout}
                        />
                    }
                    placement={'bottomRight'}
                    trigger={desktopOnly ? ['hover'] : ['click']}
                    getPopupContainer={() =>
                        document.getElementById('dropdownContainer')
                    }
                >
                    <ProfileImage alignItems="center">
                        <Image
                            src={
                                auth.imageUrl ? auth.imageUrl : defaultUserImage
                            }
                            width={[30, '', 50]}
                            height={[30, '', 50]}
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
                <StyledDropContainer id="dropdownContainer" />
            </Fragment>
        ) : (
            <Fragment>
                <Mobile>
                    {matches => (
                        <NavBarLink
                            onClick={this.openLoginForLogIn(matches)}
                            to={matches ? `/login?redirectTo=${pathname}` : '#'}
                        >
                            <Text
                                color={
                                    onLandingPage ? 'text.white' : 'text.black'
                                }
                                fontSize={[0, '', 1]}
                                fontWeight="bold"
                                mb={[0, '', 4]}
                            >
                                log in
                            </Text>
                        </NavBarLink>
                    )}
                </Mobile>
            </Fragment>
        );
    }
}

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

class Header extends Component {
    openLoginForBecomeAHost = isMobile => () => {
        const { openLoginModal } = this.props;
        if (!isMobile) {
            openLoginModal();
        }
    };

    render() {
        const {
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
            desktopOnly,
        } = this.props;

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
                width="100%"
                height={[60, '', 120]}
                bg={
                    onLandingPage
                        ? 'background.transparent'
                        : 'background.white'
                }
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
                            <Icon
                                fontSize={desktopOnly ? 40 : 18}
                                type={logoType}
                                alt="logo"
                            />
                        ) : (
                            <Image
                                height={desktopOnly ? 40 : 18}
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
                                    to={
                                        auth
                                            ? '/host-onboarding/add-office'
                                            : '/'
                                    }
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
                                        mb={[0, '', 4]}
                                    >
                                        {isHost
                                            ? 'add a new office'
                                            : 'become a host'}
                                    </Text>
                                </NavBarLink>
                            )}
                        </Desktop>
                        <ProfileButton
                            pathname={pathname}
                            isDentist={isDentist}
                            isHost={isHost}
                            auth={auth}
                            openLoginModal={openLoginModal}
                            openRegistrationModal={openRegistrationModal}
                            logout={logout}
                            onLandingPage={onLandingPage}
                            desktopOnly={desktopOnly}
                        />
                    </Flex>
                </Container>
            </Flex>
        );
    }
}

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
    desktopOnly: PropTypes.bool,
};

export default withScreenSizes(Header);
