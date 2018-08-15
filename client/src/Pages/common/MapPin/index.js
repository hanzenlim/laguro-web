import React from 'react';

import { StyledIcon } from './styles';

const MapPin = props => {
    const { ...rest } = props;

    return <StyledIcon {...rest} />;
};

export default MapPin;
