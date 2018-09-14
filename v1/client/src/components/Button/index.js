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

const StyledButton = styled(AntdButton)`

    && {
        padding: 0 10px;
        border-radius: 4px;
        ${width} ${height} ${borders};
        color: ${props => props.theme.colors.text.white};
        background-color: ${props => props.theme.colors.button.green};
        ${space};
        ${position};
        ${left};
        ${right};
        ${top};
        ${bottom};
        ${opacity};
        ${zIndex};
    }

    &&.ant-btn-primary, &&.ant-btn-submit {
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
        padding: 0;
        background-color: transparent;
        outline: none;
        ${props =>
            props.inverted &&
            `border: solid 1px ${props.theme.colors.text.green}`};      
        ${height}
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

    && span {
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.4px;
        color: #ffffff;
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
    height: '50px',
    color: 'text.white',
};

Button.propTypes = {
    height: PropTypes.oneOf(['50px', '60px', '80px']),
    fontSize: PropTypes.oneOf([1, 2, 3]),
};

export default Button;
