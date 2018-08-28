import React from 'react';
import PropTypes from 'prop-types';
import { Button as AntdButton } from 'antd';
import styled from 'styled-components';
import {
    fontSize,
    height,
    propTypes,
    space,
    width,
    color,
    borders,
} from 'styled-system';

const StyledButton = styled(AntdButton)`

    && {
        padding: 0 10px;
        border-radius: 4px;
        ${space} ${width} ${height} ${borders};
    }

    &&.ant-btn-primary {
        border: solid 1px #f2f2f2;
        color: ${props => props.theme.colors.text.white};
        background-color: ${props => props.theme.colors.button.green};
    }

    &&.ant-btn-default {
        ${space} ${color};
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
        ${fontSize} ${color};
    }
`;

StyledButton.propTypes = {
    ...propTypes.space,
    ...propTypes.color,
};

const Button = props => {
    const { children, type = 'primary', ...rest } = props;

    return (
        <StyledButton {...rest} type={type}>
            {children}
        </StyledButton>
    );
};

Button.defaultProps = {
    fontSize: 3,
    height: '50px',
    color: 'text.white',
};

Button.propTypes = {
    height: PropTypes.oneOf(['50px', '80px']),
    fontSize: PropTypes.oneOf([1, 2, 3]),
};

export default Button;
