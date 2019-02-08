import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import cookies from 'browser-cookies';
import get from 'lodash/get';

import KioskDentistProfileView from './view';
import { CREATE_DENTIST, UPDATE_USER_IMAGE_URL } from './queries';

class KioskDentistProfilePage extends Component {
    render() {
        const user = JSON.parse(cookies.get('user'));

        return (
            <Mutation mutation={CREATE_DENTIST}>
                {createDentist => {
                    return (
                        <Mutation mutation={UPDATE_USER_IMAGE_URL}>
                            {updateUser => {
                                const onCreate = async values => {
                                    try {
                                        const {
                                            key,
                                            languages,
                                            procedureList,
                                            profilePicture,
                                            time,
                                        } = get(values, ['1'], {});
                                        const { about } = get(
                                            values,
                                            ['2'],
                                            {}
                                        );
                                        const { dentistInsurance } = get(
                                            values,
                                            ['3'],
                                            {}
                                        );

                                        const createQuery = {
                                            specialty: key,
                                            languages,
                                            acceptedInsurances: dentistInsurance,
                                            location: {
                                                name:
                                                    'Super Place, Waldorf, Maryland 20603, United States',
                                                geoPoint: {
                                                    lat: 38.630057,
                                                    lon: -76.98403,
                                                },
                                                addressDetails: '15',
                                            },
                                            bio: about,
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
                                        };

                                        const updateImageQuery = {
                                            id: user.id,
                                            imageUrl: profilePicture,
                                        };

                                        await updateUser({
                                            variables: {
                                                input: updateImageQuery,
                                            },
                                        });

                                        const dentist = await createDentist({
                                            variables: { input: createQuery },
                                        });

                                        console.log({ dentist });
                                    } catch (error) {
                                        console.log(error.message);
                                    }
                                };

                                return (
                                    <KioskDentistProfileView
                                        onCreate={onCreate}
                                    />
                                );
                            }}
                        </Mutation>
                    );
                }}
            </Mutation>
        );
    }
}

export default KioskDentistProfilePage;
