import React, { Fragment } from 'react';
import AppointmentForm from './components/AppointmentForm';
import {
    Text,
    Button,
    CheckMarkAnimation,
    Box,
    Flex,
} from '../../../components';

const renderAppointmentSuccess = onMakeAnotherAppt => (
    <Fragment>
        <Box
            width="375px"
            border="1px solid"
            borderColor="background.lightGray"
            borderRadius="4px"
        >
            <Flex flexDirection="column" my="30px" justifyContent="center">
                <CheckMarkAnimation />
                <Text textAlign="center">Appointment confirmation requested</Text>
                <Button
                    width="80%"
                    mx="auto"
                    onClick={onMakeAnotherAppt}
                    my="10px"
                >
                    Make another appointment
                </Button>
            </Flex>
        </Box>
    </Fragment>
);
const NewAppointmentView = ({
    showConfirmationMessage,
    onMakeAnotherAppt,
    ...rest
}) => (
    <Fragment>
        {showConfirmationMessage ? (
            renderAppointmentSuccess(onMakeAnotherAppt)
        ) : (
            <AppointmentForm {...rest} />
        )}
    </Fragment>
);

export default NewAppointmentView;
