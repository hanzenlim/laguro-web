import React, { PureComponent } from 'react';
import _shuffle from 'lodash/shuffle';

import FeaturedDentistsList from './FeaturedDentistsList';
import getFeaturedDentists from './queries';
import { withScreenSizes } from '~/components/Responsive';

class FeaturedList extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            featuredDentists: [],
        };
    }

    componentDidMount = async () => {
        const featuredDentists = await getFeaturedDentists(
            this.props.currentDentist
        );

        if (featuredDentists) {
            this.setState({ featuredDentists });
        }
    };

    render() {
        if (!this.state.featuredDentists) return null;
        const { desktopOnly } = this.props;

        let mappedData = this.state.featuredDentists.map(item => ({
            id: item._id,
            name: item._source.name,
            specialty: item._source.specialty,
            numReviews: `${item._source.numReviews} reviews`,
            averageRating: item._source.averageRating,
            imageUrl: item._source.imageUrl,
        }));

        mappedData = mappedData.filter(
            dentist => dentist.id !== this.props.currentDentist.id
        );

        const shuffledMappedData = _shuffle(mappedData).splice(
            0,
            desktopOnly ? 5 : 4
        );

        return <FeaturedDentistsList featuredDentists={shuffledMappedData} />;
    }
}

export default withScreenSizes(FeaturedList);
