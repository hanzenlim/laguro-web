import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text, RangePicker, Form } from '../../../../components';

const { SubmitButton } = Form;

const FindAppointment = ({ onDateChange, onSubmit, disableButton }) => (
    <Box>
        <Text mb={6} lineHeight="22px" fontSize={2} color="text.black">
            dates
        </Text>
        <Form onSuccess={onSubmit}>
            <Box mb={28} width="100%">
                <RangePicker onChange={onDateChange} />
            </Box>
            <SubmitButton
                disabled={disableButton}
                width="100%"
                height="60px"
                fontSize={3}
                px={14}
                buttonText="Find appointment"
            />
        </Form>
    </Box>
);

FindAppointment.propTypes = {
    onDateChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    disableButton: PropTypes.bool.isRequired,
};
export default FindAppointment;
