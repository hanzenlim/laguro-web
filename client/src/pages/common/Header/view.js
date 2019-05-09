import React, { Component } from 'react';
import _isString from 'lodash/isString';
import Intercom from 'react-intercom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SearchBox from '../SearchBox';
import { Icon, Responsive, Link } from '../../../components/';
import { Flex, Container } from '@laguro/basic-components';
import LoginModal from '../Modals/LoginModal';
import { intercomKey } from '../../../config/keys';
import { DentistLink, HostLink } from './Links';
import { LinkButton, HeaderLinkContainer } from './common';
import { HEADER_HEIGHT } from './constants';
import {
    getPageType,
    HOME_PAGE_TYPE,
    ABOUT_PAGE_URL,
    ALL_USER_PAGE_TYPE,
    PATIENT_PAGE_TYPE,
    DENTIST_AND_HOST_PAGE_TYPE,
    DENTIST_DASHBOARD_PAGE_URL,
    DENTIST_ONBOARDING_PROFILE_URL,
    HOST_DASHBOARD_PAGE_URL,
    OFFICE_PAGES_URL_PREFIX,
    HOST_ONBOARDING_PAGE_URL_PREFIX,
    PATIENT_DASHBOARD_PAGE_URL,
    PATIENT_WEB_ONBOARDING_PAGE_URL,
} from '../../../util/urls';
import ProfileButton from './ProfileButton';

const { Desktop, withScreenSizes } = Responsive;

const StyledFlex = styled(Flex)`
    box-shadow: ${props => props.boxShadow};
`;

const IntercomContainer = ({ auth, pathname }) => {
    if (
        process.env.NODE_ENV === 'production' &&
        (pathname.includes(HOST_DASHBOARD_PAGE_URL) ||
            pathname.includes(HOST_ONBOARDING_PAGE_URL_PREFIX) ||
            pathname.includes(DENTIST_DASHBOARD_PAGE_URL) ||
            pathname.includes(DENTIST_ONBOARDING_PROFILE_URL) ||
            pathname.includes(PATIENT_DASHBOARD_PAGE_URL) ||
            pathname.includes(PATIENT_WEB_ONBOARDING_PAGE_URL) ||
            pathname.includes(ABOUT_PAGE_URL))
    ) {
        const user = auth
            ? {
                  user_id: auth.id,
                  email: auth.email,
                  name: auth.firstName,
                  user_hash: auth.intercomHash,
              }
            : {};

        return <Intercom appID={intercomKey} {...user} />;
    }
    return null;
};

const getHeaderBackgroundColor = () => {
    const pageType = getPageType();
    const backgroundWhite = 'background.white';
    const backgroundBlue = 'background.blue';
    switch (pageType) {
        case HOME_PAGE_TYPE:
            return 'transparent';
        case ALL_USER_PAGE_TYPE:
            return backgroundWhite;
        case PATIENT_PAGE_TYPE:
            return backgroundWhite;
        case DENTIST_AND_HOST_PAGE_TYPE:
            return backgroundBlue;
        default:
            return backgroundWhite;
    }
};

const getLogoType = () => {
    const pageType = getPageType();
    const whiteLogo = 'whiteLogo';
    const blueLogo = 'defaultLogo';

    switch (pageType) {
        case HOME_PAGE_TYPE:
            return whiteLogo;
        case ALL_USER_PAGE_TYPE:
            return blueLogo;
        case PATIENT_PAGE_TYPE:
            return blueLogo;
        case DENTIST_AND_HOST_PAGE_TYPE:
            return whiteLogo;
        default:
            return blueLogo;
    }
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
            customRedirect,
        } = this.props;

        let placeholder;

        const pathnameWithoutParams = _isString(pathname)
            ? pathname.split('?')[0]
            : pathname;

        const onLandingPage = pathnameWithoutParams === '/';
        // We show the office search bar on office search page and host dashboard page.
        if (
            pathname.startsWith(OFFICE_PAGES_URL_PREFIX) ||
            pathname.includes(HOST_DASHBOARD_PAGE_URL) ||
            pathname.includes(HOST_ONBOARDING_PAGE_URL_PREFIX) ||
            pathname.includes(DENTIST_DASHBOARD_PAGE_URL)
        ) {
            placeholder = 'Search for offices by name and location';
        } else {
            placeholder = 'Search by name location or specialties';
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
                height={[HEADER_HEIGHT, '', 83]}
                bg={getHeaderBackgroundColor()}
                boxShadow={
                    onLandingPage ? 'none' : '0 2px 4px 0 rgba(0, 0, 0, 0.1);'
                }
                flex="0 0 auto"
                alignItems="center"
                justifyContent="center"
                style={{ zIndex: 600 }}
                position={position()}
            >
                <IntercomContainer auth={auth} pathname={pathname} />
                <LoginModal
                    toggleLoginModal={toggleLoginModal}
                    isLoginModalOpen={isLoginModalOpen}
                    customRedirect={customRedirect}
                />
                <Container
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Flex>
                        <Link mr={32} to={'/'} display="flex">
                            {/* mb is because the icon has extra space at the bottom */}
                            <Flex alignItems="center" height="100%" mb={6}>
                                <Icon
                                    type={getLogoType()}
                                    isButton={true}
                                    width="auto"
                                    height={[22, '', 37]}
                                />
                            </Flex>
                        </Link>

                        <Desktop>
                            {!onLandingPage && (
                                <SearchBox
                                    placeholder={placeholder}
                                    size="small"
                                />
                            )}
                        </Desktop>
                    </Flex>

                    <Flex alignItems="center">
                        {auth && isHost && (
                            <HeaderLinkContainer width={['', '', 'auto']}>
                                <HostLink
                                    auth={auth}
                                    desktopOnly={desktopOnly}
                                    onLandingPage={onLandingPage}
                                />
                            </HeaderLinkContainer>
                        )}
                        {/* hasUpdatedDentistBio will be true for those users who created a dentist profile on the website. Will be false for hosts who have not created their own dentist profile. Right now, the backend automatically creates a dentist profile for all new hosts. */}
                        {auth && this.props.hasUpdatedDentistBio && (
                            <HeaderLinkContainer width={['', '', 'auto']}>
                                <DentistLink
                                    auth={auth}
                                    desktopOnly={desktopOnly}
                                    onLandingPage={onLandingPage}
                                />
                            </HeaderLinkContainer>
                        )}
                        {/* Blog link doesn't show if user is both dentist and host on mobile */}
                        {!(!desktopOnly && isDentist && isHost) && (
                            <HeaderLinkContainer>
                                <Link
                                    isExternal
                                    target="_blank"
                                    to="http://blog.laguro.com/"
                                >
                                    <LinkButton>Blog</LinkButton>
                                </Link>
                            </HeaderLinkContainer>
                        )}

                        <ProfileButton
                            pathname={pathname}
                            isDentist={isDentist}
                            toggleLoginModal={toggleLoginModal}
                            onLogout={onLogout}
                            isHost={isHost}
                            auth={auth}
                            desktopOnly={desktopOnly}
                            hasUpdatedDentistBio={
                                this.props.hasUpdatedDentistBio
                            }
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
    isDentist: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    isHost: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    toggleLoginModal: PropTypes.func,
    pathname: PropTypes.string,
};

export default withScreenSizes(Header);
