import { Card as AntdCard } from 'antd';
import styled from 'styled-components';
import {
    height,
    space,
    width,
    color,
    borders,
    position,
    left,
    top,
    bottom,
    right,
    zIndex,
    opacity,
} from 'styled-system';

const StyledCard = styled(AntdCard)`
    &.ant-card-bordered {
        border-radius: 4px;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4);
    }

    & .ant-card-body {
        padding: 28px 28px;
        ${space}
        ${width}
        ${color}
        ${height}
        ${borders};
        ${position};
        ${left};
        ${right};
        ${top};
        ${bottom};
        ${opacity};
        ${zIndex};
    }
`;

export default StyledCard;
