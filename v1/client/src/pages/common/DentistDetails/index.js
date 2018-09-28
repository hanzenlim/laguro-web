import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import _uniq from 'lodash/uniq';
import { getDentistQuery } from './queries';
import DentistDetailsView from './view';
import { Loading, Box } from '../../../components';
import { RedirectErrorPage } from '../../../pages/GeneralErrorPage';

class DentistDetails extends PureComponent {
    render() {
        const { id } = this.props;

        return (
            <Query query={getDentistQuery} variables={{ id }}>
                {({ loading, error, data }) => {
                    if (loading) {
                        return (
                            <Box minHeight="600px">
                                <Loading />
                            </Box>
                        );
                    }

                    if (error) {
                        return <RedirectErrorPage />;
                    }

                    const dentist = data.getDentist;
                    const { user } = dentist;
                    const procedures = dentist.procedures.map(p => p.group);
                    const locations =
                        dentist.reservations.length > 0
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
                }}
            </Query>
        );
    }
}

DentistDetails.propTypes = {
    id: PropTypes.string.isRequired,
};

export default DentistDetails;
