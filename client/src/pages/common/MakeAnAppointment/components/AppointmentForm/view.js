import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import styled from 'styled-components';
import { height } from 'styled-system';
import moment from 'moment';
import { Formik } from 'formik';
import { Form, AutoComplete } from 'antd';

import AppointmentTimeSlotGrid from '../AppointmentTimeSlotGrid';
import {
    Box,
    Flex,
    Text,
    Select,
    Button,
    TextArea,
} from '../../../../../components';

const NoAppointmentsMessage = () => (
    <Text
        textAlign="center"
        fontSize={[1, '', 3]}
        letterSpacing="-0.6px"
        color="text.black"
        mt={20}
    >
        Please reserve a chair first before making an appointment.
    </Text>
);

const StyledAutoComplete = styled(AutoComplete)`
    &&&& .ant-select-selection {
        ${height}
    }

    &&&& .ant-input {
        ${height}
    }
`;

const renderErrorMessage = errors =>
    Object.keys(errors).map(error => (
        <Text color="text.red">*{errors[error]}</Text>
    ));

class AppointmentFormView extends PureComponent {
    state = {
        patientsName: this.props.patientsName.map(value => value.fullName),
    };

    onSearchPatient = value => {
        const result = this.props.patientsName
            .map(patient => patient.fullName)
            .filter(patient => patient.match(value));

        this.setState({
            patientsName: !value ? [] : result,
        });
    };

