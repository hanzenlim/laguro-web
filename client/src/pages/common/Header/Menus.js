import React, { Fragment } from 'react';
import { Menu } from 'antd';
import styled from 'styled-components';
import { space, width, borderBottom, borderColor } from 'styled-system';
import { Box, Text, Grid } from '@laguro/basic-components';
import _isEmpty from 'lodash/isEmpty';
import _cloneDeep from 'lodash/cloneDeep';
import { Link } from '../../../components/index';
import {
    LOG_OUT_MENU_TEXT,
    BECOME_A_DENTIST_MENU_TEXT,
    BECOME_A_HOST_MENU_TEXT,
    LAGURO_TREATMENT_MODULE_MENU_TEXT,
    CALENDAR_MENU_TEXT,
} from '../../../util/strings';
import { withScreenSizes } from '../../../components/Responsive';

export const StyledMenu = styled(Menu)`
    &&& {
        border-radius: 0;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
        ${space};
        @media (min-width: ${props => props.theme.breakpoints[1]}) {
            ${width}
        }
    }

    .ant-dropdown-menu-item {
        ${borderBottom};
        ${borderColor};

        &:last-of-type {
            border: none;
        }
    }

    .ant-dropdown-menu-item-divider {
        display: none;

        @media (min-width: ${props => props.theme.breakpoints[1]}) {
            display: list-item;
        }
    }
`;

export const StyledMenuItem = styled(Menu.Item)`
    &&&& {
        margin: 0;

        @media (min-width: ${props => props.theme.breakpoints[1]}) {
            margin-bottom: 2px;
            margin-top: 0;

            a {
                ${space};
            }
        }
        // to remove blue background
        background-color: unset;
    }
`;

export const StyledMenuDivider = styled(Menu.Divider)`
    &&& {
        margin-top: 2px;
        margin-bottom: 0;
        border-bottom: 1px solid;
        border-color: #dbdbdb;
    }
`;

const renderText = text => {
    if (text === BECOME_A_DENTIST_MENU_TEXT) {
        return (
            <Fragment>
                <Text is="span" color="text.black" fontSize={0}>
                    Become a{' '}
                </Text>
                <Text
                    is="span"
                    fontWeight="medium"
                    color="text.black"
                    fontSize={0}
                >
                    dentist
                </Text>
            </Fragment>
        );
    } else if (text === BECOME_A_HOST_MENU_TEXT) {
        return (
            <Fragment>
                <Text is="span" color="text.black" fontSize={0}>
                    Become a{' '}
                </Text>
                <Text
                    is="span"
                    fontWeight="medium"
                    color="text.black"
                    fontSize={0}
                >
                    host
                </Text>
            </Fragment>
        );
    } else if (text === LAGURO_TREATMENT_MODULE_MENU_TEXT) {
        return (
            <Text color="text.blue" fontSize={0}>
                {text}
            </Text>
        );
    }
    return (
        <Text color="text.black" fontSize={0}>
            {text}
        </Text>
    );
};

const Menus = props => {
    const {
        isHost,
        onLogout,
        menuSections,
        hasLogOut,
        hasBecomeAPersonaSection,
        desktopOnly, // from withScreenSizes
        tabletMobileOnly,
    } = props;

    const menuPx = 21;
    const mobileBorderProps = {
        borderBottom: ['1px solid', '', 'none'],
        borderColor: 'divider.gray',
    };

    const becomeAPersonaMenuTexts = [];
    if (!props.hasUpdatedDentistBio) {
        becomeAPersonaMenuTexts.push(BECOME_A_DENTIST_MENU_TEXT);
    }
    if (!isHost) {
        becomeAPersonaMenuTexts.push(BECOME_A_HOST_MENU_TEXT);
    }
    const dividerMarginTop = 18;

    const modifiedMenuSections = _cloneDeep(menuSections);
    if (hasBecomeAPersonaSection && !_isEmpty(becomeAPersonaMenuTexts)) {
        modifiedMenuSections.push({
            dividerText: '',
            menuTexts: becomeAPersonaMenuTexts,
        });
    }

    const renderDivider = ({ text, isLong }) => {
        const mobileTextComponentHeight = _isEmpty(text) ? 10 : 30;
        const textComponent = (
            <Text
                fontWeight={['medium', '', 'bold']}
                fontSize={[0, '', 10]}
                px={[menuPx, '', 0]}
                color="#c9c7c9"
                height={[mobileTextComponentHeight, '', 12]}
                lineHeight={['30px', '', '12px']}
                textAlign={['left', '', 'center']}
                bg={['#f5f5f5', '', 'unset']}
                {...mobileBorderProps}
            >
                {text}
            </Text>
        );

        return desktopOnly ? (
            <Box px={isLong ? 0 : menuPx} mt={[0, '', dividerMarginTop]}>
                {!_isEmpty(text) ? (
                    <Grid gridColumnGap="7px" gridTemplateColumns="1fr 1fr 1fr">
                        <Box
                            borderColor="divider.gray"
                            borderBottom="solid 1px"
                            height={7}
                        />
                        {textComponent}
                        <Box
                            borderColor="divider.gray"
                            borderBottom="solid 1px"
                            height={7}
                        />
                    </Grid>
                ) : (
                    <Box
                        borderColor="divider.gray"
                        borderBottom="solid 1px"
                        height={7}
                    />
                )}
            </Box>
        ) : (
            textComponent
        );
    };

    const menuItemPadding = ['18px 25px', '', `10px ${menuPx}px`];

    return (
        <StyledMenu
            width={props.width}
            pt={[0, '', 1]}
            pb={[0, '', 20]}
            {...mobileBorderProps}
        >
            {modifiedMenuSections.map((menuSection, index) => [
                index !== 0 &&
                    renderDivider({
                        text: menuSection.dividerText,
                        isLong: menuSection.isLong,
                    }),
                menuSection.menuTexts
                    // do not show dentist calendar on mobile
                    .filter(
                        menuText =>
                            !(
                                tabletMobileOnly &&
                                menuText === CALENDAR_MENU_TEXT
                            )
                    )
                    .map(menuText => {
                        // ltm link should open in another tab, and it's an external link
                        const linkProps =
                            menuText === LAGURO_TREATMENT_MODULE_MENU_TEXT
                                ? { isExternal: true, target: '_blank' }
                                : {};

                        return [
                            <StyledMenuItem p={menuItemPadding}>
                                <Link
                                    {...linkProps}
                                    // menuTextToLink:
                                    //      {"Account settings": '/dashboard/patient?selectedTab=account_settings'}
                                    to={props.menuTextToLinkTo[menuText]}
                                >
                                    {renderText(menuText)}
                                </Link>
                            </StyledMenuItem>,
                            !desktopOnly && <StyledMenuDivider />,
                        ];
                    }),
            ])}

            {hasLogOut && [
                desktopOnly ? (
                    <Box
                        mt={[0, '', dividerMarginTop]}
                        borderBottom="solid 1px #e6e6e6"
                        height={7}
                    />
                ) : (
                    renderDivider('')
                ),
                <StyledMenuItem p={menuItemPadding}>
                    <Link
                        data-cy="logout-link"
                        to={props.menuTextToLinkTo[LOG_OUT_MENU_TEXT]}
                        onClick={onLogout}
                    >
                        <Text color={'text.blue'} fontSize={0}>
                            {LOG_OUT_MENU_TEXT}
                        </Text>
                    </Link>
                </StyledMenuItem>,
            ]}
        </StyledMenu>
    );
};

export default withScreenSizes(Menus);
