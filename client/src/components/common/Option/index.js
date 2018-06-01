import React from 'react';
import { MenuItem as MaterialUIMenuItem } from '@material-ui/core';

const Option = props => {
    const { ...customProps } = props;

    return <MaterialUIMenuItem {...customProps} />;
};

export default Option;
