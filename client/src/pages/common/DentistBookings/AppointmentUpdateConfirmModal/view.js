import React from 'react';
import styled from 'styled-components';
import { Modal, Text, Button, Box, Flex } from '../../../../components/index';

const StyledModal = styled(Modal)`
    && {
        .ant-modal-body {
            padding: 13px;
        }
    }
`;

const AppointmentUpdateConfirmModalView = props => {
    const { visible, onCancel, onConfirm, loading } = props;

    return (
        <StyledModal
            visible={visible}
            onCancel={onCancel}
            destroyOnClose
            width={535}
        >
            <Box>
                <Text fontWeight="bold" fontSize={1} textAlign="center" mb={33}>
                    Confirmation
                </Text>
                <Text fontSize={0} textAlign="center">
                    Would you like to move this appointment to a new time?
                </Text>
                <Text textAlign="center" fontSize={0} mb={43}>
                    This will send a time change request to the patient.
                </Text>
                <Flex justifyContent="center" alignItems="center" mb={21}>
                    <Button
                        loading={loading}
                        height="40px"
                        width={166}
                        onClick={onConfirm}
                        fontSize={0}
                        mr={3}
                    >
                        Yes
                    </Button>
                    <Button
                        ml={3}
                        ghost
                        height="40px"
                        width={166}
                        fontSize={0}
                        onClick={onCancel}
                    >
                        No
                    </Button>
                </Flex>
            </Box>
        </StyledModal>
    );
};

AppointmentUpdateConfirmModalView.defaultProps = {
    onConfirm: () => {},
    onCancel: () => {},
};

export default AppointmentUpdateConfirmModalView;
