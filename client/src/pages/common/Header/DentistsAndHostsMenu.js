import React from 'react';
import { Menu } from 'antd';
import { Link, Text } from '../../../components';
import { withScreenSizes } from '../../../components/Responsive';
import {
    ADD_A_NEW_OFFICE_MENU,
    BECOME_A_HOST_MENU,
    MY_CALENDAR_MENU,
} from '../../../util/strings';
import { StyledMenu } from './ProfileMenu';

const DentistsAndHostsMenu = props => {
    const { isDentist, isHost, ...rest } = props;

    const hostLink = isHost ? ADD_A_NEW_OFFICE_MENU : BECOME_A_HOST_MENU;

    const hostMenuItems = [MY_CALENDAR_MENU, hostLink];

    const dentistMenuItems = [MY_CALENDAR_MENU, hostLink];

    const itemLinkMap = {
        [ADD_A_NEW_OFFICE_MENU]: '/host-onboarding/add-office',
        [BECOME_A_HOST_MENU]: '/host-onboarding/add-office',
        [MY_CALENDAR_MENU]: '/dentist-profile',
    };

    let menuItems;
    if (isHost) {
        menuItems = hostMenuItems;
    } else {
        menuItems = dentistMenuItems;
    }

    return (
        <StyledMenu
            p={['18px 25px', '', '8px 16px']}
            borderBottom={['1px solid', '', 'none']}
            borderColor="divider.gray"
            {...rest}
        >
            {menuItems.map(item => (
                <Menu.Item>
                    <Link to={itemLinkMap[item]}>
                        <Text color="text.black" fontSize={1}>
                            {item}
                        </Text>
                    </Link>
                </Menu.Item>
            ))}
        </StyledMenu>
    );
};

export default withScreenSizes(DentistsAndHostsMenu);
