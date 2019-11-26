/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { message } from 'antd';
import { useQuery, useMutation } from '@apollo/react-hooks';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import uniqBy from 'lodash/uniqBy';

import { Loading } from '~/components';
import RedirectToErrorPage from '~/routes/GeneralErrorPage';
import { getUser } from '~/util/authUtils';
import { trackBookAppointment } from '~/util/trackingUtils';
import NewAppointmentView from './view';
import {
    getDentistQuery,
    requestAppointmentMutation,
    getPatientsByDentalGroups,
} from './queries';

const LOCAL_TIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss';

function NewAppointment({ onSuccessApptCreation, onClose }) {
    const [patientsFromDentalGroups, setPatientsFromDentalGroups] = useState(
        []
    );

    const [showConfirmationMessage, setShowConfirmationMessage] = useState(
        false
    );

    const [requestAppointment, { loading: mutationLoading }] = useMutation(
        requestAppointmentMutation,
        {
            context: { clientName: 'appointment' },
        }
    );

    const user = getUser();
    const id = _get(user, 'dentistId');

    const { data, loading, error } = useQuery(getDentistQuery, {
        variables: { id },
    });

    useEffect(() => {
        const getPatients = async () => {
            if (!loading && !error && data) {
                const dentalGroups = _get(data, 'getDentist.dentalGroups', []);
                const esResponse = await getPatientsByDentalGroups({
                    dentalGroups,
                });

                setPatientsFromDentalGroups(esResponse);
            }
        };

        getPatients();
    }, [data, error, loading]);

    if (error) {
        return <RedirectToErrorPage />;
    }

    if (loading) {
        return <Loading />;
    }

    const dentistId = _get(data, 'getDentist.id');
    const patients = _get(data, 'getDentist.patients', []);

    const patientsNameMap = patients.map(value => ({
        value: value.id,
        text: `${value.firstName} ${value.lastName}`,
    }));

    const onSubmit = async values => {
        const localStartTimeHour = moment(values.selectedStartTime).format(
            'HH'
        );
        const localStartTimeMinutes = moment(values.selectedStartTime).format(
            'mm'
        );
        const localEndTimeHour = moment(values.selectedEndTime).format('HH');
        const localEndTimeMinutes = moment(values.selectedEndTime).format('mm');

        try {
            const result = await requestAppointment({
                variables: {
                    input: {
                        officeId: values.dentalOfficeId,
                        dentistId,
                        patientId: values.selectedPatientId,
                        localStartTime: moment(values.selectedDate)
                            .hour(localStartTimeHour)
                            .minute(localStartTimeMinutes)
                            .format(LOCAL_TIME_FORMAT),
                        localEndTime: moment(values.selectedDate)
                            .hour(localEndTimeHour)
                            .minute(localEndTimeMinutes)
                            .format(LOCAL_TIME_FORMAT),
                    },
                },
            });
            if (result) {
                trackBookAppointment({
                    dentistId,
                    officeId: values.dentalOfficeId,
                    appointmentId: result.data.requestAppointment,
                    weekDay: moment(values.selectedDate).format('dddd'),
                    hour: moment(values.selectedStartTime).format('hh:mm a'),
                    eventAction: 'Conversion',
                });
                setShowConfirmationMessage(true);
                if (onSuccessApptCreation) {
                    onSuccessApptCreation();
                }
                window.scrollTo(0, 0);
            }
        } catch (errors) {
            const errorMessage = errors.graphQLErrors[0].message;

            message.error(errorMessage, 5);
        }
    };

    let patientsFinal = [...patientsNameMap];

    if (!_isEmpty(patientsFromDentalGroups)) {
        const patientsNormalize = patientsFromDentalGroups.map(item => ({
            value: item.id,
            text: `${item.firstName} ${item.lastName}`,
        }));

        patientsFinal = uniqBy(
            [...patientsFinal, ...patientsNormalize],
            'value'
        );
    }

    return (
        <NewAppointmentView
            preferredLocations={_get(data, 'getDentist.preferredLocations')}
            data={_get(data, 'getDentist')}
            firstAppointmentDuration={_get(
                data,
                'getDentist.firstAppointmentDuration'
            )}
            showConfirmationMessage={showConfirmationMessage}
            onMakeAnotherAppt={() => {
                setShowConfirmationMessage(false);
            }}
            patientsName={patientsFinal}
            patients={patientsFinal}
            onSubmit={onSubmit}
            onClose={onClose}
            mutationLoading={mutationLoading}
        />
    );
}

export default NewAppointment;
