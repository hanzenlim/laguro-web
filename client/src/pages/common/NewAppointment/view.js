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
            <Flex flexDirection="column" mt="30px" justifyContent="center">
                <CheckMarkAnimation />
                <Text textAlign="center">Appointment has been made</Text>
                <Button
                    width="80%"
                    mx="auto"
                    onClick={onMakeAnotherAppt}
                    mt="10px"
                >
                    Make another appointment
                </Button>
            </Flex>
        </Box>
    </Fragment>
);
const NewAppointmentView = ({ showForm, onMakeAnotherAppt, ...rest }) => (
    <Fragment>
        {showForm ? (
            <AppointmentForm {...rest} />
        ) : (
            renderAppointmentSuccess(onMakeAnotherAppt)
        )}
    </Fragment>
);

export default NewAppointmentView;
