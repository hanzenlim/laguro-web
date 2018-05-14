import React from 'react';
import { Grid as MaterialUIGrid } from '@material-ui/core';

const Grid = props => {
    const { children, ...customProps } = props;

    return <MaterialUIGrid {...customProps}>{children}</MaterialUIGrid>;
};

export default Grid;
