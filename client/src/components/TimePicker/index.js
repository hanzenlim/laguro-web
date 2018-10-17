import { TimePicker as AntdTimePicker } from 'antd';
import styled from 'styled-components';
import { height, space, propTypes } from 'styled-system';

const StyledTimePicker = styled(AntdTimePicker)`
    && {
        position: relative;
        ${space} ${height};
    }
    & .ant-time-picker-input {
        width: 100%;
        height: 100%;
        padding: 0;
        font-family: ${props => props.theme.fontFamily};
        font-weight: ${props => props.theme.fontWeights.regular};
        font-size: ${props => props.theme.fontSizes[3]};
        letter-spacing: -0.6px;
        ${props => props.borderless && `border: none;`};
        ::placeholder {
            color: ${props => props.theme.colors.text.black50};
        }
    }

    & .ant-time-picker-icon {
        margin: 0;
        right: 30px;
        width: 26px;
        height: 26px;
        top: 12px;
        font-size: 26px;
    }

    & .ant-time-picker-icon .anticon {
        color: ${props => props.theme.colors.icon.blue};
    }

    &.ant-time-picker {
        width: 100%;
    }
`;

StyledTimePicker.propTypes = {
    ...propTypes.height,
    ...propTypes.space,
};

export default StyledTimePicker;
