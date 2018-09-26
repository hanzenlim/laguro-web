import React from 'react';
import PropTypes from 'prop-types';

import { Modal, Text, Button, Box, Flex } from '../../../../components';

const CancelListingModal = props => {
    const { visible, onCancel, onSubmit, loading } = props;

    return (
        <Modal visible={visible} onCancel={onCancel} destroyOnClose width={550}>
            <Box py={27} px={75} textAlign="center">
                <Text
                    fontSize={4}
                    fontWeight="light"
                    textAlign="center"
                    mb={18}
                >
                    delete listing
                </Text>
                <Text fontSize={3} mb={20}>
                    Are you sure you want to delete this listing?
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
                            color="text.green"
                            border="2px solid"
                            borderColor="divider.green"
                            borderRadius="4px"
                            lineHeight="54px"
                        >
                            Cancel
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

CancelListingModal.defaultProps = {
    onSubmit: () => {},
    onCancel: () => {},
};

CancelListingModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool,
};

export default CancelListingModal;
