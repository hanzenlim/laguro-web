import React from 'react';
import { Select as MateriaUISelect } from '@material-ui/core';

import styled from 'styled-components';

const StyledSelect = styled(MateriaUISelect)`
    width: 100%;
`;

const Select = props => {
    const { ...customProps } = props;

    return <StyledSelect {...customProps} />;
};

export default Select;
