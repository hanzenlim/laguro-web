import React, { Component, Fragment } from 'react';
import { Dropdown } from 'antd';
import {
    Text,
    Image,
    Theme as theme,
    Flex,
    Responsive,
} from '@laguro/basic-components';
import styled from 'styled-components';
import defaultUserImage from '../../../components/Image/defaultUserImage.svg';
import { Link } from '../../../components/index';
import { setImageSizeToUrl } from '../../../util/imageUtil';
import { StyledDropContainer, getLinkTextColor } from './common';
import {
    profileMenuSections,
    profileMenuTextToLinkTo,
} from '../../../util/menuItems';
import Menus from './Menus';
import history from '../../../history';
import { PATIENT_DASHBOARD_PAGE_URL } from '../../../util/urls';
import { ACCOUNT_SETTINGS_MENU_TEXT } from '../../../util/strings';

const { Mobile } = Responsive;

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
                    trigger={desktopOnly ? ['hover'] : ['click']}
                    getPopupContainer={() =>
                        document.getElementById('ProfileMenuContainer')
                    }
                >
                    {/* clicking on profile pic will redirect to patient dashboard */}
                    <Link
                        to={`${PATIENT_DASHBOARD_PAGE_URL}?selectedTab=${ACCOUNT_SETTINGS_MENU_TEXT}`}
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
                        <NavBarLink
                            onClick={this.openLoginForLogIn(matches)}
                            to={
                                matches
                                    ? `/login?redirectTo=${pathname}`
                                    : pathname
                            }
                        >
                            <Text
                                minWidth={54}
                                color={getLinkTextColor()}
                                fontSize={[0, '', 1]}
                                fontWeight="bold"
                                mb={[0, '', 4]}
                            >
                                Log in
                            </Text>
                        </NavBarLink>
                    )}
                </Mobile>
            </Fragment>
        );
    }
}

export default ProfileButton;
