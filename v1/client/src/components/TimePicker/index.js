import React from 'react';
import { TimePicker as AntdTimePicker } from 'antd';
import styled from 'styled-components';
import { height, space, propTypes } from 'styled-system';

const StyledTimePicker = styled(AntdTimePicker)`
    & .ant-time-picker-input {
        width: 100%;
        ${space} ${height};
    }

    & .ant-time-picker-icon {
        ${props => props.iconless && `display: none;`};
    }

    &.ant-time-picker {
        width: 100%;
    }
`;

StyledTimePicker.propTypes = {
    ...propTypes.height,
};

export default StyledTimePicker;
