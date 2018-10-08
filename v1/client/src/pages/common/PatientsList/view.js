import React from 'react';

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
                    ({ id, name, imageUrl, lastVisit, patientImages }) => (
                        <PatientCard
                            key={id}
                            dentistId={dentistId}
                            patientId={id}
                            name={name}
                            imageUrl={imageUrl}
                            lastVisit={lastVisit}
                            patientImages={patientImages}
                        />
                    )
                )}
            </Box>
        </Box>
    );
};

export default PatientsList;
