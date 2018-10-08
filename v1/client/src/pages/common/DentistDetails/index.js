import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _uniq from 'lodash/uniq';
import _get from 'lodash/get';
import DentistDetailsView from './view';

class DentistDetails extends PureComponent {
    render() {
        window.scrollTo(0, 0);

        const { dentist } = this.props;
        const { user } = dentist;
        const procedures = dentist.procedures.map(p => p.group);
        const locations =
            _get(dentist, 'reservations.length') > 0
                ? _uniq(dentist.reservations.map(r => r.location))
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
