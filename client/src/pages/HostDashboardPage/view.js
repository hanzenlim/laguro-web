import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Container, Box, Text, Card, Truncate } from '@laguro/basic-components';
import queryString from 'query-string';
import {
    MY_OFFICES_MENU_TEXT,
    ADD_A_NEW_OFFICE_MENU_TEXT,
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
import { HOST_ONBOARDING_PAGE_URL_PREFIX } from '../../util/urls';
import { Responsive, Link, Button, Flex } from '../../components/index';
import { version } from '../../../package.json';

const { TabletMobile, Desktop, withScreenSizes } = Responsive;

const menuTextToDescription = {
    [MY_OFFICES_MENU_TEXT]: 'View and add listings to your offices',
    [ADD_A_NEW_OFFICE_MENU_TEXT]: 'Create a new office and listings',
};

const currentUrl = window.location.href;
const StyledButton = styled(Button)`
    &&&& {
        border-radius: 17px;
    }
`;

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
        let TabletMobileContainerComponent = Container;

        switch (key) {
            case MY_OFFICES_MENU_TEXT:
                panelContent = <HostListing />;
                TabletMobileContainerComponent = Fragment;
                break;
            default:
        }

        const ContainerComponent = this.props.tabletMobileOnly
            ? TabletMobileContainerComponent
            : Card;

        return (
            <ContainerComponent>
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
            </ContainerComponent>
        );
    };

    renderMenu = panel => (
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
                        <Flex
                            justifyContent="space-between"
                            alignItems="flex-end"
                            mb={9}
                        >
                            <Text
                                mt={20}
                                mb={4}
                                fontWeight="medium"
                                fontSize={4}
                            >
                                Host Dashboard
                                <Text
                                    is="span"
                                    fontSize={1}
                                    color="text.darkGray"
                                    ml={10}
                                >
                                    {`v${version}`}
                                </Text>
                            </Text>
                            <Desktop>
                                <Link
                                    height={34}
                                    isExternal
                                    target="_blank"
                                    to={
                                        currentUrl.includes('laguro-stage')
                                            ? 'http://portal.laguro-stage.com/'
                                            : 'http://portal.laguro.com/'
                                    }
                                >
                                    <StyledButton
                                        px={30}
                                        height="100%"
                                        fontSize={1}
                                    >
                                        Laguro Portal
                                    </StyledButton>
                                </Link>
                            </Desktop>
                        </Flex>
                        <DashboardGrid pb={50}>
                            {this.renderMenu([this.props.panel])}
                            {this.renderPanel(this.props.panel)}
                        </DashboardGrid>
                    </Container>
                </Desktop>
            </Fragment>
        );
    }
}
export default withScreenSizes(HostDashboardPageView);
