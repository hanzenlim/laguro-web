import React from 'react';
import PropTypes from 'prop-types';

import { Modal, Text, Button, Box, Flex } from '../../../../components';

const EditListingModal = props => {
    const { visible, onCancel, onSubmit } = props;

    return (
        <Modal visible={visible} onCancel={onCancel} destroyOnClose width={550}>
            <Box py={10} px={50}>
                <Text
                    fontSize={20}
                    fontWeight="light"
                    textAlign="center"
                    mb={18}
                >
                    edit listings
                </Text>
                <Text fontSize={3} textAlign="center" mb={28}>
                    Would you like to edit your listing? You will be redirected
                    to another page.
                </Text>
                <Flex mt={47} justifyContent="center">
                    <Button
                        type="ghost"
                        inverted
                        height="60px"
                        width={188}
                        onClick={onCancel}
                        fontWeight="bold"
                        fontSize={3}
                        mr={20}
                    >
                        Cancel
                    </Button>
                    <Button
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

EditListingModal.defaultProps = {
    onSubmit: () => {},
    onCancel: () => {},
};

EditListingModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default EditListingModal;
