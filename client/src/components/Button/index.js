import React from 'react';
import PropTypes from 'prop-types';
import { Button as AntdButton } from 'antd';
import { fontSize, width, height } from 'styled-system';
import styled from 'styled-components';

const StyledButton = styled(AntdButton)`
    &&.ant-btn-primary {
        ${width};
        ${height};
        padding: 0 10px;
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
        ${fontSize};
    }

    i {
        ${fontSize};
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

Button.defaultProps = {
    fontSize: 3,
    height: '50px',
};

Button.propTypes = {
    height: PropTypes.oneOf(['50px', '80px']),
    fontSize: PropTypes.oneOf([2, 3]),
};

export default Button;