    render() {
        const {
            appointments,
            selected,
            availableDateList,
            locationList,
            onSelectLocation,
            validate,
            onDateChange,
            onSubmit,
        } = this.props;

        return (
            <Fragment>
                {locationList.length && appointments.length > 0 ? (
                    <Fragment>
                        <Formik
                            initialValues={{
                                patientName: '',
                                dentalOfficeName: locationList[0],
                                appointmentDate: availableDateList[0].key,
                                selectedTime: '',
                                additionalNote: '',
                            }}
                            onSubmit={values => {
                                onSubmit(values);
                            }}
                            validate={validate}
                            validateOnChange={false}
                        >
                            {({ handleSubmit, setFieldValue, errors }) => {
                                const handleFieldChange = field => value => {
                                    // Some element are input type while some are select type so we need
                                    // to check which one has target.value.
                                    if (_get(value, 'target.value')) {
                                        setFieldValue(
                                            field,
                                            value.target.value
                                        );
                                    } else {
                                        setFieldValue(field, value);
                                    }
                                };

                                const handleLocationFieldChange = field => value => {
                                    onSelectLocation(value);
                                    setFieldValue(field, value);
                                };

                                const handleDateFieldChange = field => value => {
                                    onDateChange(value);
                                    setFieldValue(field, value);
                                };

                                return (
                                    <Box
                                        width="375px"
                                        border="1px solid"
                                        borderColor="background.lightGray"
                                        borderRadius="4px"
                                    >
                                        <Form onSubmit={handleSubmit}>
                                            <Flex
                                                justifyContent="space-between"
                                                borderBottom="1px solid"
                                                borderColor="background.lightGray"
                                            >
                                                <Text
                                                    fontSize={1}
                                                    fontWeight="bold"
                                                    my="15px"
                                                    mx="20px"
                                                >
                                                    Create a New Appointment
                                                </Text>
                                                <Text
                                                    fontSize={1}
                                                    my="15px"
                                                    mx="20px"
                                                >
                                                    x
                                                </Text>
                                            </Flex>
                                            <Box my="30px" mx="22px">
                                                <Text
                                                    fontWeight="medium"
                                                    mb="5px"
                                                    fontSize={0}
                                                >
                                                    Choose a patient
                                                </Text>
                                                <StyledAutoComplete
                                                    className="bahomo"
                                                    width="100%"
                                                    height="45px"
                                                    dataSource={
                                                        this.state.patientsName
                                                    }
                                                    onSelect={handleFieldChange(
                                                        'patientName'
                                                    )}
                                                    onSearch={
                                                        this.onSearchPatient
                                                    }
                                                    placeholder="Enter patient's name here"
                                                />
                                                <Text
                                                    mt="20px"
                                                    fontWeight="medium"
                                                    mb="5px"
                                                    fontSize={0}
                                                >
                                                    Dental Office
                                                </Text>
                                                <Box className="bahobox">
                                                    <Select
                                                        id="dentalOfficeName"
                                                        className="selectbaho"
                                                        width="100%"
                                                        defaultValue={
                                                            locationList[0]
                                                        }
                                                        onSelect={handleLocationFieldChange(
                                                            'dentalOfficeName'
                                                        )}
                                                    >
                                                        {locationList.map(
                                                            location => (
                                                                <Select.Option
                                                                    value={
                                                                        location
                                                                    }
                                                                >
                                                                    {location}
                                                                </Select.Option>
                                                            )
                                                        )}
                                                    </Select>
                                                </Box>
                                                {appointments.length > 0 && (
                                                    <Box>
                                                        <Text
                                                            mt="20px"
                                                            fontWeight="medium"
                                                            mb="5px"
                                                            fontSize={0}
                                                        >
                                                            Appointment Date and
                                                            Time
                                                        </Text>
                                                        <Box>
                                                            <Select
                                                                width="100%"
                                                                defaultValue={
                                                                    availableDateList[0]
                                                                        .key
                                                                }
                                                                onSelect={handleDateFieldChange(
                                                                    'appointmentDate'
                                                                )}
                                                            >
                                                                {availableDateList.map(
                                                                    item => {
                                                                        if (
                                                                            item.key ===
                                                                            'Today'
                                                                        )
                                                                            return (
                                                                                <Select.Option
                                                                                    value={
                                                                                        item.key
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        'Today'
                                                                                    }
                                                                                </Select.Option>
                                                                            );
                                                                        return (
                                                                            <Select.Option
                                                                                value={
                                                                                    item.key
                                                                                }
                                                                            >
                                                                                {moment(
                                                                                    item.value
                                                                                ).format(
                                                                                    'ddd, MM/DD/YYYY'
                                                                                )}
                                                                            </Select.Option>
                                                                        );
                                                                    }
                                                                )}
                                                            </Select>
                                                        </Box>
                                                    </Box>
                                                )}
                                                <AppointmentTimeSlotGrid
                                                    appointments={appointments}
                                                    selected={selected}
                                                    onSelect={handleFieldChange(
                                                        'selectedTime'
                                                    )}
                                                />
                                                <Text
                                                    mt="20px"
                                                    fontWeight="medium"
                                                    mb="5px"
                                                    fontSize={0}
                                                >
                                                    Additional Notes
                                                </Text>
                                                <TextArea
                                                    height="140px"
                                                    py={16}
                                                    px={18}
                                                    onChange={handleFieldChange(
                                                        'additionalNote'
                                                    )}
                                                    placeholder="Additional notes"
                                                />
                                                {errors && (
                                                    <Box mt="10px">
                                                        {renderErrorMessage(
                                                            errors
                                                        )}
                                                    </Box>
                                                )}
                                                {appointments.length > 0 && (
                                                    <Button
                                                        mt="14px"
                                                        width="100%"
                                                        htmlType="submit"
                                                    >
                                                        Submit
                                                    </Button>
                                                )}
                                                {appointments.length === 0 && (
                                                    <Text
                                                        textAlign="center"
                                                        fontSize={[1, '', 3]}
                                                        letterSpacing="-0.6px"
                                                        color="text.black"
                                                        mt={20}
                                                    >
                                                        You don&apos;t have an
                                                        existing reservation at
                                                        this location.
                                                    </Text>
                                                )}
                                            </Box>
                                        </Form>
                                    </Box>
                                );
                            }}
                        </Formik>
                    </Fragment>
                ) : (
                    <NoAppointmentsMessage />
                )}
            </Fragment>
        );
    }
}

AppointmentFormView.propTypes = {
    appointments: PropTypes.array,
    onSelect: PropTypes.func,
};

export default AppointmentFormView;
