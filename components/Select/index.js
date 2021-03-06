import React from 'react';
import styled from 'styled-components';
import { width } from 'styled-system';
import { Select } from 'antd';

const { Option } = Select;

const StyledSelect = styled(Select)`
    ${width};

    .ant-select-selection {
        border-radius: 2px;
        border-color: ${props => props.theme.colors.divider.gray};
        display: flex;
        align-items: center;
        height: 50px;
        ${width};
    }
    .ant-select-selection__rendered {
        line-height: 1;
        width: 90%;
    }
    .ant-select-selection-selected-value {
        font-size: ${props => props.theme.fontSizes[0]};
        opacity: 50%;
        letter-spacing: -0.4px;
        @media (min-width: ${props => props.theme.breakpoints[1]}) {
            font-size: ${props => props.theme.fontSizes[3]};
        }
    }
    .ant-select-arrow {
        font-weight: bold;
        color: ${props => props.theme.colors.arrow.black};
        font-size: ${props => props.theme.fontSizes[0]};

        @media (min-width: ${props => props.theme.breakpoints[1]}) {
            font-size: ${props => props.theme.fontSizes[3]};
        }
    }
`;

const AntdSelect = props => {
    const { ...rest } = props;

    return <StyledSelect {...rest} />;
};

export { Option };
AntdSelect.Option = Option;

export default AntdSelect;
