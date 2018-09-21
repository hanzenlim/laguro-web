import React from 'react';
import PropTypes from 'prop-types';
import { Button as AntdButton } from 'antd';
import styled from 'styled-components';
import {
    fontSize,
    fontWeight,
    height,
    propTypes,
    space,
    width,
    color,
    borders,
    position,
    left,
    top,
    bottom,
    right,
    zIndex,
    opacity,
} from 'styled-system';
import { hoverColor } from '../utils';

// explanation for each kind of button
// type:
//     primary: primary color background, white text
//     submit: same as primary
//     ghost: used for all interactive, clickable elements

// prop:
//     ghost={true}: primary color border color and text and transparent background

const StyledButton = styled(AntdButton)`

    && {
        padding: 0 10px;
        ${width} ${height} ${borders};
        color: ${props => props.theme.colors.text.white};
        ${space};
        ${position};
        ${left};
        ${right};
        ${top};
        ${bottom};
        ${opacity};
        ${zIndex};
    }

    &.ant-btn-primary,
    &.ant-btn-submit,
    &.ant-btn-primary:hover,
    &.ant-btn-submit:hover,
    &.ant-btn-primary:focus,
    &.ant-btn-submit:focus {
        border: solid 1px #f2f2f2;
        color: ${props => props.theme.colors.text.white};
        background-color: ${props => props.theme.colors.button.green};
    }

    &&.ant-btn-default {
        ${color} ${borders};
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
        && span {
            color: ${props =>
                props.inverted
                    ? props.theme.colors.text.green
                    : props.theme.colors.text.white};
        }
        line-height: 1;
        padding: 0;
        border: none;
        background-color: transparent;
        ${props => (props.height ? height : `height: auto`)}
        ${width};
        ${space};
        ${position};
        ${left};
        ${right};
        ${bottom};
    }

    &&.ant-btn-ghost:hover,
    &&.ant-btn-ghost:focus {
        ${hoverColor};
    }

    &&.ant-btn-ghost:after {
        display: none;
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

    &&.ant-btn-background-ghost {
        color: ${props => props.theme.colors.text.green};
        border-color: ${props => props.theme.colors.text.green};
    }

    && > span {
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.4px;
        ${fontSize}
        ${fontWeight};
        ${color};
    }

    i {
        ${fontSize} ${fontWeight} ${color};
    }
`;

StyledButton.propTypes = {
    ...propTypes.space,
    ...propTypes.color,
    ...propTypes.fontSize,
    ...propTypes.fontWeight,
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
    fontWeight: 'regular',
};

Button.propTypes = {
    height: PropTypes.oneOf(['50px', '60px', '80px']),
    fontSize: PropTypes.oneOf([1, 2, 3]),
};

export default Button;
