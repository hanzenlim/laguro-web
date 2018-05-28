import React from 'react';
import { Input as MaterialUITextField } from '@material-ui/core';
import styled from 'styled-components';

const Wrapper = styled.div`
    padding: 14px 24px 14px 18px;
    width: 100%;
    border-radius: 2px;
    background-color: #fafafa;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24);
`;

const StyledInput = styled(MaterialUITextField)`
    &&&& input {
        background-color: transparent;
        border: none;
        border-bottom: none;
        border-radius: 0;
        outline: none;
        height: auto;
        width: 100%;
        font-size: 16px;
        margin: 0;
        padding: 0;
        box-shadow: none;
        box-sizing: content-box;
        transition: none;
    }

    &&&&:after,
    &&&&:before {
        /* HACK: Temporary fix for  materilize css globals */
        border-bottom: none !important;
    }

    font-size: 14px;
`;

const Input = props => {
    const { children, ...customProps } = props;

    if (props.variant === 'raised') {
        return (
            <Wrapper>
                <StyledInput {...customProps} />
            </Wrapper>
        );
    }

    return <StyledInput {...customProps} />;
};

export default Input;
