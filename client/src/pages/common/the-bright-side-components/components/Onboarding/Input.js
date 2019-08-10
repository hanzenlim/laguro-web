import React, { Component } from 'react';
import { Input as AntdInput } from 'antd';
import styled from 'styled-components';
import {
    width,
    height,
    zIndex,
    textAlign,
    borderRadius,
    space,
} from 'styled-system';

const StyledInput = styled(AntdInput)`
    && {
        ${width}
        ${height}
        ${zIndex}
        ${textAlign};
        ${borderRadius};
        ${space};
    }
`;

class Input extends Component {
    render() {
        const { setRef, ...rest } = this.props;

        return <StyledInput ref={setRef} {...rest} />;
    }
}

export default Input;
