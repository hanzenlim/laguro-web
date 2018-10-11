import React, { Component } from 'react';

import FeaturedOfficesView from './view';
import getFeaturedOffices from './queries';

const OFFICE_COUNT = window.innerWidth > 1600 ? 5 : 4;

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

        let mappedData = this.state.featuredOffices.map(item => ({
            id: item._id,
            name: item._source.name,
            description: item._source.description,
            address: item._source.location.name,
            numReviews: `${item._source.numReviews} reviews`,
            averageRating: item._source.averageRating,
            imageUrls: item._source.imageUrls,
        }));

        mappedData = mappedData
            .filter(office => office.id !== this.props.currentOffice)
            .splice(0, OFFICE_COUNT + 1);

        return <FeaturedOfficesView featuredOffices={mappedData} />;
    }
}

export default FeaturedList;
