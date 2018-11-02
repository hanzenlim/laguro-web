import React from 'react';
import { Progress as AntdProgress } from 'antd';
import styled from 'styled-components';

const StyledProgress = styled(AntdProgress)`
    && {
        display: block;
        margin-bottom: 20px;
    }
    && .ant-progress-outer {
        display: block;
        line-height: 0;
    }
`;
const Progress = props => {
    const { ...rest } = props;
    return <StyledProgress showInfo={false} status="active" {...rest} />;
};

export default Progress;
