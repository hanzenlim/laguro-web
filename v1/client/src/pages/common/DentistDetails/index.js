import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { getDentistQuery } from './queries';
import DentistDetailsView from './view';
import { Loading, Box } from '../../../components';

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
                        return <div>Error</div>;
                    }

                    const dentist = data.getDentist;
                    const { user } = dentist;
                    const procedures = dentist.procedures.map(p => p.group);

                    const mappedData = {
                        name: `Dr. ${user.firstName} ${user.lastName}`,
                        specialization: dentist.specialty,
                        image: user.imageUrl,
                        procedures,
                        bio: dentist.bio.trim(),
                        rating: dentist.averageRating,
                        reviewsCount: dentist.numReviews,
                        locations:
                            dentist.appointments.lenght > 0
                                ? dentist.appointments[0].location
                                : [],
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
