import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import compact from 'lodash/compact';
import { adopt } from 'react-adopt';
import * as Yup from 'yup';
import KioskDentistProfileView from './view';
import {
    CREATE_DENTIST,
    UPDATE_USER_IMAGE_URL,
    getDentistQuery,
    UPDATE_DENTIST,
} from './queries';
import { DENTIST_ONBOARDING_VERIFICATION_URL } from '../../util/urls';
import {
    redirect,
    getSearchParamValueByKey,
    attemptToRedirectBack,
} from '../../history';
import { getUser, setUser, setAuthToken } from '../../util/authUtils';
import Loading from '../../components/Loading/index';
import { execute } from '../../util/gqlUtils';
import { isBioUpdated } from '../../util/dentistUtils';

const procedureList = {
    Fillings: false,
    'Crowns, Bridges, Veneers': false,
    'Root Canals': false,
    'Gum Surgery / Grafting': false,
    'Deep Cleaning': false,
    'Whitening / Cosmetic': false,
    'Implant placement': false,
    'Implant crown': false,
    'Extractions / Surgery': false,
    Dentures: false,
    Braces: false,
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
const DD_CALIFORNIA_FORM_ITEM_NAME = 'DD_CALIFORNIA';

const checkAcceptedInsurance = (key, acceptedInsurances) => {
    return !_isEmpty(acceptedInsurances) && acceptedInsurances.includes(key)
}

const Composed = adopt({
    dentistResponse: ({ render }) => {
        const user = getUser();
        return (
            <Query
                query={getDentistQuery}
                variables={{
                    id: _get(user, 'dentistId'),
                }}
                fetchPolicy="network-only"
            >
                {render}
            </Query>
        );
    },
    createDentist: ({ render }) => (
        <Mutation
            update={(proxy, { data: { createDentistWithAuth } }) => {
                setAuthToken(createDentistWithAuth.token);
                setUser({
                    ...createDentistWithAuth.user,
                    dentistId: createDentistWithAuth.id,
                    hasUpdatedDentistBio: isBioUpdated(
                        _get(createDentistWithAuth, 'bio')
                    ),
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
                setUser({
                    imageUrl: updateUser.imageUrl,
                });
            }}
        >
            {render}
        </Mutation>
    ),
    updateDentist: ({ render }) => (
        <Mutation
            update={(proxy, { data: { updateDentist } }) => {
                setUser({
                    hasUpdatedDentistBio: isBioUpdated(
                        _get(updateDentist, 'bio')
                    ),
                });
            }}
            mutation={UPDATE_DENTIST}
        >
            {render}
        </Mutation>
    ),
});

class KioskDentistProfilePage extends Component {
    render() {
        return (
            <Composed>
                {({
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
                    const user = getUser();

                    const defaultProceduresList = Object.assign(
                        {},
                        procedureList
                    );

                    if (!_isEmpty(procedures)) {
                        for (const procedure of procedures) {
                            defaultProceduresList[procedure.group] = true;
                        }
                    }

                    const steps = [
                        {
                            id: '1',
                            validationSchema: Yup.object().shape({}),
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
                                about: Yup.string()
                                    .required('You must write a bio')
                                    .concat(Yup.string().notOneOf([' '])),
                            }),
                        },
                        {
                            id: '3',
                            component: null,
                            initialValues: {
                                [CIGNA_FORM_ITEM_NAME]:
                                    checkAcceptedInsurance(CIGNA_FORM_ITEM_NAME, acceptedInsurances),
                                [METLIFE_FORM_ITEM_NAME]:
                                    checkAcceptedInsurance(METLIFE_FORM_ITEM_NAME, acceptedInsurances),
                                [DD_CALIFORNIA_FORM_ITEM_NAME]:
                                    checkAcceptedInsurance(DD_CALIFORNIA_FORM_ITEM_NAME, acceptedInsurances),
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
                            id: _get(user, 'id'),
                            imageUrl: profilePicture,
                        };

                        if (updateImageQuery && updateImageQuery.imageUrl) {
                            await execute({
                                action: async () => {
                                    await updateUser({
                                        variables: {
                                            input: updateImageQuery,
                                        },
                                    });
                                },
                            });
                        }

                        await execute({
                            action: async () => {
                                if (_isEmpty(_get(user, 'dentistId'))) {
                                    await createDentist({
                                        variables: {
                                            input: {
                                                ...createQuery,
                                                userId: _get(user, 'id'),
                                            },
                                        },
                                    });
                                } else {
                                    await updateDentist({
                                        variables: {
                                            input: {
                                                ...createQuery,
                                                id: user.dentistId,
                                            },
                                        },
                                    });
                                }
                            },
                            afterAction: () => {
                                // this will trigger a render of a confirmation panel in dentist dashboard
                                if (this.props.fromDentistDashboard) {
                                    this.props.onFinish();
                                } else if (
                                    getSearchParamValueByKey(
                                        'referer'
                                    ).includes('ProfilePage')
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
                                        newSearchParamValue:
                                            'KioskDentistProfilePage',
                                    });
                                }
                            },
                        });
                    };

                    if (isDentistLoading) {
                        return <Loading />;
                    }
                    return (
                        <KioskDentistProfileView
                            onCreate={onCreate}
                            steps={steps}
                            withoutProgressBar={this.props.withoutProgressBar} // used in dentist dashboard
                        />
                    );
                }}
            </Composed>
        );
    }
}

export default KioskDentistProfilePage;
