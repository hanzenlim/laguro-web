import styled from 'styled-components';
import { Select as AntdSelect } from 'antd';

import { Input as AntdInput } from '../../../components';

export const Input = styled(AntdInput)`
    &.ant-input {
        text-align: center;
        height: 46px;
        font-size: ${props => props.theme.fontSizes[3]};
        border-radius: 32px;
        box-shadow: 0 2px 7px 0 rgba(48, 53, 73, 0.1);
    }
`;

export const Select = styled(AntdSelect)`
    & .ant-select-selection {
        height: 46px;
        border-radius: 32px;
    }

    & .ant-select-selection__rendered {
        height: 46px;

        &:after {
            display: none;
        }
    }

    & .ant-select-selection__placeholder {
        text-align: center;
        font-size: ${props => props.theme.fontSizes[3]};
        position: unset;
        margin-top: 0;
        height: 46px;
        line-height: 46px;
    }

    & .ant-select-selection-selected-value {
        float: none;
        padding-right: 0;
        font-size: 18px;
        line-height: 46px;
    }

    & .ant-select-arrow {
        right: 30px;
    }

    & .ant-select-search--inline {
        top: 0;

        .ant-select-search__field {
            text-align: center;
            font-size: ${props => props.theme.fontSizes[3]};
        }
    }
`;
