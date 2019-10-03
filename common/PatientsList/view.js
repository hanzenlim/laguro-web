import React from 'react';
import PropTypes from 'prop-types';

import { Box, Input, Icon } from '~/components';
import { ContainerPaddingInPixels } from '~/components/Container';
import PatientCard from './PatientCard';

const PatientsList = props => {
    const {
        dentistId,
        patients,
        onFilterPatients,
        uploadPolicySignature,
    } = props;
    return (
        <Box>
            <Box
                px={[ContainerPaddingInPixels, '', 0]}
                mt={[8, '', 0]}
                mb={20}
                position="relative"
            >
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
                    right={[50, '', 25]}
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
                            uploadPolicySignature={uploadPolicySignature}
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
    patientImages: PropTypes.arrayOf(
        PropTypes.shape({
            imageUrl: PropTypes.string.isRequired,
            signedImageUrl: PropTypes.string.isRequired,
        })
    ),
}).isRequired;

const uploadPolicySignatureShape = PropTypes.shape({
    policy: PropTypes.string.isRequired,
    signature: PropTypes.string.isRequired,
}).isRequired;

PatientsList.propTypes = {
    dentistId: PropTypes.string.isRequired,
    onFilterPatients: PropTypes.func.isRequired,
    patients: PropTypes.arrayOf(patientShape),
    uploadPolicySignature: uploadPolicySignatureShape,
};

export default PatientsList;
