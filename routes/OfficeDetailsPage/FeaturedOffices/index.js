import React, { PureComponent } from 'react';
import _shuffle from 'lodash/shuffle';

import FeaturedOfficesView from './view';
import getFeaturedOffices from './queries';
import { withScreenSizes } from '~/components/Responsive';

class FeaturedList extends PureComponent {
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
        const { desktopOnly } = this.props;
        if (!this.state.featuredOffices) return null;

        let mappedData = this.state.featuredOffices.map(item => ({
            id: item._id,
            name: item._source.name,
            description: item._source.description,
            location: item._source.location,
            numReviews: `${item._source.numReviews} reviews`,
            averageRating: item._source.averageRating,
            imageUrls: item._source.imageUrls,
        }));

        mappedData = mappedData.filter(
            office => office.id !== this.props.currentOffice
        );

        mappedData = _shuffle(mappedData);

        mappedData = mappedData.splice(0, desktopOnly ? 4 : 2);
        return <FeaturedOfficesView featuredOffices={mappedData} />;
    }
}

export default withScreenSizes(FeaturedList);
