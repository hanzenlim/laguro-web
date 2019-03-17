import React, { Component, Fragment } from 'react';
import { Dropdown } from 'antd';
import { Image, Flex } from '@laguro/basic-components';
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

const { Mobile } = Responsive;

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
                        />
                    }
                    placement={'bottomRight'}
                    trigger={
                        desktopOnly && !isMobileDevice() ? ['hover'] : ['click'] // desktopOnly uses screen sizes to determine device, isMobileDevice uses window.orientation and userAgent
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
                                ml={[17, '', 27]}
                                data-cy="profile-button"
                            />
                        </ProfileImage>
                    </Link>
                </Dropdown>
                <StyledDropContainer id="ProfileMenuContainer" />
            </Fragment>
        ) : (
            <Fragment>
                <Mobile>
                    {matches => (
                        <HeaderLinkContainer>
                            <Link
                                onClick={this.openLoginForLogIn(matches)}
                                to={
                                    matches
                                        ? `/login?redirectTo=${pathname}`
                                        : pathname
                                }
                            >
                                <LinkButton textProps={{ fontWeight: 'bold' }}>
                                    Log in
                                </LinkButton>
                            </Link>
                        </HeaderLinkContainer>
                    )}
                </Mobile>
            </Fragment>
        );
    }
}

export default ProfileButton;
