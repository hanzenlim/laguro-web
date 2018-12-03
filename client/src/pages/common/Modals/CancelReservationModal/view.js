import React from 'react';
import PropTypes from 'prop-types';

import { Modal, Text, Button, Box, Flex } from '../../../../components';

const CancelReservationModal = props => {
    const { visible, onCancel, onSubmit, loading } = props;

    return (
        <Modal visible={visible} onCancel={onCancel} destroyOnClose width={760}>
            <Box p={40}>
                <Text
                    fontSize={[3, '', 4]}
                    borderBottom="2px solid"
                    borderColor="divider.gray"
                    mb={35}
                >
                    Cancel Booking
                </Text>
                <Text fontSize={[1, '', 3]} fontWeight="medium" mb={20}>
                    Are you sure you want to cancel this booking?
                </Text>
                <Text ffontSize={[0, '', 2]} color="text.darkGray">
                    * For a full refund of accommodation fees, cancellation must
                    be made a full 24 hours prior to booking's local check in
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
                            fontSize={[1, '', 3]}
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
                        fontSize={[1, '', 3]}
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
