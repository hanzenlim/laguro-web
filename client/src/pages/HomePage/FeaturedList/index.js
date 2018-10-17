import React, { Component } from 'react';

import FeaturedListView from './view';
import getFeaturedDentists from './queries';

class FeaturedList extends Component {
    constructor(props) {
        super(props);
        this.state = { featuredDentists: [] };
    }

    componentDidMount() {
        getFeaturedDentists().then(data => {
            this.setState({ featuredDentists: data });
        });
    }

    render() {
        return (
            <FeaturedListView featuredDentists={this.state.featuredDentists} />
        );
    }
}

export default FeaturedList;
