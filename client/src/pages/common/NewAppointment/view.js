import React, { Fragment } from 'react';
import AppointmentForm from './components/AppointmentForm';
import {
    Text,
    Button,
    CheckMarkAnimation,
    Box,
    Flex,
    Icon,
} from '../../../components';

const AppointmentSuccess = props => (
    <Fragment>
        <Box
            width="375px"
            border="1px solid"
            borderColor="background.lightGray"
            borderRadius="4px"
        >
            <Box position="absolute" right="20px" top="20px">
                {props.onClose && (
                    <Button
                        type="ghost"
                        onClick={props.onClose}
                        height="auto"
                        color="#303549"
                    >
                        <Icon type="close-circle" />
                    </Button>
                )}
            </Box>
            <Flex flexDirection="column" my="30px" justifyContent="center">
                <CheckMarkAnimation />
                <Text textAlign="center">
                    Appointment confirmation requested
                </Text>
                <Button
                    width="80%"
                    mx="auto"
                    onClick={props.onMakeAnotherAppt}
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
    onClose,
    ...rest
}) => (
    <Fragment>
        {showConfirmationMessage ? (
            <AppointmentSuccess
                onMakeAnotherAppt={onMakeAnotherAppt}
                onClose={onClose}
            />
        ) : (
            <AppointmentForm onClose={onClose} {...rest} />
        )}
    </Fragment>
);

export default NewAppointmentView;
