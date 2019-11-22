import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Mutation, Query } from 'react-apollo';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import compact from 'lodash/compact';
import { adopt } from 'react-adopt';
import * as Yup from 'yup';
import Head from 'next/head';

import { DENTIST_ONBOARDING_VERIFICATION_URL } from '~/util/urls';
import {
    redirect,
    getSearchParamValueByKey,
    attemptToRedirectBack,
} from '~/util/history';
import { getUser, setUser, setAuthToken } from '~/util/authUtils';
import Loading from '~/components/Loading/index';
import { execute } from '~/util/gqlUtils';
import { isBioUpdated } from '~/util/dentistUtils';
import { ENGLISH } from '~/util/strings';
import { procedureList } from '~/data';
import KioskDentistProfileView from './view';
import {
    CREATE_DENTIST,
    UPDATE_USER_IMAGE_URL,
    getDentistQuery,
    UPDATE_DENTIST,
} from './queries';

const specialties = [
    'General Dentist',
    'Endodontics',
    'Oral Surgery',
    'Orthodontics',
    'Pedodontics',
    'Periodontics',
    'Prosthodontics',
];

const Composed = adopt({
    /* eslint-disable-next-line react/prop-types */
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
    /* eslint-disable-next-line react/prop-types */
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
    /* eslint-disable-next-line react/prop-types */
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
    /* eslint-disable-next-line react/prop-types */
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

const KioskDentistProfilePage = props => {
    const refetchUser = _get(props, 'refetchUser', () => {});

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
                    procedures,
                    bio,
                    acceptedInsurances,
                    languages: dentistLanguages,
                } = dentist;
                const user = getUser();

                const defaultProceduresList = { ...procedureList };

                if (!_isEmpty(procedures)) {
                    procedures.map(procedure => {
                        defaultProceduresList[procedure.group] = true;
                        return null;
                    });
                }

                const steps = [
                    {
                        id: '1',
                        component: null,
                        initialValues: {
                            profilePicture: user.imageUrl,
                            key: specialty || specialties[0],
                            time: firstAppointmentDuration || 30,
                            languages: dentistLanguages || [ENGLISH],
                            procedureList: defaultProceduresList,
                            permalink: dentist.permalink || '',
                        },
                        validationSchema: Yup.object().shape({
                            procedureList: Yup.object().test(
                                'has at least one procedure',
                                'Please select at lease one procedure',
                                procedureObject =>
                                    Object.values(procedureObject).some(i => i)
                            ),
                        }),
                        onAction: () => {
                            window.scrollTo(0, 0);
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
                ];

                const onCreate = async values => {
                    const {
                        key,
                        languages,
                        procedureList: procedureListOnCreate,
                        profilePicture,
                        time,
                        permalink,
                    } = _get(values, ['1'], {});
                    const { about } = _get(values, ['2'], {});

                    const procedureArrayOfKeys = Object.keys(
                        procedureListOnCreate
                    );

                    const proceduresOnCreate = procedureArrayOfKeys.map(
                        item => {
                            if (procedureListOnCreate[item]) {
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
                        acceptedInsurances: acceptedInsurances || [],
                        bio: about,
                        procedures: compact(proceduresOnCreate),
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

                                await refetchUser();
                            } else {
                                await updateDentist({
                                    variables: {
                                        input: {
                                            ...createQuery,
                                            permalink,
                                            id: user.dentistId,
                                        },
                                    },
                                });

                                await refetchUser();
                            }
                        },
                        afterAction: () => {
                            // this will trigger a render of a confirmation panel in dentist dashboard
                            if (props.fromDentistDashboard) {
                                props.onFinish();
                            } else if (
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
                                    newSearchParamValue:
                                        'KioskDentistProfilePage',
                                });
                            }
                        },
                    });
                };

                return (
                    <Fragment>
                        <Head>
                            <title>Laguro Dentist</title>
                            <link
                                rel="canonical"
                                href="https://www.laguro.com/onboarding/dentist/profile/"
                            />
                            <meta
                                name="description"
                                content="Become a Laguro Dentist today. Tell us about the different dental services that you offer"
                            />
                        </Head>
                        {isDentistLoading ? (
                            <Loading />
                        ) : (
                            <KioskDentistProfileView
                                onCreate={onCreate}
                                steps={steps}
                                isEditing={!_isEmpty(_get(user, 'dentistId'))}
                                withoutProgressBar={props.withoutProgressBar} // used in dentist dashboard
                            />
                        )}
                    </Fragment>
                );
            }}
        </Composed>
    );
};

KioskDentistProfilePage.defaultProps = {
    withoutProgressBar: false,
    fromDentistDashboard: false,
};

KioskDentistProfilePage.propTypes = {
    withoutProgressBar: PropTypes.bool,
    fromDentistDashboard: PropTypes.bool,
    onFinish: PropTypes.func.isRequired,
};

export default KioskDentistProfilePage;
