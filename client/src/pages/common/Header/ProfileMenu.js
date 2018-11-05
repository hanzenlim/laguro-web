import React from 'react';
import { Menu } from 'antd';
import styled from 'styled-components';
import { space, borderBottom, borderColor } from 'styled-system';

import { Link, Text } from '../../../components';
import { withScreenSizes } from '../../../components/Responsive';
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
    const { logout, isDentist, isHost, desktopOnly, ...rest } = props;

    const hostLink = isHost ? 'add a new office' : 'become a host';

    const hostMenuItems = desktopOnly
        ? [
              'my page',
              'my listings',
              'bookings/appointments',
              'payments',
              'laguro balance',
              'search for chairs',
          ]
        : [
              'home',
              'my page',
              'my listings',
              'bookings/appointments',
              'payments',
              'laguro balance',
              'search for chairs',
              hostLink,
          ];

    const dentistMenuItems = desktopOnly
        ? [
              'my page',
              'bookings/appointments',
              'payments',
              'laguro balance',
              'search for chairs',
          ]
        : [
              'home',
              'my page',
              'bookings/appointments',
              'payments',
              'laguro balance',
              'search for chairs',
              hostLink,
          ];

    const patientMenuItems = desktopOnly
        ? ['my page', 'my appointments']
        : ['home', 'my page', 'my appointments', hostLink];

    const boldedMenuItems = ['search for chairs'];

    const blueMenuItems = ['search for chairs'];
    if (!isHost && !isDentist) {
        blueMenuItems.push('log out');
    }

    const itemLinkMap = {
        home: '/',
        'my page': '/profile?selectedTab=my_profile',
        'my listings': '/profile?selectedTab=my_listings',
        'bookings/appointments': '/profile?selectedTab=my_bookings',
        payments: '/profile?selectedTab=payments',
        'laguro balance': '/profile?selectedTab=balance',
        'search for chairs': '/office/search',
        'log out': '#',
        'my appointments': '/profile?selectedTab=my_appointments',
        'add a new office': '/host-onboarding/add-office',
        'become a host': '/host-onboarding/add-office',
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

export default withScreenSizes(ProfileMenu);
