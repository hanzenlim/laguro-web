import React from 'react';
import { Checkbox as MaterialUICheckbox } from '@material-ui/core';
import styled from 'styled-components';

const StyledCheckbox = styled(MaterialUICheckbox)`
    &&& {
        width: auto;
        height: auto;
        color: ${props => (props.checked ? '#f46b13' : '#c8c7c7;')};
    }

    && input {
        display: none;
    }
`;

const Checkbox = props => {
    return <StyledCheckbox {...props} />;
};

export default Checkbox;
