import React from 'react';
import styled from 'styled-components';
import { Button as MaterialUIButton } from '@material-ui/core';
import theme from '../../../theme';

const StyledButton = styled(MaterialUIButton)`
    && {
        text-transform: none;
        padding: 16px 16px;
        border-radius: 2px;
        color: white;
    }

    &&:focus {
        background-color: rgba(0, 0, 0, 0.08);
    }

    ${props =>
        props.color === 'primary' &&
        `
        && {
            background-color: #0AD5B1;
        }

        &&:hover {
            background-color: #00BC98;
        }
    `};

    ${props =>
        props.color === 'secondary' &&
        `
        && {
            background-color: #f46b13;
        }

        &&:hover {
            background-color: #DB5200;
        }
    `};

    ${props =>
        props.color === 'default' &&
        `
        && {
            background-color: #484E51;
        }

        &&:hover {
            background-color: #2F3538;
        }
    `};

    ${props =>
        props.link &&
        `
        &&{
            color: ${theme.colors.link_blue};
            width: 100%;
            justify-content: flex-start;
            font-size: inherit;
            font-weight: inherit;
            font: inherit;
        }

        &&:hover {
            color: ${theme.colors.red};
        }
    `};

    ${props =>
        props.border &&
        `
        &&{
            border-bottom: 1px solid #e0e0e0;
        }
    `}
    ${props =>
        props.disabled &&
        `
        && {
            background-color: #f5f5f5;
            color: rgba(0,0,0,.25);
        }

        &&:hover {
            background-color: #f5f5f5;
        }
    `};
`;

const Button = props => {
    const { children, link, border, ...customProps} = props;

    return <StyledButton link={link ? 1 : 0} border={border ? 1 : 0} {...customProps}>{children}</StyledButton>;
};

export default Button;
