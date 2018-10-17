import { Menu as AntdMenu } from 'antd';
import styled from 'styled-components';

const { Item } = AntdMenu;
const StyledMenu = styled(AntdMenu)``;

const StyledItem = styled(Item)`
    &&&& {
        background-color: ${props => props.theme.colors.background.white};
    }

    &&&.ant-menu-item-selected,
    &&&.ant-menu-item-active,
    &&&.ant-menu-item:hover {
        color: ${props => props.theme.colors.text.blue};
    }

    &&&.ant-menu-item-selected {
        font-weight: bold;
    }

    &&&.ant-menu-item {
        transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
            border-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
            background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
            padding 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
`;
StyledMenu.Item = StyledItem;

export default StyledMenu;
