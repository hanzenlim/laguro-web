import React from 'react';
import { Button as AntdButton } from 'antd';
import styled from 'styled-components';

const StyledButton = styled(AntdButton)`
    &&.ant-btn-primary {
        ${props => props.width && `width: ${props.width}`};
        height: 50px;
        border-radius: 4px;
        color: ${props => props.theme.colors.text.white};
        background-color: ${props => props.theme.colors.button.green};
        border: solid 1px #f2f2f2;
    }

    &&.ant-btn-primary.disabled,
    &&.ant-btn-primary[disabled],
    &&.ant-btn-primary.disabled:hover,
    &&.ant-btn-primary[disabled]:hover,
    &&.ant-btn-primary.disabled:focus,
    &&.ant-btn-primary[disabled]:focus,
    &&.ant-btn-primary.disabled:active,
    &&.ant-btn-primary[disabled]:active,
    &&.ant-btn-primary.disabled.active,
    &&.ant-btn-primary[disabled].active {
        color: ${props => props.theme.colors.text.white};
        background-color: ${props => props.theme.colors.button.gray};
    }

    && span {
        font-weight: bold;
        font-style: italic;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.6px;
        color: #ffffff;
        font-size: ${props => props.theme.fontSizes[3]};
    }

    i {
        font-size: ${props => props.theme.fontSizes[3]};
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
