import React, { useState } from 'react';
import moment from 'moment';
import { message } from 'antd';
import { useQuery, useMutation } from '@apollo/react-hooks';
import _get from 'lodash/get';

import NewAppointmentView from './view';
import { Loading } from '~/components';
import RedirectErrorPage from '~/routes/GeneralErrorPage';
import { getDentistQuery, requestAppointmentMutation } from './queries';
import { getUser } from '~/util/authUtils';
import { trackBookAppointment } from '~/util/trackingUtils';

const LOCAL_TIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss';

function NewAppointment({ onSuccessApptCreation, onClose }) {
    const [showConfirmationMessage, setShowConfirmationMessage] = useState(
        false
    );
    const [requestAppointment] = useMutation(requestAppointmentMutation, {
        context: { clientName: 'appointment' },
    });

    const user = getUser();
    const id = _get(user, 'dentistId');

    const { data, loading, error } = useQuery(getDentistQuery, {
        variables: { id },
    });

    if (error) {
        return <RedirectErrorPage />;
    }

    if (loading) {
        return <Loading />;
    }

    const { patients } = _get(data, 'getDentist');
    const dentistId = _get(data, 'getDentist.id');

    const patientsNameMap = patients.map(value => {
        const key = value.id;
        const fullName = `${value.firstName} ${value.lastName}`;

        return {
            key,
            fullName,
        };
    });

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
            const errorMessage = errors[0].message;

            message.error(errorMessage);
        }
    };

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
            patientsName={patientsNameMap}
            onSubmit={onSubmit}
            onClose={onClose}
        />
    );
}

export default NewAppointment;
