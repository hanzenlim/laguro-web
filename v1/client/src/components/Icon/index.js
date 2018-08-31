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
    propTypes,
} from 'styled-system';
import LocationPin from './LocationPin';
import Calendar from './Calendar';
import LocationPinWithBackground from './LocationPinWithBackground';
import LeftArrow from './LeftArrow';
import RightArrow from './RightArrow';

const Icon = props => {
    const { type } = props;

    let ReturnIcon;
    switch (type) {
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
        case 'calendar':
            ReturnIcon = Calendar;
            break;
        default:
            ReturnIcon = AntdIcon;
    }

    const StyledIcon = styled(ReturnIcon)`
        ${space} ${width} ${height} ${position} ${color} ${left} ${right} ${cursor};
    `;

    const StyledIconContainer = styled.div`
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
};

export default Icon;
