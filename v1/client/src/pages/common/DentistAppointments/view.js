import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Box, Text, Flex, Image, Button } from '../../../components';

import { CANCELLED } from '../../../util/strings';

class DentistAppointments extends PureComponent {
    renderReservations = (reservations, toggleModalState) =>
        reservations.map(
            (
                {
                    dateCreated,
                    officeName,
                    startTime,
                    endTime,
                    location,
                    appointments,
                },
                index
            ) => (
                <Box mb={50} key={index}>
                    <Flex
                        justifyContent="space-between"
                        alignItems="center"
                        mb={24}
                    >
                        <Box>
                            <Text fontSize={5} fontWeight="bold">
                                {dateCreated} —
                            </Text>
                            <Text fontSize={5} fontWeight="light">
                                {officeName} {`(${startTime} - ${endTime})`}
                            </Text>
                            <Text fontSize={2}>{location}</Text>
                        </Box>
                        <Button
                            type="ghost"
                            border="none"
                            onClick={toggleModalState}
                        >
                            <Text color="text.gray" fontSize={2}>
                                cancel
                            </Text>
                        </Button>
                    </Flex>
                    {appointments.length ? (
                        this.renderAppointments(appointments)
                    ) : (
                        <Text textAlign="center" color="text.gray">
                            NO APPOINTMENTS
                        </Text>
                    )}
                </Box>
            )
        );

    renderAppointments = appointments =>
        appointments.map(
            ({ startTime, patientName, patientPhoto, status }, index) => {
                const isCancelled = status === CANCELLED;
                return (
                    <Flex
                        key={index}
                        justifyContent="space-between"
                        alignItems="center"
                        p={30}
                        mb={12}
                        border="1px solid"
                        borderColor="divider.gray"
                        borderRadius={2}
                        opacity={isCancelled ? 0.2 : 1}
                    >
                        <Flex position="relative">
                            <Text fontWeight="bold" fontSize={4} mr={20}>
                                {startTime}
                            </Text>
                            <Text fontSize={4}>{patientName}</Text>
                            {isCancelled && (
                                <Box
                                    borderBottom="1px solid"
                                    borderColor="text.black"
                                    position="absolute"
                                    left={0}
                                    right={0}
                                    top="50%"
                                />
                            )}
                        </Flex>
                        <Flex alignItems="center">
                            {isCancelled && <Text mr={20}>{CANCELLED}</Text>}
                            <Image
                                src={patientPhoto}
                                alt={patientName}
                                width={38}
                                height={38}
                                borderRadius="50%"
                            />
                        </Flex>
                    </Flex>
                );
            }
        );

    render() {
        const { reservations, toggleModalState } = this.props;

        return (
            <Box>
                <Text color="text.green" fontSize={4} fontWeight="bold" mb={40}>
                    upcoming appointments
                </Text>
                <Box>
                    {this.renderReservations(reservations, toggleModalState)}
                </Box>
            </Box>
        );
    }
}

DentistAppointments.defaultProps = {
    reservations: [
        {
            dateCreated: 'Tue, Aug 28, 2018',
            officeName: 'Bell Dental Center',
            startTime: '4PM',
            endTime: '7PM',
            location: '1598 Washington Ave, San Leandro, CA 94577',
            appointments: [
                {
                    startTime: '5:30 PM',
                    patientName: 'Will Choi',
                    patientPhoto:
                        'https://cdn.filestackcontent.com/JXbUNxZqTLivfioMfCwV',
                },
                {
                    startTime: '6:00 PM',
                    patientName: 'Sarah Parker',
                    patientPhoto:
                        'https://cdn.filestackcontent.com/JXbUNxZqTLivfioMfCwV',
                },
            ],
        },
        {
            dateCreated: 'Wed, Aug 29, 2018',
            officeName: 'Bell Dental Center',
            startTime: '4PM',
            endTime: '7PM',
            location: '1598 Washington Ave, San Leandro, CA 94577',
            appointments: [
                {
                    startTime: '5:30 PM',
                    patientName: 'Will Choi',
                    patientPhoto:
                        'https://cdn.filestackcontent.com/JXbUNxZqTLivfioMfCwV',
                    status: 'CANCELLED',
                },
                {
                    startTime: '6:00 PM',
                    patientName: 'Sarah Parker',
                    patientPhoto:
                        'https://cdn.filestackcontent.com/JXbUNxZqTLivfioMfCwV',
                    status: 'CANCELLED',
                },
            ],
        },
        {
            dateCreated: 'Thur, Aug 30, 2018',
            officeName: 'Bell Dental Center',
            startTime: '4PM',
            endTime: '7PM',
            location: '1598 Washington Ave, San Leandro, CA 94577',
            appointments: [],
        },
    ],
};

DentistAppointments.propTypes = {
    reservations: PropTypes.arrayOf(
        PropTypes.shape({
            dateCreated: PropTypes.string,
            officeName: PropTypes.string,
            startTime: PropTypes.string,
            endTime: PropTypes.string,
            location: PropTypes.string,
            appointments: PropTypes.arrayOf(
                PropTypes.shape({
                    startTime: PropTypes.string,
                    patientName: PropTypes.string,
                    patientPhoto: PropTypes.string,
                })
            ),
        })
    ),
    toggleModalState: PropTypes.func.isRequired,
};

export default DentistAppointments;
