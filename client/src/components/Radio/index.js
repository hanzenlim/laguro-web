import React from 'react';
import styled from 'styled-components';
import { Radio as AntdRadio } from 'antd';
import { fontSize } from 'styled-system';

const RadioGroup = AntdRadio.Group;
const StyledRadioGroup = styled(RadioGroup)`
    &&.ant-radio-group {
        width: 100%;
    }

    && .ant-radio-checked .ant-radio-inner,
    && .ant-radio-inner:after,
    && .ant-radio-wrapper:hover .ant-radio .ant-radio-inner,
    && .ant-radio:hover .ant-radio-inner {
        border-color: ${props => props.theme.colors.background.blue};
    }

    && .ant-radio-inner:after {
        background: ${props => props.theme.colors.background.blue};
    }

    && span.ant-radio + * {
        width: 100%;
    }
`;

const StyledRadio = styled(AntdRadio)`
    &&.ant-radio-wrapper {
        display: flex;
        align-items: center;
        line-height: 30px;
        width: 100%;
        height: 32px;
        margin: 5px 0;
        ${fontSize};
        white-space: normal;
    }
`;

const Radio = props => {
    const { children, ...rest } = props;

    return <StyledRadio {...rest}>{children}</StyledRadio>;
};

Radio.Group = StyledRadioGroup;
Radio.Button = AntdRadio.Button;

export default Radio;
