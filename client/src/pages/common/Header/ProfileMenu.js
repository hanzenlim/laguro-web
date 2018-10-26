import React from 'react';
import { Menu } from 'antd';
import styled from 'styled-components';
import { space, borderBottom, borderColor } from 'styled-system';

import { Link, Text } from '../../../components';
import theme from '../../../components/theme';

const StyledMenu = styled(Menu)`
    && {
        border-radius: 0;
    }

    .ant-dropdown-menu-item {
        ${space};
        ${borderBottom};
        ${borderColor};

        &:last-of-type {
            border: none;
        }
    }

    .ant-dropdown-menu-item-divider {
        display: none;

        @media (min-width: ${theme.breakpoints[1]}) {
            display: list-item;
        }
    }
`;

const ProfileMenu = props => {
    const { logout, isDentist, isHost, ...rest } = props;

    const hostMenuItems = [
        'my page',
        'my listings',
        'bookings/appointments',
        'payments',
        'laguro balance',
        'search for chairs',
    ];

    const dentistMenuItems = [
        'my page',
        'bookings/appointments',
        'payments',
        'laguro balance',
        'search for chairs',
    ];

    const patientMenuItems = ['my page', 'my appointments'];

    const boldedMenuItems = ['search for chairs'];

    const blueMenuItems = ['search for chairs'];
    if (!isHost && !isDentist) {
        blueMenuItems.push('log out');
    }

    const itemLinkMap = {
        'my page': '/profile?selectedTab=my_profile',
        'my listings': '/profile?selectedTab=my_listings',
        'bookings/appointments': '/profile?selectedTab=my_bookings',
        payments: '/profile?selectedTab=payments',
        'laguro balance': '/profile?selectedTab=balance',
        'search for chairs': '/office/search',
        'log out': '#',
        'my appointments': '/profile?selectedTab=my_appointments',
    };

    let menuItems;
    if (isHost) {
        menuItems = hostMenuItems;
    } else if (isDentist) {
        menuItems = dentistMenuItems;
    } else {
        menuItems = patientMenuItems;
    }

    return (
        <StyledMenu
            p={['18px 16px', '', '8px 16px']}
            borderBottom={['1px solid', '', 'none']}
            borderColor="divider.gray"
            {...rest}
        >
            {menuItems.map(item => (
                <Menu.Item>
                    <Link to={itemLinkMap[item]}>
                        <Text
                            color={
                                blueMenuItems.includes(item)
                                    ? 'text.blue'
                                    : 'text.black'
                            }
                            fontSize={2}
                            fontWeight={
                                boldedMenuItems.includes(item)
                                    ? 'bold'
                                    : 'regular'
                            }
                        >
                            {item}
                        </Text>
                    </Link>
                </Menu.Item>
            ))}
            <Menu.Divider />
            <Menu.Item>
                <Link to={'#'} onClick={logout}>
                    <Text
                        color={
                            blueMenuItems.includes('log out')
                                ? 'text.blue'
                                : 'text.black'
                        }
                        fontSize={2}
                    >
                        log out
                    </Text>
                </Link>
            </Menu.Item>
        </StyledMenu>
    );
};

export default ProfileMenu;
