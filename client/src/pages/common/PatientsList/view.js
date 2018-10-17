import React from 'react';
import PropTypes from 'prop-types';

import { Box, Text, Input, Icon } from '../../../components';
import PatientCard from './PatientCard';

const PatientsList = props => {
    const { dentistId, patients, onFilterPatients } = props;
    return (
        <Box>
            <Text mb={22} color="text.blue" fontSize={4} fontWeight="bold">
                My Patients
            </Text>
            <Box mb={20} position="relative">
                <Input
                    height={50}
                    borderRadius={30}
                    pr={50}
                    pl={25}
                    onChange={onFilterPatients(patients)}
                />
                <Icon
                    type="search"
                    color="blue"
                    fontSize={3}
                    position="absolute"
                    top={17}
                    right={25}
                />
            </Box>
            <Box>
                {patients.map(
                    ({
                        id,
                        name,
                        imageUrl,
                        visitDate,
                        patientImages,
                        hasNextAppointment,
                    }) => (
                        <PatientCard
                            key={id}
                            dentistId={dentistId}
                            patientId={id}
                            name={name}
                            imageUrl={imageUrl}
                            visitDate={visitDate}
                            patientImages={patientImages}
                            hasNextAppointment={hasNextAppointment}
                        />
                    )
                )}
            </Box>
        </Box>
    );
};

const patientShape = PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    visitDate: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    patientImages: PropTypes.arrayOf(PropTypes.string.isRequired),
}).isRequired;

PatientsList.propTypes = {
    dentistId: PropTypes.string.isRequired,
    onFilterPatients: PropTypes.func.isRequired,
    patients: PropTypes.arrayOf(patientShape),
};

export default PatientsList;
