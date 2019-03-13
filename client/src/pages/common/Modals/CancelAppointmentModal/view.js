import React from 'react';
import PropTypes from 'prop-types';

import { Modal, Text, Button, Box, Flex } from '../../../../components';

const CancelAppointmentModal = props => {
    const { visible, onCancel, onSubmit, loading } = props;

    return (
        <Modal visible={visible} onCancel={onCancel} destroyOnClose width={550}>
            <Box py={27} px={75} textAlign="center">
                <Text
                    fontSize={4}
                    fontWeight="light"
                    textAlign="center"
                    mb={35}
                >
                    cancel appointment
                </Text>
                <Text fontSize={3} mb={20}>
                    Would you like to cancel this appoinment?
                </Text>
                <Flex justifyContent="flex-end" alignItems="center">
                    <Button
                        type="ghost"
                        height="60px"
                        width={188}
                        onClick={onCancel}
                        mr={20}
                    >
                        <Text
                            fontWeight="bold"
                            fontSize={3}
                            color="text.blue"
                            border="2px solid"
                            borderColor="divider.blue"
                            borderRadius="4px"
                            lineHeight="54px"
                        >
                            No
                        </Text>
                    </Button>
                    <Button
                        loading={loading}
                        height="60px"
                        width={188}
                        onClick={onSubmit}
                        fontWeight="bold"
                        fontSize={3}
                    >
                        Yes
                    </Button>
                </Flex>
            </Box>
        </Modal>
    );
};

CancelAppointmentModal.defaultProps = {
    onSubmit: () => {},
    onCancel: () => {},
};

CancelAppointmentModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool,
};

export default CancelAppointmentModal;
