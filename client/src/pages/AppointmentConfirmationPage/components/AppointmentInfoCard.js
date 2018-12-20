import React, { Fragment } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import { Box, Button, Link, Flex, Text, Image } from '../../../components';
import AppointmentApprovedImage from '../../../components/Image/appointmentApproved.svg';
import defaultUserImage from '../../../components/Image/defaultUserImage.svg';
import {
    PENDING_PATIENT_APPROVAL,
    ACTIVE,
    REJECTED_BY_PATIENT,
} from '../../../util/strings';

const AppointmentInfoCardOptions = ({ isSubmitting, onAccept, onReject }) => (
    <Fragment>
        <Button
            loading={isSubmitting}
            width="100%"
            height="40px"
            onClick={onAccept}
        >
            <Text fontSize="12px" color="white">
                Approve Appointment
            </Text>
        </Button>
        <Text
            pt={14}
            px={27}
            fontSize={0}
            textAlign="center"
            width="100%"
            height={40}
            cursor="pointer"
            onClick={onReject}
        >
            I don&apos;t approve
        </Text>
    </Fragment>
);

const AppointmentAcceptedDisplay = () => (
    <Fragment>
        <Box bg="#3481f8" color="white" width="100%" height={40}>
            <Flex pl="38%">
                <Image
                    pt={8}
                    height={27}
                    width={27}
                    src={AppointmentApprovedImage}
                />
                <Text fontSize="12px" pt={9} color="white">
                    Approved
                </Text>
            </Flex>
        </Box>
        <Link to={`/`}>
            <Text
                pt={14}
                pl={27}
                pr={27}
                fontSize={0}
                textAlign="center"
                width="100%"
                height="40px"
            >
                Back to homepage
            </Text>
        </Link>
    </Fragment>
);

const AppointmentInfoCard = props => {
    const {
        appointment,
        dentistUser,
        status,
        office,
        isSubmitting,
        onAccept,
        onReject,
    } = props;
    const startTime = moment(appointment.localStartTime).format(
        'dddd, MMMM Do YYYY, h:mm:ss a'
    );
    const {
        firstName: dentistFirstName,
        lastName: dentistLastName,
        imageUrl: dentistImage,
        dentistId,
    } = dentistUser;

    const { name: officeName } = office;
    const location = office.location.name;

    return (
        <Box>
            <Box height={59} width={59} pt={20} pb={60} mx="auto">
                <Image
                    src={dentistImage || defaultUserImage}
                    height={[42, '', 59]}
                    width={[42, '', 59]}
                />
            </Box>
            <Box width={360} mx="auto">
                <Link to={`/dentist/${dentistId}`}>
                    <Text
                        pb={9}
                        pt={10}
                        textAlign="center"
                        fontSize={1}
                        color="text.blue"
                    >
                        {dentistFirstName} {dentistLastName}
                    </Text>
                </Link>
                <Text pb={18} textAlign="center" fontSize="16px">
                    {startTime}
                </Text>
                <Text textAlign="center">{officeName}</Text>
                <Text textAlign="center">{location}</Text>
            </Box>
            <Box width={360} pt={4} mx="auto">
                {status === PENDING_PATIENT_APPROVAL && (
                    <AppointmentInfoCardOptions
                        isSubmitting={isSubmitting}
                        onAccept={onAccept}
                        onReject={onReject}
                    />
                )}
                {status === ACTIVE && <AppointmentAcceptedDisplay />}
                {status === REJECTED_BY_PATIENT && (
                    <Text
                        color="text.lightGray"
                        fontSize="10px"
                        textAlign="center"
                        height={24}
                    >
                        Please contact Dr. {dentistFirstName} {dentistLastName}{' '}
                        if you would like to book a new appointment.
                    </Text>
                )}
            </Box>
        </Box>
    );
};

export default AppointmentInfoCard;

AppointmentInfoCard.propTypes = {
    appointment: PropTypes.object.isRequired,
    dentistUser: PropTypes.object.isRequired,
    status: PropTypes.string.isRequired,
    office: PropTypes.object.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    onAccept: PropTypes.func.isRequired,
    onReject: PropTypes.func.isRequired,
};
