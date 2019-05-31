import * as React from 'react';
import AddressView from './view';

class Address extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <AddressView {...this.props} />;
    }
}

export { Address };
