import React, { PureComponent } from 'react';
import { Checkbox as AntdCheckbox } from 'antd';
import styled from 'styled-components';

const StyledCheckbox = styled(AntdCheckbox)`
    && {
        .ant-checkbox-checked .ant-checkbox-inner {
            border-color: ${props => props.theme.colors.divider.green};
            background-color: ${props => props.theme.colors.background.green};
        }

        .ant-checkbox-wrapper:hover .ant-checkbox-inner,
        .ant-checkbox:hover .ant-checkbox-inner,
        .ant-checkbox-input:focus + .ant-checkbox-inner {
            border-color: ${props => props.theme.colors.divider.green};
        }

        .ant-checkbox-inner {
            width: 18px;
            height: 18px;
            border: 2px solid ${props => props.theme.colors.divider.green};
        }

        .ant-checkbox-inner:after {
            top: 2px;
        }
    }
`;

class Checkbox extends PureComponent {
    render() {
        const { ...rest } = this.props;
        return <StyledCheckbox {...rest} />;
    }
}

export default Checkbox;
