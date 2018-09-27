import React, { Component } from 'react';

import FeaturedListView from './view';
import getFeaturedDentists from './queries';

class FeaturedList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            featuredDentists: [],
        };
    }

    componentDidMount = async () => {
        const featuredDentists = await getFeaturedDentists();

        if (featuredDentists) {
            this.setState({ featuredDentists });
        }
    };

    render() {
        if (!this.state.featuredDentists) return null;

        const mappedData = this.state.featuredDentists.map(item => ({
            id: item._id,
            name: item._source.name,
            specialty: item._source.specialty,
            numReviews: `${item._source.numReviews} reviews`,
            averageRating: item._source.averageRating,
        }));

        return <FeaturedListView featuredDentists={mappedData} />;
    }
}

export default FeaturedList;
