import React, { Component } from 'react';

import FeaturedListView from './view';
import getFeaturedDentists from './queries';

class FeaturedList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        getFeaturedDentists().then(data => {
            this.setState({ featuredDentists: data });
        });
    }

    render() {
        if (this.state && this.state.featuredDentists) {
            return (
                <FeaturedListView
                    featuredDentists={this.state.featuredDentists}
                />
            );
        }

        return <div />;
    }
}

export default FeaturedList;
