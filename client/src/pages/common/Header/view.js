import React, { Component, Fragment } from 'react';
import Intercom from 'react-intercom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Dropdown } from 'antd';
import SearchBox from '../SearchBox';
import {
    Flex,
    Link,
    Container,
    Icon,
    Text,
    Image,
    Box,
    Responsive,
} from '../../../components';
import defaultUserImage from '../../../components/Image/defaultUserImage.svg';
import LoginModal from '../Modals/LoginModal';
import { intercomKey } from '../../../config/keys';
import theme from '../../../components/theme';
import { withScreenSizes } from '../../../components/Responsive';
import { setImageSizeToUrl } from '../../../util/imageUtil';

import ProfileMenu from './ProfileMenu';
import DentistsAndHostsMenu from './DentistsAndHostsMenu';

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

const StyledText = styled(Text)`
    cursor: pointer;
`;

const StyledDropContainer = styled.div`
    @media (max-width: 991px) {
        .ant-dropdown {
            height: 250vh;
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
        const { toggleLoginModal } = this.props;
        if (!isMobile) {
            toggleLoginModal();
        }
    };

    render() {
        const {
            auth,
            pathname,
            onLogout,
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
                            logout={onLogout}
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
                                auth.imageUrl
                                    ? setImageSizeToUrl(
                                          auth.imageUrl,
                                          desktopOnly ? 50 : 30
                                      )
                                    : defaultUserImage
                            }
                            width={[30, '', 50]}
                            height={[30, '', 50]}
                            borderRadius={50}
                            ml={60}
                            data-cy="profile-button"
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

class DentistsAndHostsButton extends Component {
    render() {
        const {
            auth,
            onLandingPage,
            isDentist,
            isHost,
            desktopOnly,
        } = this.props;
        return (
            auth && (
                <Fragment>
                    <Dropdown
                        overlay={
                            <DentistsAndHostsMenu
                                isDentist={isDentist}
                                isHost={isHost}
                            />
                        }
                        placement={'bottomRight'}
                        trigger={desktopOnly ? ['hover'] : ['click']}
                        getPopupContainer={() =>
                            document.getElementById('dropdownContainer2')
                        }
                    >
                        {auth && isDentist && (
                            <StyledText
                                color={
                                    onLandingPage ? 'text.white' : 'text.black'
                                }
                                fontSize={1}
                                fontWeight="bold"
                                mb={[0, '', 4]}
                            >
                                Dentists and Hosts
                            </StyledText>
                        )}
                    </Dropdown>
                    <StyledDropContainer id="dropdownContainer2" />
                </Fragment>
            )
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
    render() {
        const {
            pathname,
            auth,
            isDentist,
            isHost,
            isLoginModalOpen,
            toggleLoginModal,
            onLogout,
            desktopOnly,
        } = this.props;

        let placeholder;
        let logoType;

        const onLandingPage = pathname === '/';
        const onOnboardingPage = pathname.includes('host-onboarding');
        if (pathname.startsWith('/office')) {
            logoType = 'dentistLogo';
            placeholder = 'Search offices';
        } else {
            logoType = onLandingPage ? 'whiteLogo' : 'defaultLogo';
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

        const currentUrl = window.location.href;

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
                    toggleLoginModal={toggleLoginModal}
                    isLoginModalOpen={isLoginModalOpen}
                />
                <Container
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Link to={'/'} display="flex">
                        <Icon
                            type={logoType}
                            isButton={true}
                            width="auto"
                            height={[22, '', 40]}
                        />
                    </Link>

                    <Desktop>
                        {!onLandingPage && (
                            <SearchBox placeholder={placeholder} size="small" />
                        )}
                    </Desktop>

                    <Flex alignItems="center">
                        <Desktop>
                            {auth && isDentist && (
                                <DentistsAndHostsButton
                                    isDentist={isDentist}
                                    isHost={isHost}
                                    auth={auth}
                                    onLandingPage={onLandingPage}
                                />
                            )}
                        </Desktop>
                        <Desktop>
                            {!onOnboardingPage && !isDentist && (
                                <NavBarLink
                                    ml="0px"
                                    to={
                                        auth
                                            ? '/host-onboarding/add-office'
                                            : '/'
                                    }
                                    onClick={auth ? () => {} : toggleLoginModal}
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
                                        Become a Host
                                    </Text>
                                </NavBarLink>
                            )}
                        </Desktop>
                        {auth && isDentist && (
                            <Box ml={[0, '', 50]} mr={[-30, '', 0]}>
                                <a
                                    ml="0px"
                                    target="_blank"
                                    href={
                                        currentUrl.includes('laguro-stage')
                                            ? 'http://ltm.laguro-stage.com/'
                                            : 'http://ltm.laguro.com/'
                                    }
                                >
                                    <Text
                                        color={
                                            onLandingPage
                                                ? 'text.white'
                                                : 'text.black'
                                        }
                                        fontSize={[0, '', 1]}
                                        fontWeight="bold"
                                        mb={[0, '', 4]}
                                    >
                                        LTM
                                    </Text>
                                </a>
                            </Box>
                        )}

                        <ProfileButton
                            pathname={pathname}
                            isDentist={isDentist}
                            toggleLoginModal={toggleLoginModal}
                            onLogout={onLogout}
                            isHost={isHost}
                            auth={auth}
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
    onLogout: () => {},
    toggleLoginModal: () => {},
    isSubmitting: false,
    isDentist: null,
    isHost: null,
};

Header.propTypes = {
    auth: PropTypes.object,
    onLogout: PropTypes.func,
    openLoginModal: PropTypes.func,
    isSubmitting: PropTypes.bool,
    isDentist: PropTypes.string,
    isHost: PropTypes.string,
    toggleLoginModal: PropTypes.func,
    pathname: PropTypes.string,
};

export default withScreenSizes(Header);
