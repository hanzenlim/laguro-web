import React from 'react';
import { Grid as MaterialUIGrid } from '@material-ui/core';
import styled from 'styled-components';

const StyledGrid = styled(MaterialUIGrid)`
    ${props =>
        props.withborder && 'border: 1px solid #ddd; border-radius: 3px;'};
`;

const Grid = props => {
    const { children, ...customProps } = props;

    return <StyledGrid {...customProps}>{children}</StyledGrid>;
};

export default Grid;
