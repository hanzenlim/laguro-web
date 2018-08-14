import React from 'react';
import styled from 'styled-components';
import { Button as MaterialUIButton } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
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
        !props.disabled &&
        `
        && {
            background-color: #0AD5B1;
        }

        &&:hover {
            background-color: #00BC98;
        }

        &&:focus {
            background-color: #0AD5B1;
        }
    `};

    ${props =>
        props.color === 'secondary' &&
        !props.disabled &&
        `
        && {
            background-color: #f46b13;
        }

        &&:hover {
            background-color: #DB5200;
        }

        &&:focus {
            background-color: #f46b13;
        }
    `};

    ${props =>
        props.color === 'default' &&
        !props.disabled &&
        `
        && {
            background-color: #484E51;
        }

        &&:hover {
            background-color: #2F3538;
        }

        &&:focus {
            background-color: #484E51;
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
    `};

    ${props =>
        props.disabled &&
        `
        && {
            background-color: #e5e5e5;
            color: rgba(0,0,0,0.5) !important; //important to overwrite default (need higher contrast)
        }
    `};
`;

const Button = props => {
    const { children, link, border, tooltip, ...customProps } = props;

    return (
        <Tooltip placement="right" title={tooltip || ''}>
            <div>
                <StyledButton
                    link={link ? 1 : 0}
                    border={border ? 1 : 0}
                    {...customProps}
                >
                    {children}
                </StyledButton>
            </div>
        </Tooltip>
    );
};

export default Button;
