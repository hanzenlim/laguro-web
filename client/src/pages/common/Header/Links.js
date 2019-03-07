import React, { Component, Fragment } from 'react';
import { Dropdown } from 'antd';
import Menus from './Menus';
import { StyledDropContainer, LinkButton } from './common';
import { dentistMenuSections, hostMenuSections } from './constants';

class DentistLink extends Component {
    render() {
        const { desktopOnly, textColor } = this.props;
        return (
            <Fragment>
                <Dropdown
                    overlay={
                        <Menus
                            width={240}
                            menuSections={dentistMenuSections}
                            hasLogOut={false}
                        />
                    }
                    placement={'bottomRight'}
                    trigger={desktopOnly ? ['hover'] : ['click']}
                    getPopupContainer={() =>
                        document.getElementById('dentistLinkPopupContainer')
                    }
                >
                    <LinkButton textColor={textColor}>Dentists</LinkButton>
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
                    overlay={
                        <Menus
                            hasLogOut={false}
                            menuSections={hostMenuSections}
                        />
                    }
                    placement={'bottomRight'}
                    trigger={desktopOnly ? ['hover'] : ['click']}
                    getPopupContainer={() =>
                        document.getElementById('hostLinkPopupContainer')
                    }
                >
                    <LinkButton textColor={textColor}>Hosts</LinkButton>
                </Dropdown>
                <StyledDropContainer id="hostLinkPopupContainer" />
            </Fragment>
        );
    }
}

export { DentistLink, HostLink };
