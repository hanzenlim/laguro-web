import React, { Component, Fragment } from 'react';
import { Icon } from '../../../components/';
import { Dropdown } from 'antd';
import {
    Text,
    Image,
    Link,
    Theme as theme,
    Flex,
    Responsive,
} from '@laguro/basic-components';
import defaultUserImage from '../../../components/Image/defaultUserImage.svg';
import { setImageSizeToUrl } from '../../../util/imageUtil';
import { StyledDropContainer } from './common';
import { profileMenuSections } from './constants';
import Menus from './Menus';
import styled from 'styled-components';

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

const StyledDropdown = styled(Dropdown)``;

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
                <StyledDropdown
                    overlay={
                        <Menus
                            width={204}
                            isDentist={isDentist}
                            isHost={isHost}
                            onLogout={logout}
                            menuSections={profileMenuSections}
                            hasLogOut={true}
                            hasBecomeAPersonaSection={true}
                        />
                    }
                    placement={'bottomRight'}
                    trigger={desktopOnly ? ['hover'] : ['click']}
                    getPopupContainer={() =>
                        document.getElementById('ProfileMenuContainer')
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
                        <Icon
                            ml={4}
                            transform="scale(0.8)"
                            fill={onLandingPage ? '#FFF' : '#3481F8'}
                            type="downArrow"
                        />
                    </ProfileImage>
                </StyledDropdown>
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

export default ProfileButton;
