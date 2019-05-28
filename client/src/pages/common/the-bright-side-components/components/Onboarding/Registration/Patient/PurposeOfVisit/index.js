import * as React from 'react';
import PurposeOfVisitSelectionView from './view';

class PurposeOfVisit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <PurposeOfVisitSelectionView {...this.props} />;
    }
}

export { PurposeOfVisit };
