import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import cookies from 'browser-cookies';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import compact from 'lodash/compact';
import { adopt } from 'react-adopt';
import KioskDentistProfileView from './view';
import {
    CREATE_DENTIST,
    UPDATE_USER_IMAGE_URL,
    getActiveUserQuery,
    getDentistQuery,
    UPDATE_DENTIST,
} from './queries';
import { DENTIST_ONBOARDING_VERIFICATION_URL } from '../../util/urls';
import {
    redirect,
    getSearchParamValueByKey,
    attemptToRedirectBack,
} from '../../history';
import Loading from '../../components/Loading/index';
import * as Yup from 'yup';

const procedureList = {
    'Adjunctive General': false,
    Diagnostic: false,
    Preventive: false,
    Restorative: false,
    'Oral Surgery': false,
    'Maxillofacial / Prosthetics': false,
    Orthodontics: false,
    Periodontics: false,
    Prosthodontics: false,
    Endodontics: false,
    Implantology: false,
};

const specialties = [
    'General Dentist',
    'Endodontics',
    'Oral Surgery',
    'Orthodontics',
    'Pedodontics',
    'Periodontics',
    'Prosthodontics',
];

const CIGNA_FORM_ITEM_NAME = 'CIGNA';
const METLIFE_FORM_ITEM_NAME = 'METLIFE';

const Composed = adopt({
    activeUserResponse: ({ render }) => (
        <Query query={getActiveUserQuery}>{render}</Query>
    ),
    dentistResponse: ({ activeUserResponse, render }) => (
        <Query
            query={getDentistQuery}
            variables={{
                id: _get(activeUserResponse, 'data.activeUser.dentistId'),
            }}
            fetchPolicy="network-only"
        >
            {render}
        </Query>
    ),
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
        <Mutation
            mutation={UPDATE_USER_IMAGE_URL}
            update={(proxy, { data: { updateUser } }) => {
                const data = proxy.readQuery({
                    query: getActiveUserQuery,
                });

                data.activeUser = {
                    ...data.activeUser,
                    imageUrl: updateUser.imageUrl,
                };

                cookies.set('user', JSON.stringify(data.activeUser));

                proxy.writeQuery({
                    query: getActiveUserQuery,
                    data,
                });
            }}
        >
            {render}
        </Mutation>
    ),
    updateDentist: ({ render }) => (
        <Mutation mutation={UPDATE_DENTIST}>{render}</Mutation>
    ),
});

class KioskDentistProfilePage extends Component {
    render() {
        const cookieUser = JSON.parse(cookies.get('user'));

        return (
            <Composed>
                {({
                    activeUserResponse,
                    dentistResponse: {
                        loading: isDentistLoading,
                        data: dentistData,
                    },
                    createDentist,
                    updateUser,
                    updateDentist,
                }) => {
                    const dentist = _get(dentistData, 'getDentist') || {};
                    const {
                        firstAppointmentDuration,
                        specialty,
                        languages,
                        procedures,
                        bio,
                        acceptedInsurances,
                    } = dentist;
                    const user =
                        _get(activeUserResponse, 'data.activeUser') || {};

                    let defaultProceduresList = Object.assign(
                        {},
                        procedureList
                    );

                    if (!_isEmpty(procedures)) {
                        for (let procedure of procedures) {
                            defaultProceduresList[procedure.group] = true;
                        }
                    }

                    const steps = [
                        {
                            id: '1',
                            validationSchema: {},
                            component: null,
                            initialValues: {
                                profilePicture: user.imageUrl,
                                key: specialty || specialties[0],
                                time: firstAppointmentDuration || 30,
                                languages: languages || ['ENGLISH'],
                                procedureList: defaultProceduresList,
                            },
                        },

                        {
                            id: '2',
                            component: null,
                            initialValues: { about: bio },
                            validationSchema: Yup.object().shape({
                                about: Yup.string().required(
                                    'You must write a bio'
                                ),
                            }),
                        },
                        {
                            id: '3',
                            component: null,
                            initialValues: {
                                [CIGNA_FORM_ITEM_NAME]:
                                    !_isEmpty(acceptedInsurances) &&
                                    acceptedInsurances.includes(
                                        CIGNA_FORM_ITEM_NAME
                                    ),
                                [METLIFE_FORM_ITEM_NAME]:
                                    !_isEmpty(acceptedInsurances) &&
                                    acceptedInsurances.includes(
                                        METLIFE_FORM_ITEM_NAME
                                    ),
                            },
                        },
                    ];

                    const onCreate = async values => {
                        const {
                            key,
                            languages,
                            procedureList,
                            profilePicture,
                            time,
                        } = _get(values, ['1'], {});
                        const { about } = _get(values, ['2'], {});
                        const dentistInsurance = _get(values, ['3'], {});

                        const insuranceArrayOfKeys = Object.keys(
                            dentistInsurance
                        );

                        const acceptedInsurances = insuranceArrayOfKeys.filter(
                            key => dentistInsurance[key]
                        );

                        const procedureArrayOfKeys = Object.keys(procedureList);

                        const procedures = procedureArrayOfKeys.map(item => {
                            if (procedureList[item]) {
                                return {
                                    code: 'code',
                                    duration: 0,
                                    group: item,
                                    name: 'name',
                                };
                            }

                            return null;
                        });

                        const createQuery = {
                            specialty: key,
                            languages,
                            acceptedInsurances,
                            bio: about,
                            procedures: compact(procedures),
                            firstAppointmentDuration: time,
                        };

                        const updateImageQuery = {
                            id: cookieUser.id,
                            imageUrl: profilePicture,
                        };

                        try {
                            await updateUser({
                                variables: {
                                    input: updateImageQuery,
                                },
                            });
                        } catch (error) {
                            console.log(error.message);
                        }

                        try {
                            await createDentist({
                                variables: {
                                    input: {
                                        ...createQuery,
                                        userId: cookieUser.id,
                                    },
                                },
                            });
                        } catch (error) {
                            console.log(error.message);
                        }

                        try {
                            await updateDentist({
                                variables: {
                                    input: {
                                        ...createQuery,
                                        id: user.dentistId,
                                    },
                                },
                            });
                        } catch (error) {
                            console.log(error.message);
                        }

                        if (
                            getSearchParamValueByKey('referer').includes(
                                'ProfilePage'
                            )
                        ) {
                            if (!attemptToRedirectBack()) {
                                redirect({
                                    url: DENTIST_ONBOARDING_VERIFICATION_URL,
                                    newSearchParamKey: 'referer',
                                    newSearchParamValue:
                                        'KioskDentistProfilePage',
                                });
                            }
                        } else {
                            redirect({
                                url: DENTIST_ONBOARDING_VERIFICATION_URL,
                                newSearchParamKey: 'referer',
                                newSearchParamValue: 'KioskDentistProfilePage',
                            });
                        }
                    };

                    if (isDentistLoading) {
                        return <Loading />;
                    }
                    return (
                        <KioskDentistProfileView
                            onCreate={onCreate}
                            steps={steps}
                        />
                    );
                }}
            </Composed>
        );
    }
}

export default KioskDentistProfilePage;
