import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import cookies from 'browser-cookies';

import KioskDentistProfileView from './view';
import { CREATE_DENTIST } from './queries';

class KioskDentistProfilePage extends Component {
    render() {
        const user = JSON.parse(cookies.get('user'));

        return (
            <Mutation mutation={CREATE_DENTIST}>
                {(createDentist, { data }) => {
                    const createQuery = {
                        specialty: 'General dentist',
                        languages: ['ENGLISH'],
                        acceptedInsurances: ['CIGNA'],
                        location: {
                            name:
                                'Super Place, Waldorf, Maryland 20603, United States',
                            geoPoint: {
                                lat: 38.630057,
                                lon: -76.98403,
                            },
                            addressDetails: '15',
                        },
                        bio: 'Super Dentist',
                        procedures: [
                            {
                                code: 'D0170',
                                duration: 3,
                                group: 'DIAGNOSTIC',
                                name:
                                    'RE-EVALUATION - LIMITED, PROBLEM FOCUSED',
                            },
                        ],
                        userId: user.id,
                        firstAppointmentDuration: 5,
                    };

                    const onCreate = () =>
                        createDentist({ variables: { input: createQuery } });

                    return (
                        <KioskDentistProfileView
                            createQuery={createQuery}
                            onCreate={onCreate}
                            data={data}
                        />
                    );
                }}
            </Mutation>
        );
    }
}

export default KioskDentistProfilePage;
