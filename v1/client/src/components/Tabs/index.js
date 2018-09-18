import React, { PureComponent } from 'react';
import { Tabs as AntdTabs } from 'antd';
import styled from 'styled-components';

const StyledTabs = styled(AntdTabs)`
    && .ant-tabs-nav {
        .ant-tabs-tab-active {
            color: ${props => props.theme.colors.text.black};
            font-weight: ${props => props.theme.fontWeights.bold};
        }

        .ant-tabs-tab {
            font-size: ${props => props.theme.fontSizes[4]};
        }
    }

    && .ant-tabs-ink-bar {
        background-color: ${props => props.theme.colors.divider.green};
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
