import React, { useState, useRef, useEffect } from 'react';
import cookies from 'browser-cookies';
import { message } from 'antd';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import { useMutation } from '@apollo/react-hooks';

import { setAuthToken } from '~/util/authUtils';
import { KIOSK_OFFICE_ID_COOKIE_VARIABLE_NAME } from '~/routes/KioskPage';
import { KIOSK_APPT_CODE_COOKIE_VARIABLE_NAME } from '~/routes/KioskPage/getKioskPageWizardSteps';

import { checkIntoKioskMutation } from './queries';
import CheckInWithAppointmentCodeView from './view';

const CheckInWithAppointmentCode = props => {
    const pinInputRef = useRef(null);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [token, setToken] = useState(null);
    const [appointmentId, setAppointmentId] = useState(null);

    const [checkIntoKiosk] = useMutation(checkIntoKioskMutation, {
        context: { clientName: 'appointment' },
    });

    const redirect = async () => {
        await props.formikProps.setFieldValue('hasAppointmentCode', false);
        props.formikProps.submitForm();
    };

    useEffect(() => {
        if (appointmentId) {
            props.router.push(
                `/kiosk/appointment-code-confirmation?id=${appointmentId}`
            );
        }
    }, [appointmentId]);

    useEffect(() => {
        if (token) {
            setAuthToken(token);
        }
    }, [token]);

    useEffect(() => {
        props.formikProps.setFieldValue('hasAppointmentCode', true);
    }, []);

    useEffect(() => {
        cookies.erase(KIOSK_APPT_CODE_COOKIE_VARIABLE_NAME);
    }, []);

    const validatePin = async pin => {
        setIsSubmitting(true);
        try {
            const checkIntoKioskResponse = await checkIntoKiosk({
                variables: {
                    input: {
                        officeId:
                            cookies.get(KIOSK_OFFICE_ID_COOKIE_VARIABLE_NAME) ||
                            localStorage.getItem(
                                KIOSK_OFFICE_ID_COOKIE_VARIABLE_NAME
                            ),
                        passcode: pin,
                    },
                },
            });

            cookies.set(KIOSK_APPT_CODE_COOKIE_VARIABLE_NAME, pin, {
                expires: 0,
            });

            const checkIntoKioskData = _get(
                checkIntoKioskResponse,
                'data.checkIntoKiosk',
                null
            );

            if (checkIntoKioskData) {
                setAppointmentId(
                    _get(checkIntoKioskData, 'appointmentId', null)
                );
                setToken(_get(checkIntoKioskData, 'authToken', null));
            } else {
                setIsSubmitting(false);
                if (!_isEmpty(pinInputRef)) {
                    pinInputRef.current.clear();
                }
                message.error('Incorrect appointment code');
            }
        } catch (error) {
            setIsSubmitting(false);
            if (!_isEmpty(pinInputRef)) {
                pinInputRef.current.clear();
            }
            if (error && !_isEmpty(error.graphQLErrors)) {
                message.error(error.graphQLErrors[0].message);
            }
        }
    };

    return (
        <CheckInWithAppointmentCodeView
            isSubmitting={isSubmitting}
            pinInputRef={pinInputRef}
            validatePin={validatePin}
            redirect={redirect}
        />
    );
};

export default CheckInWithAppointmentCode;
