import React from 'react';
import PropTypes from 'prop-types';

import { Box, Text, Image } from '~/components';
import AppointmentImage from '~/components/Image/appointment.svg';
import AppointmentApprovedImage from '~/components/Image/appointmentApproved.svg';
import AppointmentDeclinedImage from '~/components/Image/appointmentDeclined.svg';
import { PENDING_PATIENT_APPROVAL, ACTIVE } from '~/util/strings';

const AppointmentStatusDisplay = props => {
    const { dentistUser, status } = props;
    let statusImage = null;
    let statusDescription = null;
    const statusInfo =
        status === PENDING_PATIENT_APPROVAL
            ? 'In order for the appointment to be confirmed, please approve the appointment request below.'
            : 'Here is the summary of the appointment';

    if (status === PENDING_PATIENT_APPROVAL) {
        statusDescription = `Approve appointment request from Dr. ${
            dentistUser.lastName
        }`;
        statusImage = (
            <Image
                height="43px"
                width="52px"
                mx="auto"
                src={AppointmentImage}
            />
        );
    } else if (status === ACTIVE) {
        statusDescription = 'Thank you! You have booked the appointment';
        statusImage = (
            <Image
                height="53px"
                width="56px"
                mx="auto"
                src={AppointmentApprovedImage}
            />
        );
    } else {
        statusDescription = 'Your appointment has been declined.';
        statusImage = (
            <Image
                height="53px"
                width="56px"
                mx="auto"
                src={AppointmentDeclinedImage}
            />
        );
    }

    return (
        <Box>
            <Box
                mx="auto"
                pt={45}
                width={351}
                pb={14}
                borderBottom="1px solid #c7c7c7"
            >
                {statusImage}
                <Text pt={31} fontSize={1} textAlign="center">
                    {statusDescription}
                </Text>
            </Box>
            <Box width={359} mx="auto">
                <Text pt={20} fontSize={1} textAlign="center">
                    {statusInfo}
                </Text>
            </Box>
        </Box>
    );
};

export default AppointmentStatusDisplay;

AppointmentStatusDisplay.propTypes = {
    dentistUser: PropTypes.object.isRequired,
    status: PropTypes.string.isRequired,
};
