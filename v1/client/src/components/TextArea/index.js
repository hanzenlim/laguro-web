import React, { PureComponent } from 'react';
import { Input as AntdInput } from 'antd';
import styled from 'styled-components';
import { width, height, zIndex, space, textAlign } from 'styled-system';

const { TextArea: AntdTextArea } = AntdInput;

const StyledTextArea = styled(AntdTextArea)`
    &&.ant-input {
        min-height: 182px;
        ${width} ${height} ${zIndex} ${textAlign} ${space};
    }
`;

class TextArea extends PureComponent {
    render() {
        const { ...rest } = this.props;
        return <StyledTextArea {...rest} />;
    }
}

export default TextArea;
