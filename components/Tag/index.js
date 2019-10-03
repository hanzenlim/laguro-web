import { Tag as AntdTag } from 'antd';
import styled from 'styled-components';
import { height, width, space } from 'styled-system';

const CheckableTag = AntdTag.CheckableTag;

const StyledAntdTag = styled(AntdTag)``;

const StyledCheckableTag = styled(CheckableTag)`
    && {
        &.ant-tag-checkable {
            ${width}
            ${height}
            ${space}
            text-align: center;
            color: ${props => props.theme.colors.text.black};
            border: none;
            font-weight: ${props => props.theme.fontWeights.medium};
            font-family: ${props => props.theme.fontFamily};
        }

        &&&.ant-tag-checkable-checked {
            background-color: ${props => props.theme.colors.background.blue};
            color: ${props => props.theme.colors.text.white};
        }

        &.ant-tag-checkable:not(.ant-tag-checkable-checked):hover {
            color: ${props => props.theme.colors.text.blue};
        }
    }
`;

StyledAntdTag.CheckableTag = StyledCheckableTag;

export default StyledAntdTag;
