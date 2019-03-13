import React from 'react';
import { Theme, Button, Text } from '@laguro/basic-components';
import styled from 'styled-components';
import {
    getPageType,
    HOME_PAGE_TYPE,
    ALL_USER_PAGE_TYPE,
    PATIENT_PAGE_TYPE,
    DENTIST_AND_HOST_PAGE_TYPE,
} from '../../../util/urls';
import { HEADER_HEIGHT } from './constants';

const StyledLinkButton = styled(Button)`
    && {
        display: flex;
        align-items: center;
        span {
            padding-bottom: 2px;
            font-weight: ${props => props.theme.fontWeights.light};
        }
        // on mobile, :hover is activated with a click
        :hover span {
            border-bottom: solid 1px #ffffff;
            font-weight: ${props => props.theme.fontWeights.medium};

            @media (min-width: ${props => props.theme.breakpoints[1]}) {
                font-weight: ${props => props.theme.fontWeights.bold};
            }
        }
    }
`;

export const StyledDropContainer = styled.div`
    @media (max-width: 991px) {
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

export const LinkButton = ({ textColor, children, ...rest }) => (
    <StyledLinkButton fontSize={1} type="ghost" {...rest}>
        <Text color={textColor}> {children} </Text>{' '}
    </StyledLinkButton>
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
