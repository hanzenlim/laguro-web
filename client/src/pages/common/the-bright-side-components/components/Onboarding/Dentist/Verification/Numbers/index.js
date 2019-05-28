import * as React from 'react';
import NumbersView from './view';

class Numbers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <NumbersView {...this.props} />;
    }
}

export default Numbers;
