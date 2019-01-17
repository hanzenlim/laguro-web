import React, { Component } from 'react';
import styled from 'styled-components';
import { Tabs, Box, Container } from '@laguro/basic-components';
import DentistBookings from '../common/DentistBookings/';
import { MY_CALENDAR_MENU } from '../../util/strings';

const { TabPane } = Tabs;

const StyledTabs = styled(Tabs)`
    && .ant-tabs-nav {
        .ant-tabs-tab-active {
            color: ${props => props.theme.colors.text.black};
            font-weight: ${props => props.theme.fontWeights.regular};
        }

        .ant-tabs-tab {
            font-size: ${props => props.theme.fontSizes[1]};
            margin-right: 20px;
            padding: 12px 0;

            @media (min-width: ${props => props.theme.breakpoints[1]}) {
                font-size: ${props => props.theme.fontSizes[1]};
                margin-right: 20px;
                padding: 12px 0;
            }
        }
    }

    && .ant-tabs-ink-bar {
        background-color: ${props => props.theme.colors.divider.blue};
        height: 4px;
    }
`;

class DentistProfilePageView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            panel: MY_CALENDAR_MENU,
        };
    }

    renderTabPane = () => {
        const panelList = [];
        panelList.push(
            <TabPane tab={MY_CALENDAR_MENU} key={MY_CALENDAR_MENU}>
                <DentistBookings />
            </TabPane>
        );

        return panelList;
    };

    render() {
        return (
            <Box bg="#f8f8f8" pt={15} pb={100}>
                <Container>
                    <StyledTabs>{this.renderTabPane()}</StyledTabs>
                </Container>
            </Box>
        );
    }
}
export default DentistProfilePageView;
