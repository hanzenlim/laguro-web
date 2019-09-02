import styled from 'styled-components';
import { Box } from '../../components';
import Menu from '../common/Menu';

const dashboardMenuWidthInPixels = 338;
const dashboardColumnGap = 21;

export const DashboardGrid = styled(Box)`
    display: grid;
    grid-template-columns: ${dashboardMenuWidthInPixels}px calc(
            100% - ${dashboardMenuWidthInPixels}px - ${dashboardColumnGap}px
        );
    grid-column-gap: ${dashboardColumnGap}px;
`;

export const StyledDashboardMenu = styled(Menu)`
    && {
        width: 100%;
        min-height: 911px;
        &.ant-menu-vertical {
            border-right: none;
        }
    }
`;

export const StyledDashboardMenuItem = styled(Menu.Item)`
    &&&& {
        //// blue vertical bar for selected menu item
        right: -1px; // to bring the right blue bar closer to the edge of the card. Card doesn't perfectly contain the content but has extra padding
        &.ant-menu-item-selected {
            border-right: 2px solid;
            border-right-color: ${props => props.theme.colors.divider.blue};
        }

        height: auto; // default height is fixed to 40px
        line-height: normal;
        padding: 20px 25px;

        margin: 0;
        border-bottom: solid 0.5px;
        border-bottom-color: ${props => props.theme.colors.divider.gray};

        // to override css for last menu item
        &.ant-menu-item:not(:last-child) {
            margin: 0;
            border-bottom: solid 0.5px;
            border-bottom-color: ${props => props.theme.colors.divider.gray};
        }
    }
`;
