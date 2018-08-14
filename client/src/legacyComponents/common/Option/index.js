import React, { Component } from 'react';
import { MenuItem as MaterialUIMenuItem } from '@material-ui/core';

class Option extends Component {
    render() {
        return <MaterialUIMenuItem {...this.props} />;
    }
}

export default Option;
