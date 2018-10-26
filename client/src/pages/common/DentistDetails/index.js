import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _uniqBy from 'lodash/uniqBy';
import _get from 'lodash/get';
import DentistDetailsView from './view';

class DentistDetails extends PureComponent {
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        const { dentist } = this.props;
        const { user } = dentist;
        const procedures = dentist.procedures.map(p => p.group);
        const locations =
            _get(dentist, 'reservations.length') > 0
                ? _uniqBy(dentist.reservations.map(r => r.location), 'name')
                : [];
        const mappedData = {
            name: `Dr. ${user.firstName} ${user.lastName}`,
            specialization: dentist.specialty,
            image: user.imageUrl,
            procedures,
            bio: dentist.bio.trim(),
            rating: dentist.averageRating,
            numReviews: dentist.numReviews,
            locations,
        };

        return <DentistDetailsView data={mappedData} />;
    }
}

DentistDetails.propTypes = {
    id: PropTypes.string.isRequired,
};

export default DentistDetails;