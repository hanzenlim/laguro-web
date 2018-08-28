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
    position,
    left,
    right,
} from 'styled-system';
import { hoverColor } from '../utils';

const StyledButton = styled(AntdButton)`

    && {
        padding: 0 10px;
        border-radius: 4px;
        ${width} ${height} ${borders};
        color: ${props => props.theme.colors.text.white};
        background-color: ${props => props.theme.colors.button.green};
        border: 'solid 1px #f2f2f2';
        ${space};
        ${position};
        ${left};
        ${right};
    }

        &&.ant-btn-primary {
            border: solid 1px #f2f2f2;
            color: ${props => props.theme.colors.text.white};
            background-color: ${props => props.theme.colors.button.green};
        }

        &&.ant-btn-default {
            ${color};
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

    &&.ant-btn-ghost {
        ${width};
        ${height};
        padding: 0 10px;
        color: ${props => props.theme.colors.text.white};
        background-color: transparent;
        outline: none;
        border-style: none;
        ${space};
        ${position};
        ${left};
        ${right};
    }

    &&.ant-btn-ghost:hover,
    &&.ant-btn-ghost:focus {
        ${hoverColor};
    }

    &&.ant-btn-ghost.disabled,
    &&.ant-btn-ghost[disabled],
    &&.ant-btn-ghost.disabled:hover,
    &&.ant-btn-ghost[disabled]:hover,
    &&.ant-btn-ghost.disabled:focus,
    &&.ant-btn-ghost[disabled]:focus,
    &&.ant-btn-ghost.disabled:active,
    &&.ant-btn-ghost[disabled]:active,
    &&.ant-btn-ghost.disabled.active,
    &&.ant-btn-ghost[disabled].active {
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
    type: 'primary',
    fontSize: 3,
    height: '50px',
    color: 'text.white',
};

Button.propTypes = {
    height: PropTypes.oneOf(['50px', '80px']),
    fontSize: PropTypes.oneOf([1, 2, 3]),
};

export default Button;
