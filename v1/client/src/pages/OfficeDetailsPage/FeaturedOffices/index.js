import React, { Component } from 'react';

import FeaturedOfficesView from './view';
import getFeaturedOffices from './queries';

class FeaturedList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            featuredOffices: [],
        };
    }

    componentDidMount = async () => {
        const featuredOffices = await getFeaturedOffices();

        if (featuredOffices) {
            this.setState({ featuredOffices });
        }
    };

    render() {
        if (!this.state.featuredOffices) return null;

        const mappedData = this.state.featuredOffices.map(item => ({
            id: item._id,
            name: item._source.name,
            description: item._source.description,
            address: item._source.location.name,
            numReviews: `${item._source.numReviews} reviews`,
            totalRating: item._source.totalRating,
        }));

        return <FeaturedOfficesView featuredOffices={mappedData} />;
    }
}

export default FeaturedList;
