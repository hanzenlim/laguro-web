import React from 'react';
import { Switch as AntdSwitch } from 'antd';

const Switch = props => {
    const { ...rest } = props;

    return <AntdSwitch {...rest} />;
};

Switch.Option = AntdSwitch.Option;

export default Switch;
