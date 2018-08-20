import React from 'react';
import { Icon as AntdIcon } from 'antd';
import styled from 'styled-components';
import MapPin from './MapPin';

const Icon = props => {
    const { type, ...rest } = props;

    let ReturnIcon;
    switch (type) {
        case 'mapPin':
            ReturnIcon = MapPin;
            break;
        default:
            ReturnIcon = AntdIcon;
    }

    const StyledIcon = styled(ReturnIcon)``;
    return <StyledIcon {...rest} />;
};

export default Icon;
