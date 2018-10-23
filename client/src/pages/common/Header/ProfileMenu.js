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

    // Menu link for host
    if (isHost) {
        return (
            <StyledMenu
                p={['18px 16px', '', '8px 16px']}
                borderBottom={['1px solid', '', 'none']}
                borderColor="divider.gray"
                {...rest}
            >
                <Menu.Item>
                    <Link to={'/profile?selectedTab=my_profile'}>
                        <Text color="text.black" fontSize={2}>
                            my page
                        </Text>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to={'/profile?selectedTab=my_listings'}>
                        <Text color="text.black" fontSize={2}>
                            my listings
                        </Text>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to={'/profile?selectedTab=my_bookings'}>
                        <Text color="text.black" fontSize={2}>
                            bookings/appointments
                        </Text>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to={'/profile?selectedTab=payments'}>
                        <Text color="text.black" fontSize={2}>
                            payments
                        </Text>
                    </Link>
                </Menu.Item>

                <Menu.Item>
                    <Link to={'/profile?selectedTab=balance'}>
                        <Text color="text.black" fontSize={2}>
                            laguro balance
                        </Text>
                    </Link>
                </Menu.Item>

                <Menu.Item>
                    <Link to={'/office/search'}>
                        <Text color="text.blue" fontWeight="bold" fontSize={2}>
                            search for chairs
                        </Text>
                    </Link>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item>
                    <Link to={'#'} onClick={logout}>
                        <Text color="text.black" fontSize={2}>
                            log out
                        </Text>
                    </Link>
                </Menu.Item>
            </StyledMenu>
        );
    }

    if (isDentist) {
        return (
            <StyledMenu {...rest}>
                <Menu.Item>
                    <Link to={'/profile?selectedTab=my_profile'}>
                        <Text color="text.black" fontSize={2}>
                            my page
                        </Text>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to={'/profile?selectedTab=my_bookings'}>
                        <Text color="text.black" fontSize={2}>
                            bookings/appointments
                        </Text>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to={'/profile?selectedTab=payments'}>
                        <Text color="text.black" fontSize={2}>
                            payments
                        </Text>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to={'/profile?selectedTab=balance'}>
                        <Text color="text.black" fontSize={2}>
                            laguro balance
                        </Text>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to={'/office/search'}>
                        <Text color="text.blue" fontWeight="bold" fontSize={2}>
                            search for chairs
                        </Text>
                    </Link>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item>
                    <Link to={'#'} onClick={logout}>
                        <Text color="text.black" fontSize={2}>
                            log out
                        </Text>
                    </Link>
                </Menu.Item>
            </StyledMenu>
        );
    }

    // Menu link for patient
    return (
        <StyledMenu {...rest}>
            <Menu.Item>
                <Link to={'/profile?selectedTab=my_profile'}>
                    <Text color="text.black" fontSize={2}>
                        my page
                    </Text>
                </Link>
            </Menu.Item>

            <Menu.Item>
                <Link to={'/profile?selectedTab=my_appointments'}>
                    <Text color="text.black" fontSize={2}>
                        my appointments
                    </Text>
                </Link>
            </Menu.Item>
            <Menu.Divider />

            <Menu.Item>
                <Link to={'#'} onClick={logout}>
                    <Text color="text.blue" fontSize={2}>
                        log out
                    </Text>
                </Link>
            </Menu.Item>
        </StyledMenu>
    );
};

export default ProfileMenu;
