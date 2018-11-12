import React from 'react';
import { Tooltip } from 'antd';
import Icon from '../Icon';
import Text from '../Text';

const TooltipComponent = ({ inForm, inCheckbox, size, text }) => {
    const tooltipText = (
        <Text color="text.white" fontSize={[0, '', 1]}>
            {text}
        </Text>
    );
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
    return (
        <Tooltip title={tooltipText} placement="left">
            {returnIcon}
        </Tooltip>
    );
};

export default TooltipComponent;
