import React, { useState, useRef, useEffect } from 'react';
import cookies from 'browser-cookies';
import { adopt } from 'react-adopt';
import { checkIntoKioskMutation, getUserQuery } from './queries';
import { Mutation } from 'react-apollo';
import { message } from 'antd';
import { setUser, setAuthToken } from '../../../util/authUtils';
import { appointmentClient } from '../../../util/apolloClients';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import CheckInWithAppointmentCodeView from './view';
import { defaultClient } from '../../../util/apolloClients';
import { KIOSK_OFFICE_ID_COOKIE_VARIABLE_NAME } from '../../KioskPage';
import { KIOSK_APPT_CODE_COOKIE_VARIABLE_NAME } from '../../KioskPage/getKioskPageWizardSteps';

const Composed = adopt({
    checkIntoKiosk: ({ render }) => (
        <Mutation mutation={checkIntoKioskMutation} client={appointmentClient}>
            {render}
        </Mutation>
    ),
});

const CheckInWithAppointmentCode = props => {
    const pinInputRef = useRef(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const redirect = async () => {
        await props.formikProps.setFieldValue('hasAppointmentCode', false);
        props.formikProps.submitForm();
    };

    useEffect(() => {
        props.formikProps.setFieldValue('hasAppointmentCode', true);
    }, []);

    useEffect(() => {
        cookies.erase(KIOSK_APPT_CODE_COOKIE_VARIABLE_NAME);
    }, []);

    return (
        <Composed>
            {({ checkIntoKiosk }) => {
                const validatePin = async pin => {
                    setIsSubmitting(true);
                    try {
                        const checkIntoKioskResponse = await checkIntoKiosk({
                            variables: {
                                input: {
                                    officeId:
                                        cookies.get(
                                            KIOSK_OFFICE_ID_COOKIE_VARIABLE_NAME
                                        ) ||
                                        localStorage.getItem(
                                            KIOSK_OFFICE_ID_COOKIE_VARIABLE_NAME
                                        ),
                                    passcode: pin,
                                },
                            },
                        });

                        const checkIntoKioskData = _get(
                            checkIntoKioskResponse,
                            'data.checkIntoKiosk'
                        );

                        if (checkIntoKioskData) {
                            setAuthToken(checkIntoKioskData.authToken);
                        }

                        const getUserQueryResponse = await defaultClient.query({
                            query: getUserQuery,
                            variables: {
                                id: _get(checkIntoKioskData, 'userId'),
                            },
                        });

                        const getUserQueryData = _get(
                            getUserQueryResponse,
                            'data.getUser'
                        );

                        if (getUserQueryData) {
                            setUser({
                                ...getUserQueryData,
                                token: checkIntoKioskData.token,
                            });
                        }

                        cookies.set(KIOSK_APPT_CODE_COOKIE_VARIABLE_NAME, pin, {
                            expires: 0,
                        });

                        props.formikProps.submitForm();
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
            }}
        </Composed>
    );
};

export default CheckInWithAppointmentCode;
