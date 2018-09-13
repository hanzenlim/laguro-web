import React from 'react';
import { Alert as AntdAlert } from 'antd';
import styled from 'styled-components';

const StyledAlert = styled(AntdAlert)``;

const Alert = props => {
    const { ...rest } = props;
    return <StyledAlert {...rest} />;
};

export default Alert;
