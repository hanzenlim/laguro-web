import * as React from 'react';
import BirthdayView from './view';

class Birthday extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <BirthdayView {...this.props} />;
    }
}

export default Birthday;
