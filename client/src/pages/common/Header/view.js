import React, { Component, Fragment } from 'react';
import Intercom from 'react-intercom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Dropdown } from 'antd';
import SearchBox from '../SearchBox';
import { logo, logo2x, logo3x } from '../../../components/Image/logo';
import {
    whiteLogo,
    whiteLogo2x,
    whiteLogo3x,
} from '../../../components/Image/whiteLogo';
import {
    dentistLogo,
    dentistLogo2x,
    dentistLogo3x,
} from '../../../components/Image/dentistLogo';
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

export const HEADER_HEIGHT = 48;

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
            height: calc(100vh - ${HEADER_HEIGHT}px);
            overflow-y: auto;
            background-color: ${theme.colors.background.lightGray};
            top: ${HEADER_HEIGHT}px !important;
            left: 0 !important;
            right: 0 !important;
        }

        .ant-dropdown-menu {
            padding: 0;
        }
    }
`;

const StyledFlex = styled(Flex)`
    box-shadow: ${props => props.boxShadow};
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
                            to={
                                matches
                                    ? `/login?redirectTo=${pathname}`
                                    : pathname
                            }
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
        let logoSet;

        const onLandingPage = pathname === '/';
        const onOnboardingPage = pathname.includes('host-onboarding');
        if (pathname.startsWith('/office')) {
            logoType = dentistLogo;
            logoSet = [dentistLogo2x, dentistLogo3x];
            placeholder = 'Search offices';
        } else {
            logoType = onLandingPage ? whiteLogo : logo;
            logoSet = onLandingPage
                ? [whiteLogo2x, whiteLogo3x]
                : [logo2x, logo3x];
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
            <StyledFlex
                is="header"
                width="100%"
                height={[HEADER_HEIGHT, '', 120]}
                bg={
                    onLandingPage
                        ? 'background.transparent'
                        : 'background.white'
                }
                boxShadow={
                    onLandingPage ? 'none' : '0 2px 4px 0 rgba(0, 0, 0, 0.1);'
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
                        <Image
                            height={desktopOnly ? 40 : 18}
                            src={logoType}
                            srcSet={`
                                ${logoSet[0]} 2x,
                                ${logoSet[1]} 3x
                            `}
                            alt="logo"
                        />
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
            </StyledFlex>
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
