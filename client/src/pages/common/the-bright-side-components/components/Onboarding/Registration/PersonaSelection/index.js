import * as React from 'react';
import PersonaSelectionView from './view';

class PersonaSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <PersonaSelectionView {...this.props} />;
    }
}

export { PersonaSelection };
