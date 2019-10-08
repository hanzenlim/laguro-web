import React, { Fragment, useContext } from 'react';
import { Dropdown } from 'antd';
import { Image, Flex, Button, Text, Box } from '~/components';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { setImageSizeToUrl } from '~/util/imageUtil';
import { StyledDropContainer, getLinkTextColor } from './common';
import { profileMenuSections, profileMenuTextToLinkTo } from '~/util/menuItems';
import Menus from './Menus';
import { PATIENT_DASHBOARD_PAGE_URL_BASE } from '~/util/urls';
import { ACCOUNT_SETTINGS_MENU_TEXT } from '~/util/strings';
import { LoginContext, AppContext } from '../../appContext';

const ProfileImage = styled(Flex)`
    cursor: pointer;
`;

const StyledText = styled(Text)`
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    &:hover {
        border-color: #ffffff;
    }
`;

const ProfileButton = props => {
    const router = useRouter();
    const {
        auth,
        onLogout,
        isDentist,
        isHost,
        desktopOnly,
        toggleLoginModal,
    } = props;

    const { openLoginModal } = useContext(LoginContext);
    const { mounted } = useContext(AppContext);

    if (!mounted) return null;

    return auth ? (
        <Fragment>
            <Dropdown
                overlay={
                    <Menus
                        width={204}
                        isDentist={isDentist}
                        isHost={isHost}
                        onLogout={onLogout}
                        menuSections={profileMenuSections}
                        hasLogOut
                        hasBecomeAPersonaSection
                        menuTextToLinkTo={profileMenuTextToLinkTo} // e.g. {"Account settings": '/dashboard/patient?selectedTab=account_settings'}
                        hasUpdatedDentistBio={props.hasUpdatedDentistBio}
                    />
                }
                placement="bottomRight"
                trigger={
                    !desktopOnly ? ['click'] : ['hover'] // desktopOnly uses screen sizes to determine device, isMobileDevice uses window.orientation and userAgent
                }
                getPopupContainer={() =>
                    document.getElementById('ProfileMenuContainer')
                }
            >
                <Button
                    type="ghost"
                    height="auto"
                    onClick={() => {
                        if (desktopOnly)
                            router.push(
                                `${PATIENT_DASHBOARD_PAGE_URL_BASE}${ACCOUNT_SETTINGS_MENU_TEXT}`
                            );
                    }}
                >
                    <ProfileImage alignItems="center">
                        <Image
                            src={
                                auth.imageUrl
                                    ? setImageSizeToUrl(
                                          auth.imageUrl,
                                          desktopOnly ? 50 : 30
                                      )
                                    : '/static/images/defaultUserImage.svg'
                            }
                            alt="profile-image"
                            width={[30, '', 50]}
                            height={[30, '', 50]}
                            borderRadius={50}
                            data-cy="profile-button"
                        />
                    </ProfileImage>
                </Button>
            </Dropdown>
            <StyledDropContainer id="ProfileMenuContainer" />
        </Fragment>
    ) : (
        <Flex alignItems="center">
            <Button
                type="ghost"
                height="auto"
                mr={20}
                onClick={() => {
                    toggleLoginModal();
                }}
                textProps={{ fontWeight: 'bold' }}
            >
                <StyledText
                    color={getLinkTextColor(router.asPath)}
                    fontWeight="bold"
                    borderBottom={[0, '', '1px solid']}
                    borderColor={['', '', 'transparent']}
                    lineHeight="25px"
                    fontSize={[1, '', 3]}
                >
                    Log in
                </StyledText>
            </Button>
            <Button
                color={[getLinkTextColor(router.asPath), '', 'text.blue']}
                bg={['transparent', '', 'background.white']}
                height={['auto', '', '50px']}
                width="auto"
                px={[0, '', '46px']}
                style={
                    desktopOnly
                        ? {
                              borderRadius: 30,
                              boxShadow: '0 2px 7px 0 rgba(24, 54, 100, 0.39)',
                          }
                        : {
                              border: '0',
                              boxShadow: 'none',
                              textShadow: 'none',
                          }
                }
                onClick={() => openLoginModal({ mode: 'getName' })}
            >
                <Box fontSize={[1, '', 3]} display="inline" fontWeight="medium">
                    Sign up{' '}
                </Box>
                <Box fontSize={[1, '', 3]} display="inline" fontWeight="light">
                    — it&apos;s free!
                </Box>
            </Button>
        </Flex>
    );
};

export default ProfileButton;
