import React from 'react';
import { Menu } from 'antd';
import styled from 'styled-components';
import { space, borderBottom, borderColor } from 'styled-system';

import { Link, Text } from '../../../components';
import { withScreenSizes } from '../../../components/Responsive';
import theme from '../../../components/theme';
import {
    HOME_MENU,
    MY_PAGE_MENU,
    MY_ACCOUNT_MENU,
    MY_DOCUMENTS_MENU,
    MY_PROFILE_MENU,
    MY_APPOINTMENTS_MENU,
    PAYMENT_HISTORY_MENU,
    LAGURO_BALANCE_MENU,
    PREVIEW_PUBLIC_PROFILE_MENU,
    MY_LISTINGS_MENU,
    MY_BOOKINGS_MENU,
    MY_PATIENTS_MENU,
    PROCEDURE_CONSENT_MENU,
    LOG_OUT_MENU,
    SEARCH_FOR_CHAIRS_MENU,
    ADD_A_NEW_OFFICE_MENU,
    BECOME_A_HOST_MENU,
} from '../../../util/strings';

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

    const hostLink = isHost ? ADD_A_NEW_OFFICE_MENU : BECOME_A_HOST_MENU;

    const hostMenuItems = desktopOnly
        ? [
              MY_PAGE_MENU,
              MY_LISTINGS_MENU,
              LAGURO_BALANCE_MENU,
              SEARCH_FOR_CHAIRS_MENU,
          ]
        : [
              HOME_MENU,
              MY_ACCOUNT_MENU,
              MY_PROFILE_MENU,
              MY_DOCUMENTS_MENU,
              MY_APPOINTMENTS_MENU,
              MY_BOOKINGS_MENU,
              MY_LISTINGS_MENU,
              LAGURO_BALANCE_MENU,
              SEARCH_FOR_CHAIRS_MENU,
              hostLink,
          ];

    const dentistMenuItems = desktopOnly
        ? [
              MY_PAGE_MENU,
              MY_BOOKINGS_MENU,
              PAYMENT_HISTORY_MENU,
              LAGURO_BALANCE_MENU,
              SEARCH_FOR_CHAIRS_MENU,
          ]
        : [
              HOME_MENU,
              MY_ACCOUNT_MENU,
              MY_PROFILE_MENU,
              MY_DOCUMENTS_MENU,
              MY_PATIENTS_MENU,
              MY_APPOINTMENTS_MENU,
              MY_BOOKINGS_MENU,
              PAYMENT_HISTORY_MENU,
              LAGURO_BALANCE_MENU,
              PREVIEW_PUBLIC_PROFILE_MENU,
              SEARCH_FOR_CHAIRS_MENU,
              hostLink,
          ];

    const patientMenuItems = desktopOnly
        ? [MY_PAGE_MENU, MY_APPOINTMENTS_MENU]
        : [
              HOME_MENU,
              MY_ACCOUNT_MENU,
              MY_DOCUMENTS_MENU,
              MY_APPOINTMENTS_MENU,
              PAYMENT_HISTORY_MENU,
              PROCEDURE_CONSENT_MENU,
              hostLink,
          ];

    const itemLinkMap = {
        [HOME_MENU]: '/',
        [MY_PAGE_MENU]: '/profile?selectedTab=my_profile',
        [MY_LISTINGS_MENU]: '/profile?selectedTab=my_listings',
        [MY_BOOKINGS_MENU]: '/profile?selectedTab=my_bookings',
        [PAYMENT_HISTORY_MENU]: '/profile?selectedTab=payments',
        [LAGURO_BALANCE_MENU]: '/profile?selectedTab=balance',
        [SEARCH_FOR_CHAIRS_MENU]: '/office/search',
        [LOG_OUT_MENU]: '#',
        [MY_APPOINTMENTS_MENU]: '/profile?selectedTab=my_appointments',
        [ADD_A_NEW_OFFICE_MENU]: '/host-onboarding/add-office',
        [BECOME_A_HOST_MENU]: '/host-onboarding/add-office',
        [MY_ACCOUNT_MENU]: '/profile?selectedTab=my_profile',
        [MY_DOCUMENTS_MENU]: '/profile?selectedTab=my_documents',
        [MY_PROFILE_MENU]: '/profile?selectedTab=dentist_profile',
        [PREVIEW_PUBLIC_PROFILE_MENU]: '/profile?selectedTab=public_profile',
        [MY_PATIENTS_MENU]: '/profile?selectedTab=my_patients',
        [PROCEDURE_CONSENT_MENU]: '/profile?selectedTab=my_treatments',
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
            <Menu.Divider />
            <Menu.Item>
                <Link to={itemLinkMap[LOG_OUT_MENU]} onClick={logout}>
                    <Text color={'text.blue'} fontSize={1}>
                        {LOG_OUT_MENU}
                    </Text>
                </Link>
            </Menu.Item>
        </StyledMenu>
    );
};

export default withScreenSizes(ProfileMenu);
