import React, { Component, Fragment } from 'react';
import { Dropdown } from 'antd';
import { Box, Image, Flex, Button } from '../../../components';
import styled from 'styled-components';
import defaultUserImage from '../../../components/Image/defaultUserImage.svg';
import { Link, Responsive } from '../../../components/index';
import { setImageSizeToUrl } from '../../../util/imageUtil';
import { StyledDropContainer, LinkButton, HeaderLinkContainer } from './common';
import {
    profileMenuSections,
    profileMenuTextToLinkTo,
} from '../../../util/menuItems';
import Menus from './Menus';
import history from '../../../history';
import { PATIENT_DASHBOARD_PAGE_URL_BASE } from '../../../util/urls';
import { ACCOUNT_SETTINGS_MENU_TEXT } from '../../../util/strings';
import { isMobileDevice } from '../../../util/uiUtil';
import emitter from '../../../util/emitter';

const { TabletMobile } = Responsive;

const ProfileImage = styled(Flex)`
    cursor: pointer;
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
            isDentist,
            isHost,
            desktopOnly,
        } = this.props;

        return auth ? (
            <Fragment>
                <Dropdown
                    // to close dropdown when redirecting after clicking on menu item
                    key={history.location.key}
                    overlay={
                        <Menus
                            width={204}
                            isDentist={isDentist}
                            isHost={isHost}
                            onLogout={onLogout}
                            menuSections={profileMenuSections}
                            hasLogOut={true}
                            hasBecomeAPersonaSection={true}
                            menuTextToLinkTo={profileMenuTextToLinkTo} // e.g. {"Account settings": '/dashboard/patient?selectedTab=account_settings'}
                            hasUpdatedDentistBio={
                                this.props.hasUpdatedDentistBio
                            }
                        />
                    }
                    placement={'bottomRight'}
                    trigger={
                        isMobileDevice() ? ['click'] : ['hover'] // desktopOnly uses screen sizes to determine device, isMobileDevice uses window.orientation and userAgent
                    }
                    getPopupContainer={() =>
                        document.getElementById('ProfileMenuContainer')
                    }
                >
                    {/* clicking on profile pic will redirect to patient dashboard */}
                    <Link
                        to={
                            !isMobileDevice()
                                ? `${PATIENT_DASHBOARD_PAGE_URL_BASE}${ACCOUNT_SETTINGS_MENU_TEXT}`
                                : '#'
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
                                data-cy="profile-button"
                            />
                        </ProfileImage>
                    </Link>
                </Dropdown>
                <StyledDropContainer id="ProfileMenuContainer" />
            </Fragment>
        ) : (
            <Fragment>
                <TabletMobile>
                    {matches =>
                        matches ? (
                            <HeaderLinkContainer
                                display="flex"
                                alignItems="center"
                            >
                                <Link
                                    onClick={this.openLoginForLogIn(matches)}
                                    to={
                                        matches
                                            ? `/login?redirectTo=${pathname}`
                                            : pathname
                                    }
                                >
                                    <Button
                                        type="ghost"
                                        fontSize={1}
                                        fontWeight="bold"
                                        color="white"
                                    >
                                        Log in
                                    </Button>
                                </Link>
                                <Box display="inline" color="white" ml="22px">
                                    <Button
                                        type="ghost"
                                        onClick={() =>
                                            emitter.emit('loginModal', {
                                                mode: 'getName',
                                            })
                                        }
                                    >
                                        <Box
                                            color="white"
                                            fontSize={1}
                                            display="inline"
                                            fontWeight="medium"
                                        >
                                            Sign up{' '}
                                        </Box>
                                        <Box
                                            color="white"
                                            fontSize={1}
                                            display="inline"
                                            fontWeight="light"
                                        >
                                            — its free!
                                        </Box>
                                    </Button>
                                </Box>
                            </HeaderLinkContainer>
                        ) : (
                            <HeaderLinkContainer
                                display="flex"
                                alignItems="center"
                            >
                                <Link
                                    mr="20px"
                                    onClick={this.openLoginForLogIn(matches)}
                                    to={
                                        matches
                                            ? `/login?redirectTo=${pathname}`
                                            : pathname
                                    }
                                >
                                    <LinkButton
                                        textProps={{
                                            fontWeight: 'bold',
                                            fontSize: '18px',
                                        }}
                                    >
                                        Log in
                                    </LinkButton>
                                </Link>
                                <Box display="inline">
                                    <Button
                                        color="text.blue"
                                        bg="background.white"
                                        height="50px"
                                        width="auto"
                                        px="46px"
                                        style={{
                                            borderRadius: 30,
                                            boxShadow:
                                                '0 2px 7px 0 rgba(24, 54, 100, 0.39)',
                                        }}
                                        onClick={() =>
                                            emitter.emit('loginModal', {
                                                mode: 'getName',
                                            })
                                        }
                                    >
                                        <Box
                                            fontSize={3}
                                            display="inline"
                                            fontWeight="medium"
                                        >
                                            Sign up{' '}
                                        </Box>
                                        <Box
                                            fontSize={3}
                                            display="inline"
                                            fontWeight="light"
                                        >
                                            — its free!
                                        </Box>
                                    </Button>
                                </Box>
                            </HeaderLinkContainer>
                        )
                    }
                </TabletMobile>
            </Fragment>
        );
    }
}

export default ProfileButton;
