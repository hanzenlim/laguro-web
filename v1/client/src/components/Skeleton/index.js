import React, { PureComponent } from 'react';
import { Skeleton as AntdSkeleton } from 'antd';
import styled from 'styled-components';

const StyledSkeleton = styled(AntdSkeleton)``;

class Skeleton extends PureComponent {
    render() {
        return <StyledSkeleton {...this.props} />;
    }
}

export default Skeleton;
