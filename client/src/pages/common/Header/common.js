import React from 'react';
import { Theme, Button, Text, Box } from '@laguro/basic-components';
import styled from 'styled-components';
import _get from 'lodash/get';
import {
    getPageType,
    HOME_PAGE_TYPE,
    ALL_USER_PAGE_TYPE,
    PATIENT_PAGE_TYPE,
    DENTIST_AND_HOST_PAGE_TYPE,
} from '../../../util/urls';
import { HEADER_HEIGHT } from './constants';
import { breakpointsInPixels } from '../../../components/theme';

const StyledLinkButton = styled(Button)`
    // four ampersands to override Button/index.js
    &&&& {
        display: flex;
        align-items: center;
        height: 25px;
        span {
            padding-bottom: 2px;
            font-weight: ${props => props.theme.fontWeights.light};
        }
        border-radius: 0;
        // on mobile, :hover is activated with a click
        :hover {
            border-bottom: solid 1px
                ${props => _get(props.theme.colors, getLinkTextColor())};
            div {
                font-weight: ${props => props.theme.fontWeights.medium};

                @media (min-width: ${props => props.theme.breakpoints[1]}) {
                    font-weight: ${props => props.theme.fontWeights.bold};
                }
            }
        }
    }
`;

export const StyledDropContainer = styled.div`
    // TODO: use min-width here
    @media (max-width: ${breakpointsInPixels[1] - 1}px) {
        .ant-dropdown {
            height: 250vh;
            overflow-y: auto;
            background-color: ${Theme.colors.background.lightGray};
            top: ${HEADER_HEIGHT}px !important;
            left: 0 !important;
            right: 0 !important;
        }

        .ant-dropdown-menu {
            padding: 0;
        }
    }
`;

export const HeaderLinkContainer = props => (
    <Box {...props} mr={[10, '', 25]} />
);

export const getLinkTextColor = () => {
    const pageType = getPageType();
    const textWhite = 'text.white';
    const textBlack = 'text.black';

    switch (pageType) {
        case HOME_PAGE_TYPE:
            return textWhite;
        case ALL_USER_PAGE_TYPE:
            return textBlack;
        case PATIENT_PAGE_TYPE:
            return textBlack;
        case DENTIST_AND_HOST_PAGE_TYPE:
            return textWhite;
        default:
            return textBlack;
    }
};

export const LinkButton = ({ textColor, children, textProps, ...rest }) => (
    <StyledLinkButton fontSize={1} type="ghost" {...rest}>
        <Text color={getLinkTextColor()} {...textProps}>
            {children}
        </Text>
    </StyledLinkButton>
);
