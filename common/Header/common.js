import React from 'react';
import styled from 'styled-components';
import _get from 'lodash/get';

import { Button, Text, Box } from '~/components';
import {
    getPageType,
    HOME_PAGE_TYPE,
    ALL_USER_PAGE_TYPE,
    PATIENT_PAGE_TYPE,
    DENTIST_AND_HOST_PAGE_TYPE,
} from '~/util/urls';
import { HEADER_HEIGHT } from './constants';
import { breakpointsInPixels } from '../../components/theme';

export const getLinkTextColor = pathname => {
    const pageType = getPageType(pathname);
    const textWhite = 'text.white';
    const textBlue = 'text.blue';

    switch (pageType) {
        case HOME_PAGE_TYPE:
            return textWhite;
        case ALL_USER_PAGE_TYPE:
            return textBlue;
        case PATIENT_PAGE_TYPE:
            return textBlue;
        case DENTIST_AND_HOST_PAGE_TYPE:
            return textWhite;
        default:
            return textBlue;
    }
};

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
        border-bottom: solid 1px transparent;

        // on mobile, :hover is activated with a click
        :hover {
            border-bottom: solid 1px
                ${props =>
                    _get(props.theme.colors, getLinkTextColor(props.pathname))};
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
            background-color: ${props =>
                props.theme.colors.background.lightGray};
            top: ${HEADER_HEIGHT + 1}px !important;
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

export const LinkButton = ({
    textColor,
    children,
    textProps,
    pathname,
    ...rest
}) => (
    <StyledLinkButton fontSize={1} type="ghost" {...rest} pathname={pathname}>
        <Text color={getLinkTextColor(pathname)} {...textProps}>
            {children}
        </Text>
    </StyledLinkButton>
);
