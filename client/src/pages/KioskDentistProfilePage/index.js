import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import cookies from 'browser-cookies';
import get from 'lodash/get';
import compact from 'lodash/compact';
import { adopt } from 'react-adopt';

import KioskDentistProfileView from './view';
import {
    CREATE_DENTIST,
    UPDATE_USER_IMAGE_URL,
    getActiveUserQuery,
} from './queries';
import { DENTIST_ONBOARDING_VERIFICATION_URL } from '../../util/urls';
import { redirect } from '../../history';

const Composed = adopt({
    createDentist: ({ render }) => (
        <Mutation
            update={(proxy, { data: { createDentist } }) => {
                const data = proxy.readQuery({
                    query: getActiveUserQuery,
                });

                data.activeUser = {
                    ...data.activeUser,
                    ...createDentist.user,
                    dentistId: createDentist.id,
                };

                cookies.set('user', JSON.stringify(data.activeUser));

                proxy.writeQuery({
                    query: getActiveUserQuery,
                    data,
                });
            }}
            mutation={CREATE_DENTIST}
        >
            {render}
        </Mutation>
    ),
    updateUser: ({ render }) => (
        <Mutation mutation={UPDATE_USER_IMAGE_URL}>{render}</Mutation>
    ),
});

class KioskDentistProfilePage extends Component {
    render() {
        const user = JSON.parse(cookies.get('user'));

        return (
            <Composed>
                {({ createDentist, updateUser }) => {
                    const onCreate = async values => {
                        try {
                            const {
                                key,
                                languages,
                                procedureList,
                                profilePicture,
                            } = get(values, ['1'], {});
                            const { about } = get(values, ['2'], {});
                            const dentistInsurance = get(values, ['3'], {});

                            const insuranceArrayOfKeys = Object.keys(
                                dentistInsurance
                            );

                            const acceptedInsurances = insuranceArrayOfKeys.filter(
                                key => dentistInsurance[key]
                            );

                            const procedureArrayOfKeys = Object.keys(
                                procedureList
                            );

                            const procedures = procedureArrayOfKeys.map(
                                item => {
                                    if (procedureList[item]) {
                                        return {
                                            code: 'code',
                                            duration: 0,
                                            group: item,
                                            name: 'name',
                                        };
                                    }

                                    return null;
                                }
                            );

                            const createQuery = {
                                specialty: key,
                                languages,
                                acceptedInsurances,
                                bio: about,
                                procedures: compact(procedures),
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

                        redirect({
                            url: DENTIST_ONBOARDING_VERIFICATION_URL,
                            newSearchParamKey: 'referer',
                            newSearchParamValue: 'KioskDentistProfilePage',
                        });
                    };

                    return <KioskDentistProfileView onCreate={onCreate} />;
                }}
            </Composed>
        );
    }
}

export default KioskDentistProfilePage;
