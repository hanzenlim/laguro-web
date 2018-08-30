import React from 'react';
import { Select as AntdSelect } from 'antd';
import styled from 'styled-components';

const StyledSelect = styled(AntdSelect)`
    .ant-select-selection {
        display: flex;
        align-items: center;
        height: 50px;
    }

    .ant-select-selection__rendered {
        line-height: 1;
    }

    .ant-select-selection-selected-value {
        font-size: ${props => props.theme.fontSizes[2]};
        opacity: 50%;
        letter-spacing: -0.4px;
    }

    .ant-select-arrow {
        font-weight: bold;
        color: ${props => props.theme.colors.arrow.black};
        font-size: ${props => props.theme.fontSizes[2]};
    }
`;

const Select = props => {
    const { ...rest } = props;

    return <StyledSelect {...rest} />;
};

Select.Option = AntdSelect.Option;

export default Select;
