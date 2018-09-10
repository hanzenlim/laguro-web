import React, { PureComponent } from 'react';
import { Input as AntdInput } from 'antd';
import styled from 'styled-components';

const StyledInput = styled(AntdInput)``;

class Input extends PureComponent {
    render() {
        const { ...rest } = this.props;
        return <StyledInput {...rest} />;
    }
}

export default Input;
