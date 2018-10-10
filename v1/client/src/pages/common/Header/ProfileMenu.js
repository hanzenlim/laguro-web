import React from 'react';
import { Menu } from 'antd';
import styled from 'styled-components';

import { Link, Text } from '../../../components';

const StyledMenu = styled(Menu)`
    && {
        border-radius: 0;
    }

    .ant-dropdown-menu-item {
        padding: 8px 16px;
    }
`;

const ProfileMenu = props => {
    const { logout, isDentist, isHost, ...rest } = props;

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

    // Menu link for host
    if (isHost) {
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
                        <Text color="text.blue" fontSize={2}>
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
