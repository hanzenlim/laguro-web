import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';

import { Box, Text, Flex, Image, Button, Card } from '../../../components';

import { CANCELLED } from '../../../util/strings';
import defaultUserImage from '../../../components/Image/defaultUserImage.svg';

export const NoAppointmentsCard = ({ text }) => (
    <Card
        width={720}
        style={{ boxShadow: '1px 1px 7px 0 rgba(0, 0, 0, 0.15)' }}
    >
        <Flex alignItems="center" justifyContent="center">
            <Text fontSize={3} fontWeight="bold" color="text.black50">
                {text}
            </Text>
        </Flex>
    </Card>
);

class PatientAppointments extends PureComponent {
    renderAppointments = appointments =>
        appointments.map(({ id, startTime, dentist, reservation, status }) => {
            const { lastName, firstName, imageUrl } = dentist.user;
            const dentistName = `Dr. ${firstName} ${lastName}`;
            const officeName = reservation.office.name;
            const isCancelled = status === CANCELLED;

            return (
                <Flex
                    key={id}
                    justifyContent="space-between"
                    alignItems="center"
                    p={30}
                    mb={12}
                    border="1px solid"
                    borderColor="divider.gray"
                    borderRadius={2}
                    opacity={isCancelled ? 0.5 : 1}
                >
                    <Flex alignItems="center" justifyContent="space-between">
                        <Box textAlign="center" fontSize={4} mr={35}>
                            <Text fontWeight="bold">
                                {moment(startTime).format('ddd, M/D/YY')}
                            </Text>
                            <Text fontWeight="light">
                                {moment(startTime).format('h:mm A')}
                            </Text>
                        </Box>
                        <Image
                            src={imageUrl || defaultUserImage}
                            alt={dentistName}
                            width={48}
                            height={48}
                            borderRadius="50%"
                            mr={35}
                        />
                        <Box>
                            <Text fontWeight="medium" fontSize={4}>
                                {dentistName}
                            </Text>
                            <Text fontWeight="light" fontSize={4}>
                                {officeName}
                            </Text>
                        </Box>
                    </Flex>
                    <Button
                        type="ghost"
                        border="none"
                        onClick={this.props.toggleModalState(id)}
                    >
                        <Text color="text.blue" fontSize={2}>
                            cancel
                        </Text>
                    </Button>
                </Flex>
            );
        });

    render() {
        const { appointments } = this.props;
        return (
            <Box>
                {!isEmpty(appointments) ? (
                    this.renderAppointments(appointments)
                ) : (
                    <NoAppointmentsCard text="You have no appointments yet!" />
                )}
            </Box>
        );
    }
}

const dentistShape = PropTypes.shape({
    user: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        imageUrl: PropTypes.string,
    }),
});

const reservationShape = PropTypes.shape({
    office: PropTypes.shape({
        name: PropTypes.string,
    }),
});

PatientAppointments.propTypes = {
    appointments: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            dentist: dentistShape,
            reservation: reservationShape,
            startTime: PropTypes.string,
            status: PropTypes.string,
        })
    ),
    toggleModalState: PropTypes.func,
};

export default PatientAppointments;
