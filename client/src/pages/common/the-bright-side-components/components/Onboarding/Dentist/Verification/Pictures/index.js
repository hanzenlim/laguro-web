import * as React from 'react';
import PicturesView from './view';

class Pictures extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <PicturesView {...this.props} />;
    }
}

export { Pictures };
