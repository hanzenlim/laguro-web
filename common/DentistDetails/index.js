import React, { Component } from 'react';
import DentistDetailsView from './view';

class DentistDetails extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        const { dentist } = this.props;

        const mappedData = {
            name: `Dr. ${
                dentist.name
                    ? dentist.name
                    : `${dentist.user.firstName} ${dentist.user.lastName}`
            }`,
            specialization: dentist.specialty,
            image: dentist.imageUrl,
            procedures: dentist.procedures.map(p => p.group),
            bio: dentist.bio.trim(),
            rating: dentist.averageRating,
            numReviews: dentist.numReviews,
            languages: dentist.languages,
            acceptedInsurances: dentist.acceptedInsurances,
            npiNumber: dentist.npiNumber,
        };

        return <DentistDetailsView data={mappedData} />;
    }
}

DentistDetails.propTypes = {};

export default DentistDetails;
