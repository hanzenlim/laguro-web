import { Menu as AntdMenu } from 'antd';
import styled from 'styled-components';

const { Item } = AntdMenu;
const StyledMenu = styled(AntdMenu)``;

const StyledItem = styled(Item)`
    &&&& {
        background-color: ${props => props.theme.colors.background.white};
    }

    &&&.ant-menu-item-selected,
    &&&.ant-menu-item-active {
        color: ${props => props.theme.colors.text.green};
    }
`;
StyledMenu.Item = StyledItem;

export default StyledMenu;
