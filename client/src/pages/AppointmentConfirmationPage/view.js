import React from 'react';
import PropTypes from 'prop-types';

import { Box, Text } from '../../components';
import DeclineAppointmentRequestModal from './DeclineAppointmentRequestModal';
import AppointmentInfoCard from './components/AppointmentInfoCard';
import AppointmentStatusDisplay from './components/AppointmentStatusDisplay';
import {
    PENDING_PATIENT_APPROVAL,
    ACTIVE,
    REJECTED_BY_PATIENT,
} from '../../util/strings';

const STATUS_TEXT_MAP = {
    [PENDING_PATIENT_APPROVAL]: 'Confirm your appointment',
    [REJECTED_BY_PATIENT]: 'Appointment Declined',
    [ACTIVE]: 'Appointment Confirmed',
};

const AppointmentConfirmationView = props => {
    const {
        appointment,
        showModal,
        status,
        isCardSubmitting,
        isModalSubmitting,
        onAccept,
        onReject,
        onConfirmRejection,
        onCancelRejection,
    } = props;
    const statusText = STATUS_TEXT_MAP[status];
    const dentistUser = appointment.dentist.user;

    return (
        <Box
            height="100%"
            minHeight="100vh"
            width="100vw"
            bg="background.aquaBlue"
        >
            <Box pt={45} mb={22}>
                <Text
                    textAlign="center"
                    color="text.lightGray"
                    fontWeight="medium"
                    fontSize={4}
                >
                    {statusText}
                </Text>
            </Box>
            <Box
                maxWidth="800px"
                width="100%"
                mx="auto"
                boxShadow={1}
                bg="white"
            >
                <Box pb={41} mb={41}>
                    <DeclineAppointmentRequestModal
                        visible={showModal}
                        loading={isModalSubmitting}
                        onSubmit={onConfirmRejection}
                        onCancel={onCancelRejection}
                    />
                    <Box pb={45}>
                        <AppointmentStatusDisplay
                            dentistUser={dentistUser}
                            status={status}
                        />
                    </Box>
                    <Box
                        maxWidth="414px"
                        width="100%"
                        border="1px solid"
                        borderColor="background.lightGray"
                        pb={21}
                        mx="auto"
                    >
                        <AppointmentInfoCard
                            appointment={appointment}
                            dentist={appointment.dentist}
                            dentistUser={dentistUser}
                            isSubmitting={isCardSubmitting}
                            office={appointment.office}
                            status={status}
                            onAccept={onAccept}
                            onReject={onReject}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default AppointmentConfirmationView;

AppointmentConfirmationView.propTypes = {
    appointment: PropTypes.object.isRequired,
    showModal: PropTypes.bool.isRequired,
    status: PropTypes.string.isRequired,
    isCardSubmitting: PropTypes.bool.isRequired,
    isModalSubmitting: PropTypes.bool.isRequired,
    onAccept: PropTypes.func.isRequired,
    onReject: PropTypes.func.isRequired,
    onConfirmRejection: PropTypes.func.isRequired,
    onCancelRejection: PropTypes.func.isRequired,
};
