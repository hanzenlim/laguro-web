import React from 'react';
import { Button as AntdButton } from 'antd';
import styled from 'styled-components';

const StyledButton = styled(AntdButton)`
    &&.ant-btn-primary {
        height: 50px;
        border-radius: 4px;
        color: ${props => props.theme.colors.white};
        background-color: ${props => props.theme.colors.green};
        border: solid 1px #f2f2f2;
    }

    span {
        font-weight: bold;
        font-style: italic;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.6px;
        color: #ffffff;
        font-size: 25px;
    }

    i {
        font-size: 25px;
    }
`;

const Button = props => {
    const { children, ...rest } = props;

    return (
        <StyledButton {...rest} type="primary">
            {children}
        </StyledButton>
    );
};

export default Button;
