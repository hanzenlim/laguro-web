import React, { Fragment } from 'react';
import { Dropdown } from 'antd';
import Menus from './Menus';
import { StyledDropContainer, LinkButton } from './common';
import {
    dentistMenuSections,
    hostMenuSections,
    dentistMenuTextToLinkTo,
    hostMenuTextToLinkTo,
} from '~/util/menuItems';
import { Link } from '~/components';
import {
    DENTIST_DASHBOARD_PAGE_URL_BASE,
    HOST_DASHBOARD_PAGE_URL_BASE,
} from '~/util/urls';
import {
    PROFILE_SETTINGS_MENU_TEXT,
    MY_OFFICES_MENU_TEXT,
} from '~/util/strings';

const DentistLink = ({ desktopOnly, pathname }) => (
    <Fragment>
        <Dropdown
            // to close dropdown when redirecting after clicking on menu item
            // TO FIX:
            // key={history.location.key}
            overlay={
                <Menus
                    width={240}
                    menuSections={dentistMenuSections}
                    hasLogOut={false}
                    // e.g. {"Account Settings": '/dashboard/patient?selectedTab=account_settings'}
                    menuTextToLinkTo={dentistMenuTextToLinkTo}
                />
            }
            placement="bottomRight"
            trigger={!desktopOnly ? ['click'] : ['hover']}
            getPopupContainer={() =>
                document.getElementById('dentistLinkPopupContainer')
            }
        >
            {/* clicking on Dentists link will redirect to dentist dashboard */}
            <Link
                to={
                    desktopOnly
                        ? `${DENTIST_DASHBOARD_PAGE_URL_BASE}${PROFILE_SETTINGS_MENU_TEXT}`
                        : '#'
                }
                prefetch={false}
            >
                {/* TODO: Do not pass pathname */}
                <LinkButton pathname={pathname}>Dentists</LinkButton>
            </Link>
        </Dropdown>
        <StyledDropContainer id="dentistLinkPopupContainer" />
    </Fragment>
);

const HostLink = ({ desktopOnly, pathname }) => (
    <Fragment>
        <Dropdown
            // to close dropdown when redirecting after clicking on menu item
            // TO FIX:
            // key={history.location.key}
            overlay={
                <Menus
                    hasLogOut={false}
                    menuSections={hostMenuSections}
                    // e.g. {"Account Settings": '/dashboard/patient?selectedTab=account_settings'}
                    menuTextToLinkTo={hostMenuTextToLinkTo}
                />
            }
            placement="bottomRight"
            trigger={!desktopOnly ? ['click'] : ['hover']}
            getPopupContainer={() =>
                document.getElementById('hostLinkPopupContainer')
            }
        >
            {/* clicking on Hosts link will redirect to host dashboard */}
            <Link
                to={
                    desktopOnly
                        ? `${HOST_DASHBOARD_PAGE_URL_BASE}${MY_OFFICES_MENU_TEXT}`
                        : '#'
                }
                prefetch={false}
            >
                {/* TODO: Do not pass pathname */}
                <LinkButton pathname={pathname}>Hosts</LinkButton>
            </Link>
        </Dropdown>
        <StyledDropContainer id="hostLinkPopupContainer" />
    </Fragment>
);

export { DentistLink, HostLink };
