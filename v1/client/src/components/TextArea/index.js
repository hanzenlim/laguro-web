import React, { PureComponent } from 'react';
import { Input as AntdInput } from 'antd';
import styled from 'styled-components';

const { TextArea: AntdTextArea } = AntdInput;

const StyledTextArea = styled(AntdTextArea)`
    &&.ant-input {
        min-height: 182px;
    }
`;

class TextArea extends PureComponent {
    render() {
        const { ...rest } = this.props;
        return <StyledTextArea {...rest} />;
    }
}

export default TextArea;
