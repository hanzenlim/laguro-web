import React from 'react';
import PropTypes from 'prop-types';

import { Modal, Text, Button, Box, Flex } from '../../../../components';

const CancelReservationModal = props => {
    const { visible, onCancel, onSubmit, loading } = props;

    return (
        <Modal visible={visible} onCancel={onCancel} destroyOnClose width={760}>
            <Box p={40}>
                <Text
                    fontSize={5}
                    borderBottom="2px solid"
                    borderColor="divider.gray"
                    mb={35}
                >
                    Cancel Reservation
                </Text>
                <Text fontSize={4} fontWeight="medium" mb={20}>
                    Are you sure you want to cancel this reservation?
                </Text>
                <Text fontSize={2} color="text.gray">
                    * For a full refund of accommodation fees, cancellation must
                    be made a full 24 hours prior to listing’s local check in
                    time.
                </Text>
                <Flex mt={47} justifyContent="flex-end" alignItems="center">
                    <Button
                        type="ghost"
                        height="60px"
                        width={250}
                        onClick={onCancel}
                        mr={16}
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
                            Cancel
                        </Text>
                    </Button>
                    <Button
                        loading={loading}
                        height="60px"
                        width={250}
                        onClick={onSubmit}
                        fontWeight="bold"
                        fontSize={3}
                    >
                        Okay
                    </Button>
                </Flex>
            </Box>
        </Modal>
    );
};

CancelReservationModal.defaultProps = {
    onSubmit: () => {},
    onCancel: () => {},
};

CancelReservationModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool,
};

export default CancelReservationModal;
