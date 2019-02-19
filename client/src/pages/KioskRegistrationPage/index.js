import React, { Component } from 'react';

import KioskRegistrationPageView from './view';

class KioskRegistrationPage extends Component {
    constructor(props) {
        super(props);

        this.pinInputRef = null;
    }

    setReference = node => {
        this.pinInputRef = node;
    };

    clear = () => {
        this.pinInputRef.clear();
    };

    render() {
        return (
            <KioskRegistrationPageView
                setReference={this.setReference}
                clear={this.clear}
            />
        );
    }
}

export default KioskRegistrationPage;
