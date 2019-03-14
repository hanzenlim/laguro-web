import React, { Component, Fragment } from 'react';
import { Dropdown } from 'antd';
import Menus from './Menus';
import { StyledDropContainer, LinkButton } from './common';
import {
    dentistMenuSections,
    hostMenuSections,
    dentistMenuTextToLinkTo,
    hostMenuTextToLinkTo,
} from '../../../util/menuItems';
import history from '../../../history';
import { Link } from '../../../components';
import {
    DENTIST_DASHBOARD_PAGE_URL,
    HOST_DASHBOARD_PAGE_URL,
} from '../../../util/urls';
import {
    PROFILE_SETTINGS_MENU_TEXT,
    MY_OFFICES_MENU_TEXT,
} from '../../../util/strings';

class DentistLink extends Component {
    render() {
        const { desktopOnly, textColor } = this.props;
        return (
            <Fragment>
                <Dropdown
                    // to close dropdown when redirecting after clicking on menu item
                    key={history.location.key}
                    overlay={
                        <Menus
                            width={240}
                            menuSections={dentistMenuSections}
                            hasLogOut={false}
                            // e.g. {"Account Settings": '/dashboard/patient?selectedTab=account_settings'}
                            menuTextToLinkTo={dentistMenuTextToLinkTo}
                        />
                    }
                    placement={'bottomRight'}
                    trigger={desktopOnly ? ['hover'] : ['click']}
                    getPopupContainer={() =>
                        document.getElementById('dentistLinkPopupContainer')
                    }
                >
                    {/* clicking on Dentists link will redirect to dentist dashboard */}
                    <Link
                        to={`${DENTIST_DASHBOARD_PAGE_URL}?selectedTab=${PROFILE_SETTINGS_MENU_TEXT}`}
                    >
                        <LinkButton textColor={textColor}>Dentists</LinkButton>
                    </Link>
                </Dropdown>
                <StyledDropContainer id="dentistLinkPopupContainer" />
            </Fragment>
        );
    }
}

class HostLink extends Component {
    render() {
        const { desktopOnly, textColor } = this.props;
        return (
            <Fragment>
                <Dropdown
                    // to close dropdown when redirecting after clicking on menu item
                    key={history.location.key}
                    overlay={
                        <Menus
                            hasLogOut={false}
                            menuSections={hostMenuSections}
                            // e.g. {"Account Settings": '/dashboard/patient?selectedTab=account_settings'}
                            menuTextToLinkTo={hostMenuTextToLinkTo}
                        />
                    }
                    placement={'bottomRight'}
                    trigger={desktopOnly ? ['hover'] : ['click']}
                    getPopupContainer={() =>
                        document.getElementById('hostLinkPopupContainer')
                    }
                >
                    {/* clicking on Hosts link will redirect to host dashboard */}
                    <Link
                        to={`${HOST_DASHBOARD_PAGE_URL}?selectedTab=${MY_OFFICES_MENU_TEXT}`}
                    >
                        <LinkButton textColor={textColor}>Hosts</LinkButton>
                    </Link>
                </Dropdown>
                <StyledDropContainer id="hostLinkPopupContainer" />
            </Fragment>
        );
    }
}

export { DentistLink, HostLink };
