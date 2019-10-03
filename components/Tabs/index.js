import React, { PureComponent } from 'react';
import { Tabs as AntdTabs } from 'antd';
import styled from 'styled-components';

import { ContainerPaddingInPixels } from '../Container';

const StyledTabs = styled(AntdTabs)`
    && .ant-tabs-nav-container-scrolling {
        padding-left: ${ContainerPaddingInPixels}px;
        padding-right: ${ContainerPaddingInPixels}px;
    }

    && .ant-tabs-nav-container:not(.ant-tabs-nav-container-scrolling) {
        padding: 0 ${ContainerPaddingInPixels}px;

        @media (min-width: ${props => props.theme.breakpoints[1]}) {
            padding: 0;
        }
    }

    && .ant-tabs-tab-prev.ant-tabs-tab-arrow-show,
    && .ant-tabs-tab-next.ant-tabs-tab-arrow-show {
        width: ${ContainerPaddingInPixels}px;
    }

    && .ant-tabs-nav {
        .ant-tabs-tab-active {
            color: ${props => props.theme.colors.text.black};
            font-weight: ${props => props.theme.fontWeights.bold};
        }

        .ant-tabs-tab {
            font-size: ${props => props.theme.fontSizes[1]};
            margin-right: 20px;
            padding: 12px 0;

            @media (min-width: ${props => props.theme.breakpoints[1]}) {
                font-size: ${props => props.theme.fontSizes[4]};
                margin-right: 32px;
                padding: 12px 32px;
            }
        }
    }

    && .ant-tabs-ink-bar {
        background-color: ${props => props.theme.colors.divider.blue};
    }
`;

class Tabs extends PureComponent {
    static TabPane = AntdTabs.TabPane;

    render() {
        const { ...rest } = this.props;
        return <StyledTabs {...rest} />;
    }
}

export default Tabs;
