import React from 'react';
import { Tooltip } from 'antd';
import Icon from '../Icon';

const TooltipComponent = ({ inForm, inCheckbox, size, text }) => {
    let returnIcon;
    if (inForm) {
        returnIcon = (
            <Icon
                top="0.6px"
                fontSize={size}
                height={size}
                width={size}
                type="tooltip"
            />
        );
    } else if (inCheckbox) {
        returnIcon = (
            <Icon
                position="absolute"
                top="5px"
                fontSize={size}
                height={size}
                width={size}
                type="tooltip"
                ml={12}
            />
        );
    } else {
        returnIcon = (
            <Icon
                fontSize={size}
                height={size}
                width={size}
                type="tooltip"
                ml={12}
            />
        );
    }
    return <Tooltip title={text}>{returnIcon}</Tooltip>;
};

export default TooltipComponent;
