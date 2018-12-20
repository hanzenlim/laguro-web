import React from 'react';
import PropTypes from 'prop-types';

import { Modal, Text, Button, Box, Flex, Icon } from '../../../components';

const DeclineAppointmentRequestModalView = props => {
    const { visible, onCancel, onSubmit, loading } = props;

    return (
        <Modal visible={visible} onCancel={onCancel} destroyOnClose width={760}>
            <Box p={40}>
                <Flex mt={30} justifyContent="center" alignItems="center">
                    <Icon
                        textAlign="center"
                        type="exclamation"
                        width="108px"
                        height="90px"
                    />
                </Flex>
                <Text textAlign="center" fontSize={4} mt={35} mb={20}>
                    Would you like to decline this appointment?
                </Text>
                <Flex mt={30} justifyContent="space-around" alignItems="center">
                    <Button
                        loading={loading}
                        height="60px"
                        width={250}
                        onClick={onSubmit}
                        fontWeight="bold"
                        fontSize={3}
                    >
                        Yes
                    </Button>
                    <Button
                        type="ghost"
                        height="60px"
                        width={250}
                        onClick={onCancel}
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
                </Flex>
            </Box>
        </Modal>
    );
};

DeclineAppointmentRequestModalView.defaultProps = {
    onSubmit: () => {},
    onCancel: () => {},
};

DeclineAppointmentRequestModalView.propTypes = {
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool,
};

export default DeclineAppointmentRequestModalView;
