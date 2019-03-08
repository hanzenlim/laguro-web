import React, { Component } from 'react';
import Intercom from 'react-intercom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SearchBox from '../SearchBox';
import { Icon } from '../../../components/';
import {
    Flex,
    Link,
    Container,
    Box,
    Responsive,
} from '@laguro/basic-components';
import LoginModal from '../Modals/LoginModal';
import { intercomKey } from '../../../config/keys';
import { withScreenSizes } from '../../../components/Responsive';
import { DentistLink, HostLink } from './Links';
import { LinkButton, getLinkTextColor } from './common';
import { HEADER_HEIGHT } from './constants';
import {
    getPageType,
    HOME_PAGE_TYPE,
    ALL_USER_PAGE_TYPE,
    PATIENT_PAGE_TYPE,
    DENTIST_AND_HOST_PAGE_TYPE,
} from '../../../util/urls';
import ProfileButton from './ProfileButton';

const { Desktop } = Responsive;

const StyledFlex = styled(Flex)`
    box-shadow: ${props => props.boxShadow};
`;

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

const HeaderLink = props => <Box {...props} ml={[10, '', 25]} />;

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
        } = this.props;

        let placeholder;

        const onLandingPage = pathname === '/';
        if (pathname.startsWith('/office')) {
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
            <StyledFlex
                is="header"
                width="100%"
                height={[HEADER_HEIGHT, '', 120]}
                bg={getHeaderBackgroundColor()}
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
                            type={getLogoType()}
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
                        <HeaderLink>
                            {auth && isHost && (
                                <HostLink
                                    auth={auth}
                                    desktopOnly={desktopOnly}
                                    onLandingPage={onLandingPage}
                                    textColor={getLinkTextColor()}
                                />
                            )}
                        </HeaderLink>
                        <HeaderLink>
                            {auth && isDentist && (
                                <DentistLink
                                    auth={auth}
                                    desktopOnly={desktopOnly}
                                    onLandingPage={onLandingPage}
                                    textColor={getLinkTextColor()}
                                />
                            )}
                        </HeaderLink>
                        {/* Blog link doesn't show if user is both dentist and host on mobile */}
                        {!(!desktopOnly && isDentist && isHost) && (
                            <HeaderLink>
                                <a
                                    ml="0px"
                                    target="_blank"
                                    href={'http://blog.laguro.com/'}
                                >
                                    <LinkButton
                                        textColor={getLinkTextColor()}
                                        fontSize={1}
                                        fontWeight="bold"
                                        type="ghost"
                                    >
                                        Blog
                                    </LinkButton>
                                </a>
                            </HeaderLink>
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
