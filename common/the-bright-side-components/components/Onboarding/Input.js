import React, { Component } from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import {
    width,
    height,
    zIndex,
    textAlign,
    borderRadius,
    space,
} from 'styled-system';

const AntdInput = dynamic(import('antd/lib/input'), { ssr: false });

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
