import React, { Component, Fragment } from 'react';
import { Container, Box, Text, Card, Truncate } from '@laguro/basic-components';
import queryString from 'query-string';
import {
    MY_OFFICES_MENU_TEXT,
    LAGURO_BALANCE_MENU_TEXT,
    ADD_A_NEW_OFFICE_MENU_TEXT,
    HOST,
} from '../../util/strings';
import { hostDashboardMenuTexts } from '../../util/menuItems';
import { getKeyFromText } from '../Dashboard/utils';
import { addSearchParams, redirect } from '../../history';
import {
    DashboardGrid,
    StyledDashboardMenu,
    StyledDashboardMenuItem,
} from '../Dashboard/common';
import HostListing from '../common/HostListings/index';
import BalanceHistory from '../common/BalanceHistory/index';
import { HOST_ONBOARDING_PAGE_URL_PREFIX } from '../../util/urls';
import { Responsive } from '../../components/index';

const { TabletMobile, Desktop } = Responsive;

const menuTextToDescription = {
    [MY_OFFICES_MENU_TEXT]: 'View and add listings to your offices',
    [LAGURO_BALANCE_MENU_TEXT]: 'View your current account balance',
    [ADD_A_NEW_OFFICE_MENU_TEXT]: 'Create a new office and listings',
};

class HostDashboardPageView extends Component {
    handleClick = ({ key }) => {
        // to allow browser back from calendar page back to dashboard page. when clicking on these menus, only redirect and do not add searchParams
        if (key === ADD_A_NEW_OFFICE_MENU_TEXT) {
            redirect({
                url: `${HOST_ONBOARDING_PAGE_URL_PREFIX}/add-office`,
            });
            return null;
        }

        // add new searchParams to render next panel
        const params = queryString.parse(window.location.search);
        const newParams = {
            ...params,
            selectedTab: getKeyFromText(key),
        };
        addSearchParams(newParams);
    };

    renderPanel = key => {
        let panelContent;

        switch (key) {
            case MY_OFFICES_MENU_TEXT:
                panelContent = <HostListing />;
                break;
            case LAGURO_BALANCE_MENU_TEXT:
                panelContent = (
                    <BalanceHistory userId={this.props.userId} persona={HOST} />
                );
                break;
            default:
        }

        return (
            <Card>
                <Desktop>
                    <Box
                        borderBottom="solid 0.5px"
                        borderColor="divider.gray"
                        width="100%"
                        mb={30}
                    >
                        <Text mb={15} fontWeight="bold" fontSize={1}>
                            {key}
                        </Text>
                    </Box>
                </Desktop>

                {panelContent}
            </Card>
        );
    };

    renderMenu = panel => {
        return (
            <Card p={0}>
                <StyledDashboardMenu
                    selectedKeys={panel}
                    onClick={this.handleClick}
                >
                    {hostDashboardMenuTexts.map(menuText => (
                        <StyledDashboardMenuItem key={menuText}>
                            {/* menu item text */}
                            <Text
                                mb={6}
                                fontSize={1}
                                fontWeight="medium"
                                color="inherit"
                                letterSpacing="-0.4px"
                            >
                                {menuText}
                            </Text>
                            {/* menu item description */}
                            <Text
                                fontSize={0}
                                fontWeight="regular"
                                color="text.lightGray"
                                letterSpacing="-0.4px"
                            >
                                <Truncate lines={2}>
                                    {menuTextToDescription[menuText]}
                                </Truncate>
                            </Text>
                        </StyledDashboardMenuItem>
                    ))}
                </StyledDashboardMenu>
            </Card>
        );
    };

    render() {
        return (
            <Fragment>
                <TabletMobile>
                    <Container>
                        <Text
                            fontSize={1}
                            color="text.blue"
                            fontWeight="bold"
                            lineHeight={2.86}
                            my={8}
                        >
                            {this.props.panel}
                        </Text>
                    </Container>
                    <Box pb={50}>{this.renderPanel(this.props.panel)}</Box>
                </TabletMobile>
                <Desktop>
                    <Container>
                        <Text mt={20} mb={13} fontWeight="medium" fontSize={4}>
                            Host Dashboard
                        </Text>
                        <DashboardGrid pb={50}>
                            {this.renderMenu(this.props.panel)}
                            {this.renderPanel(this.props.panel)}
                        </DashboardGrid>
                    </Container>
                </Desktop>
            </Fragment>
        );
    }
}
export default HostDashboardPageView;
