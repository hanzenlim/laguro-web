import React from 'react';
import { Icon as AntdIcon } from 'antd';
import styled from 'styled-components';

const StyledIcon = styled(AntdIcon)``;

const Icon = props => {
    const { ...rest } = props;

    return <StyledIcon {...rest} />;
};

export default Icon;
