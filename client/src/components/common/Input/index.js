import React, { Component } from 'react';
import { TextField as MaterialUITextField } from '@material-ui/core';
import styled from 'styled-components';

const StyledInput = styled(MaterialUITextField)`
    width: 100%;

    &&&& input {
        ${props => props.variant !== 'raised' && 'border: none !important;'};
        outline: none;
        height: auto;
        width: 100% !important;
        font-size: 16px;
        box-shadow: none;
        box-sizing: content-box;
        transition: none;
        margin: 6px 0 8px 0 !important;
    }

    &&&&:after,
    &&&&:before {
        /* HACK: Temporary fix for  materilize css globals */
        border-bottom: none !important;
    }

    font-size: 14px;
`;

class Input extends Component {
    render() {
        return <StyledInput {...this.props} />;
    }
}

export default Input;
