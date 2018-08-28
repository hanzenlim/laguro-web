import React from 'react';
import { Icon as AntdIcon } from 'antd';
import styled from 'styled-components';
import { space, propTypes } from 'styled-system';
import LocationPin from './LocationPin';
import Calendar from './Calendar';
import LocationPinWithBackground from './LocationPinWithBackground';

const Icon = props => {
    const { type, ...rest } = props;

    let ReturnIcon;
    switch (type) {
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
        ${space};
    `;

    return <StyledIcon {...rest} />;
};

Icon.propTypes = {
    ...propTypes.color,
    ...propTypes.height,
    ...propTypes.width,
    ...propTypes.space,
};

export default Icon;
