import React, { PureComponent } from 'react';
import { Input as AntdInput } from 'antd';
import styled from 'styled-components';
import { width, height, zIndex, textAlign } from 'styled-system';

const StyledInput = styled(AntdInput)`
    && {
        ${width} ${height} ${zIndex} ${textAlign};
    }
`;

class Input extends PureComponent {
    render() {
        const { ...rest } = this.props;
        return <StyledInput {...rest} />;
    }
}

export default Input;
