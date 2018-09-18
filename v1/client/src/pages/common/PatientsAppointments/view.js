import React from 'react';
import PropTypes from 'prop-types';

import { Box, Text, Flex, Image, Button } from '../../../components';

const renderAppointments = appointments =>
    appointments.map(
        (
            { dateCreated, startTime, dentistPhoto, dentistName, officeName },
            index
        ) => (
            <Box mb={60} key={index}>
                <Text fontWeight="" fontSize={5} mb={32}>
                    {dateCreated} —
                </Text>
                <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    p={30}
                    mb={12}
                    border="1px solid"
                    borderColor="divider.gray"
                    borderRadius={2}
                >
                    <Flex alignItems="center" justifyContent="space-between">
                        <Text fontWeight="medium" fontSize={4} mr={35}>
                            {startTime}
                        </Text>
                        <Image
                            src={dentistPhoto}
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
                    <Button type="ghost" border="none">
                        <Text color="text.green" fontSize={2}>
                            cancel
                        </Text>
                    </Button>
                </Flex>
            </Box>
        )
    );

const PatientsAppointments = props => {
    const { appointments } = props;
    return (
        <Box>
            <Text color="text.green" fontSize={4} fontWeight="bold" mb={40}>
                upcoming appointments
            </Text>
            {appointments.length ? (
                renderAppointments(appointments)
            ) : (
                <Text textAlign="center" color="text.gray">
                    NO APPOINTMENTS
                </Text>
            )}
        </Box>
    );
};

PatientsAppointments.propType = {
    appointments: PropTypes.arrayOf(
        PropTypes.shape({
            dateCreated: PropTypes.string,
            startTime: PropTypes.string,
            dentistPhoto: PropTypes.string,
            dentistName: PropTypes.string,
            officeName: PropTypes.string,
        })
    ),
};

PatientsAppointments.defaultProps = {
    appointments: [
        {
            dateCreated: 'Tue, Aug 28, 2018',
            startTime: '5:30 PM',
            dentistPhoto:
                'https://cdn.filestackcontent.com/JXbUNxZqTLivfioMfCwV',
            dentistName: 'Dr. Will Choi',
            officeName: 'Bell Dental',
        },
    ],
};

export default PatientsAppointments;
