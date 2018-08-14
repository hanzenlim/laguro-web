import React from 'react';
import { Input as AntdInput } from 'antd';
import styled from 'styled-components';

const StyledInput = styled(AntdInput)``;

const Input = props => {
    const { ...rest } = props;

    return <StyledInput {...rest} />;
};

export default Input;
