import * as React from 'react';
import PersonaSelectionView from './view';

class GetPatientName extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <PersonaSelectionView {...this.props} />;
    }
}

export { GetPatientName };
