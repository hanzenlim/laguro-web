import React from 'react';
import styled from 'styled-components';
import {
    Table as MaterialUITable,
    Paper as MaterialUIPaper
} from '@material-ui/core';
import { space, color, width, propTypes } from 'styled-system';

const StyledPaper = styled(MaterialUIPaper)`
    display: flex;
    ${space} ${color} ${width};
`;

StyledPaper.propTypes = {
    ...propTypes.space,
    ...propTypes.color
};

const Table = props => {
    const { children, closable, closeModal, ...customProps } = props;

    return (
        <StyledPaper {...customProps}>
            <MaterialUITable>{children}</MaterialUITable>
        </StyledPaper>
    );
};

export default Table;
