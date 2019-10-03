import styled, { css } from 'styled-components';
import { Icon } from 'antd';

import { Box, Flex, Text, Button } from '~/components';

export const FlexCard = styled(Flex)`
    && {
        width: 100%;
        height: 97px;
        opacity: 0.67;
        border: 3px solid #ececec;
        justify-content: center;
        align-items: center;
        padding: 25px;
        flex-direction: column;
        position: relative;

        ${({ withContent }) =>
            withContent &&
            css`
                box-shadow: 1px 1px 12px 0 rgba(0, 0, 0, 0.06),
                    -1px -1px 12px 0 rgba(0, 0, 0, 0.06);
                border: 1px solid #3481f8;
                background-color: #ffffff;
                align-items: flex-start;
                opacity: 1;
            `}

        ${({ isChoice }) =>
            isChoice &&
            css`
                box-shadow: 1px 1px 12px 0 rgba(0, 0, 0, 0.06),
                    -1px -1px 12px 0 rgba(0, 0, 0, 0.06);
                background-color: #ffffff;
                align-items: flex-start;
                opacity: 1;
                border: none;
            `}

        ${({ isActive }) =>
            isActive &&
            css`
                opacity: 0.6;
                border: solid 3px rgba(52, 129, 248, 0.5);
                background-color: rgba(52, 129, 248, 0.1);
            `}
    }
`;

export const FlexCardText = styled(Text)`
    && {
        opacity: 0.46;
        font-family: Silka;
        font-size: 16px;
        font-weight: bold;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #9b9b9b;

        ${({ withContent }) =>
            withContent &&
            css`
                opacity: 1;
                font-size: 18px;
                font-weight: 500;
                color: #303449;
            `}
    }
`;

export const IconBackground = styled(Box)`
    && {
        position: absolute;
        right: -7.9px;
        top: -8px;
        width: 16px;
        height: 16px;
        background-color: #3481f8;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

export const StyledIcon = styled(Icon)`
    && {
        display: flex;
        justify-content: center;
        align-items: center;

        svg {
            padding: 2px;
        }
    }
`;

export const DentistButton = styled(Button)`
    && {
        height: 38px;
        border-radius: 21.5px;
        border: 1px solid #3481f8;
        background: transparent;
        color: #3481f8;
        margin-right: 10px;

        .label-text {
            font-size: 18px;
            font-family: Silka;
            font-size: 15px;
            font-weight: normal;
            font-style: normal;
            font-stretch: normal;
            line-height: normal;
            letter-spacing: normal;
        }

        .plus {
            font-size: 18px !important;
        }

        .main-text {
            margin-left: 6px;
        }

        :hover {
            color: '#fff';
        }

        :last-child {
            margin-right: 0;
        }
    }
`;

export const SaveButton = styled(Button)`
    && {
        width: 327px;
        height: 51px;
        border-radius: 25.5px;
        border: 1px solid #3481f8;
        color: #3481f8;
        background: #fff;
    }
`;
