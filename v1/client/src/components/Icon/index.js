import React from 'react';
import { Icon as AntdIcon } from 'antd';
import styled from 'styled-components';
import {
    color,
    space,
    width,
    height,
    fontSize,
    fontWeight,
    left,
    top,
    bottom,
    right,
    opacity,
    position,
    cursor,
    transform,
    propTypes,
    lineHeight,
} from 'styled-system';
import LocationPin from './LocationPin';
import LocationPinWithBackground from './LocationPinWithBackground';
import LeftArrow from './LeftArrow';
import RightArrow from './RightArrow';
import Plus from './Plus';
import Minus from './Minus';
import RightForwardArrow from './RightForwardArrow';
import UpArrow from './UpArrow';
import DownArrow from './DownArrow';
import { Box } from '../../components';

const Icon = props => {
    const { type, ...rest } = props;

    let ReturnIcon;
    switch (type) {
        case 'upArrow':
            ReturnIcon = UpArrow;
            break;
        case 'downArrow':
            ReturnIcon = DownArrow;
            break;
        case 'leftArrow':
            ReturnIcon = LeftArrow;
            break;
        case 'rightArrow':
            ReturnIcon = RightArrow;
            break;
        case 'locationPin':
            ReturnIcon = LocationPin;
            break;
        case 'locationPinWithBackground':
            ReturnIcon = LocationPinWithBackground;
            break;
        case 'coloredPlus':
            ReturnIcon = Plus;
            break;
        case 'minus':
            ReturnIcon = Minus;
            break;
        case 'rightForwardArrow':
            ReturnIcon = RightForwardArrow;
            break;
        default:
            ReturnIcon = AntdIcon;
    }

    const StyledIcon = styled(ReturnIcon)`
        && {
            ${transform}  ${color} ${space} ${width} ${height} ${position} ${color} ${left} ${top} ${bottom}${right} ${fontSize} ${opacity} ${fontWeight}; ${cssProps =>
        cssProps.cursor ? `cursor: ${cssProps.cursor}` : ''}; ${lineHeight}
        }
    `;

    const StyledIconContainer = styled.span`
        ${!props.isButton &&
            (cssProps =>
                cssProps.color
                    ? color
                    : `color: ${cssProps.theme.colors.icon.black}`)};
    `;

    return (
        <StyledIconContainer>
            <StyledIcon type={type} {...rest} />
        </StyledIconContainer>
    );
};

Icon.propTypes = {
    ...propTypes.color,
    ...propTypes.height,
    ...propTypes.width,
    ...propTypes.space,
    ...propTypes.fontSize,
};

export default Icon;
