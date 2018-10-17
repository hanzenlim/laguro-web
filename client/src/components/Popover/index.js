import React from 'react';
import { Popover as AntdPopover } from 'antd';
import styled from 'styled-components';

const StyledPopover = styled(AntdPopover)``;

const Popover = props => {
    const { ...rest } = props;
    return <StyledPopover {...rest} />;
};

export default Popover;
