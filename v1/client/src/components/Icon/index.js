import React from 'react';
import { Icon as AntdIcon } from 'antd';
import styled from 'styled-components';
import {
    color,
    space,
    width,
    height,
    left,
    right,
    position,
    cursor,
    transform,
    fontSize,
    propTypes,
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

const Icon = props => {
    const { type } = props;

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
        case 'plus':
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
        ${transform} ${space} ${width} ${height} ${fontSize} ${position} ${color} ${left} ${right} ${cursor};
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
            <StyledIcon {...props} />{' '}
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
