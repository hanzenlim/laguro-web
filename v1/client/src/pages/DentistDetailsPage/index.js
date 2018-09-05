import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { getDentistQuery } from './queries';
import DentistDetailsPageView from './view';
import { Loading } from '../../components';

class DentistDeatilsPageContainer extends PureComponent {
    render() {
        const { id } = this.props.match.params;

        return (
            <Query query={getDentistQuery} variables={{ id }}>
                {({ loading, error, data }) => {
                    if (loading) {
                        return <Loading />;
                    }

                    if (error) {
                        return <div>Error</div>;
                    }

                    const dentist = data.getDentist;
                    const { user } = dentist;
                    const procedures = dentist.procedures.map(
                        procedure => procedure.name
                    );

                    const mappedData = {
                        name: `Dr. ${user.firstName} ${user.lastName}`,
                        specialization: dentist.specialty,
                        image: 'http://via.placeholder.com/186x186',
                        // image: user.imageUrl,
                        procedures,
                        // bio: dentist.bio.trim(),
                        bio:
                            'lorem ipsum blandit aptent phasellus viverra sollicitudin nostra netus fringilla, lobortis conubia eu auctor varius aliquam blandit faucibus donec, suspendisse nisl sapien turpis pretium diam arcu nostra, netus lectus faucibus rhoncus tellus ligula hendrerit vivamus. aenean hac ornare fermentum mi justo enim massa fames lorem ipsum blandit aptent phasellus viverra sollicitudin nostra netus fringilla, lobortis conubia eu auctor varius aliquam blandit faucibus donec, suspendisse nisl sapien turpis pretium diam arcu nostra, netus lectus faucibus rhoncus tellus ligula hendrerit vivamus. aenean hac ornare fermentum mi justo enim massa fames',
                        rating: 4,
                        reviewsCount: 84,
                        address: dentist.location,
                    };

                    return <DentistDetailsPageView data={mappedData} />;
                }}
            </Query>
        );
    }
}

export default DentistDeatilsPageContainer;
