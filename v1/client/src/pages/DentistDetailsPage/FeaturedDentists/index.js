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

        const mappedData = this.state.featuredDentists.map(item => {
            return {
                id: item._id,
                name: item._source.name,
                specialty: item._source.specialty,
                numReviews: `${item._source.numReviews} reviews`,
                totalRating: item._source.totalRating,
            };
        });

        return <FeaturedListView featuredDentists={mappedData} />;
    }
}

export default FeaturedList;