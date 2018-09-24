import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';

import { Box, Text, Flex, Image, Button } from '../../../components';

import { CANCELLED } from '../../../util/strings';
import defaultUserImage from '../../../components/Image/defaultUserImage.svg';

const StyledList = styled.ul`
    ${props => props.columns && `columns: ${props.columns}`};
    list-style-position: inside;
    padding: 0;
    margin: 0;
`;

class DentistAppointments extends PureComponent {
    renderReservations = reservations =>
        reservations.map(
            ({
                id,
                office,
                availableTimes,
                numChairsSelected,
                equipmentSelected,
                appointments,
            }) => {
                const isAppointmentsEmpty = isEmpty(appointments);
                return (
                    <Box mb={50} key={id}>
                        <Flex justifyContent="flex-end" mb={12}>
                            <Button
                                type="ghost"
                                onClick={
                                    isAppointmentsEmpty
                                        ? this.props.toggleModalState
                                        : null
                                }
                            >
                                <Text
                                    color={
                                        isAppointmentsEmpty
                                            ? 'text.green'
                                            : 'text.gray'
                                    }
                                    fontSize={2}
                                >
                                    cancel
                                </Text>
                            </Button>
                        </Flex>
                        <Box bg="background.lightGray" px={28} py={16}>
                            <Text fontWeight="bold" fontSize={5} mb={28}>
                                {office.name}
                            </Text>
                            <Text fontWeight="bold" fontSize={3} mb={8}>
                                My Bookings
                            </Text>
                            <StyledList>
                                {this.renderAvailableTimes(availableTimes)}
                            </StyledList>
                            <Text fontWeight="bold" fontSize={3} mt={12} mb={8}>
                                Equipments ordered
                            </Text>
                            <StyledList columns={3}>
                                <li>
                                    <Text display="inline">
                                        {`${numChairsSelected} chair${
                                            numChairsSelected > 1 ? 's' : ''
                                        }`}
                                    </Text>
                                </li>
                                {this.renderEquipment(equipmentSelected)}
                            </StyledList>
                            <Box mt={38}>
                                {!isEmpty(appointments) ? (
                                    this.renderAppointments(appointments)
                                ) : (
                                    <Text textAlign="center" color="text.gray">
                                        NO APPOINTMENTS
                                    </Text>
                                )}
                            </Box>
                        </Box>
                    </Box>
                );
            }
        );

    renderAvailableTimes = availableTimes =>
        availableTimes.map((availableTime, index) => {
            const date = moment(availableTime.startTime).format('ddd M/D/YYYY');
            const start = moment(availableTime.startTime).format('h:mm A');
            const end = moment(availableTime.endTime).format('h:mm A');

            return (
                <li key={index}>
                    <Box fontSize={2} display="inline">
                        <Text display="inline">{date}, </Text>
                        <Text display="inline" fontWeight="light">
                            {start} - {end}
                        </Text>
                    </Box>
                </li>
            );
        });

    renderEquipment = equipment =>
        equipment.map((item, index) => (
            <li key={index}>
                <Text display="inline">{item}</Text>
            </li>
        ));

    renderAppointments = appointments =>
        appointments.map(({ id, startTime, patient, status }) => {
            const name = `${patient.firstName} ${patient.lastName}`;
            const isCancelled = status === CANCELLED;
            return (
                <Flex
                    key={id}
                    justifyContent="space-between"
                    alignItems="center"
                    py={20}
                    px={30}
                    mb={10}
                    bg="background.white"
                    border="1px solid"
                    borderColor="divider.gray"
                    borderRadius={2}
                    opacity={isCancelled ? 0.5 : 1}
                >
                    <Flex
                        justifyContent="space-between"
                        alignItems="center"
                        fontSize={4}
                        position="relative"
                    >
                        <Box textAlign="center" mr={44}>
                            <Text fontWeight="bold">
                                {moment(startTime).format('ddd, M/D, YYYY')}
                            </Text>
                            <Text fontWeight="light">
                                {moment(startTime).format('h:mm A')}
                            </Text>
                        </Box>
                        <Text>{name}</Text>
                    </Flex>
                    <Image
                        src={patient.imageUrl || defaultUserImage}
                        alt={name}
                        width={38}
                        height={38}
                        borderRadius="50%"
                    />
                </Flex>
            );
        });

    render() {
        const { reservations } = this.props;

        return (
            <Box>
                <Text color="text.green" fontSize={4} fontWeight="bold" mb={8}>
                    my bookings
                </Text>
                <Box>
                    {!isEmpty(reservations) ? (
                        this.renderReservations(reservations)
                    ) : (
                        <Text textAlign="center" color="text.gray" mt={38}>
                            NO RESERVATIONS
                        </Text>
                    )}
                </Box>
            </Box>
        );
    }
}

// PropTypes
const appointmentShape = PropTypes.shape({
    id: PropTypes.string,
    startTime: PropTypes.string,
    patient: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        imageUrl: PropTypes.string,
    }),
    status: PropTypes.string,
});

const availableTimeShape = PropTypes.shape({
    startTime: PropTypes.string,
    endTime: PropTypes.string,
});

const officeShape = PropTypes.shape({
    name: PropTypes.string,
});

DentistAppointments.propTypes = {
    reservations: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            office: officeShape,
            availableTimes: PropTypes.arrayOf(availableTimeShape),
            numChairsSelected: PropTypes.number,
            equipmentSelected: PropTypes.arrayOf(PropTypes.string),
            appointments: PropTypes.arrayOf(appointmentShape),
        })
    ),
    toggleModalState: PropTypes.func.isRequired,
};

export default DentistAppointments;
