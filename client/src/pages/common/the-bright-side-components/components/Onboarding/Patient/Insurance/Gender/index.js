import * as React from 'react';
import GenderView from './view';

class Gender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <GenderView {...this.props} />;
    }
}

export { Gender };
