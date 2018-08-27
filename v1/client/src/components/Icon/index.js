import React from 'react';
import { Icon as AntdIcon } from 'antd';
import styled from 'styled-components';
import {
    fontSize,
    width,
    height,
    color,
    space,
    propTypes,
} from 'styled-system';
import LocationPin from './LocationPin';
import Calendar from './Calendar';

const Icon = props => {
    const { type, ...rest } = props;

    let ReturnIcon;
    switch (type) {
        case 'locationPin':
            ReturnIcon = LocationPin;
            break;
        case 'calendar':
            ReturnIcon = Calendar;
            break;
        default:
            ReturnIcon = AntdIcon;
    }

    const StyledIcon = styled(ReturnIcon)`
        ${fontSize} ${width} ${height} ${color} ${space};
    `;

    return <StyledIcon {...rest} />;
};

Icon.propTypes = {
    ...propTypes.fontSize,
    ...propTypes.width,
    ...propTypes.height,
    ...propTypes.color,
    ...propTypes.space,
};

export default Icon;
