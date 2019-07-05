import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import styled from 'styled-components';
import { height } from 'styled-system';
import moment from 'moment';
import { Formik } from 'formik';
import { Form, AutoComplete } from 'antd';
import DatePicker from '../../../../../components/DatePicker';
import {
    Box,
    Flex,
    Text,
    Select,
    Button,
    TextArea,
    Link,
    TimePicker,
} from '../../../../../components';

const NoAppointmentsMessage = () => (
    <Flex mt={20} justifyContent="center">
        <Link to="/dashboard/dentist?selectedTab=availability%20settings">
            <Text fontSize="14px" color="#3481f8">
                Click here to set your preferred locations before you can make
                an appointment.
            </Text>
        </Link>
    </Flex>
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

const TIMEPICKER_FORMAT = 'h:mma';

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
        const { preferredLocations, validate, onSubmit } = this.props;

        if (
            _get(preferredLocations, 'length') &&
            _get(preferredLocations, 'length') < 0
        ) {
            return <NoAppointmentsMessage />;
        }

        return (
            <Fragment>
                <Fragment>
                    <Formik
                        initialValues={{
                            patientName: '',
                            dentalOfficeId: _get(preferredLocations, '[0].id'),
                            selectedEndTime: '',
                            selectedStartTime: '',
                            selectedDate: '',
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
                                    setFieldValue(field, value.target.value);
                                } else {
                                    setFieldValue(field, value);
                                }
                            };

                            const handleLocationChange = field => (
                                value,
                                element
                            ) => {
                                // Set the location id
                                setFieldValue(field, element.props.id);
                            };

                            const handleTimeFieldChange = field => value => {
                                // Some element are input type while some are select type so we need
                                // to check which one has target.value.
                                const formattedTime = moment(value).format();
                                setFieldValue(field, formattedTime);
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
                                            {this.props.onClose && (
                                                <Text
                                                    fontSize={1}
                                                    my="15px"
                                                    mx="20px"
                                                    cursor="pointer"
                                                    onClick={this.props.onClose}
                                                >
                                                    x
                                                </Text>
                                            )}
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
                                                width="100%"
                                                height="45px"
                                                dataSource={
                                                    this.state.patientsName
                                                }
                                                onSelect={handleFieldChange(
                                                    'patientName'
                                                )}
                                                onSearch={this.onSearchPatient}
                                                placeholder="Enter patient's name here"
                                            />
                                            <Text
                                                mt="20px"
                                                fontWeight="medium"
                                                mb="5px"
                                                fontSize={0}
                                            >
                                                Dental office
                                            </Text>
                                            <Box>
                                                <Select
                                                    id="dentalOfficeName"
                                                    className="selectbaho"
                                                    width="100%"
                                                    defaultValue={_get(
                                                        preferredLocations,
                                                        '[0].name'
                                                    )}
                                                    onSelect={handleLocationChange(
                                                        'dentalOfficeId'
                                                    )}
                                                >
                                                    {preferredLocations.map(
                                                        location => (
                                                            <Select.Option
                                                                value={
                                                                    location.name
                                                                }
                                                                id={location.id}
                                                            >
                                                                {location.name}
                                                            </Select.Option>
                                                        )
                                                    )}
                                                </Select>
                                            </Box>
                                            <Text
                                                mt="20px"
                                                fontWeight="medium"
                                                mb="5px"
                                                fontSize={0}
                                            >
                                                Select a date
                                            </Text>
                                            <Box>
                                                <DatePicker
                                                    height="50px"
                                                    format="MM/DD/YYYY"
                                                    onDateChange={handleTimeFieldChange(
                                                        'selectedDate'
                                                    )}
                                                />
                                            </Box>
                                            <Text
                                                mt="20px"
                                                fontWeight="medium"
                                                mb="5px"
                                                fontSize={0}
                                            >
                                                Select a time
                                            </Text>
                                            <Flex
                                                flexDirection={[
                                                    'column',
                                                    'row',
                                                    'row',
                                                ]}
                                                alignItems={[
                                                    'flex-start',
                                                    'center',
                                                    'center',
                                                ]}
                                            >
                                                <TimePicker
                                                    px={30}
                                                    fontSize="14px"
                                                    padding="0 18px"
                                                    py={12}
                                                    height={52}
                                                    minuteStep={15}
                                                    use12Hours
                                                    format={TIMEPICKER_FORMAT}
                                                    onChange={handleTimeFieldChange(
                                                        'selectedStartTime'
                                                    )}
                                                    defaultOpenValue={moment().hour(
                                                        8
                                                    )}
                                                />
                                                <Text
                                                    mx={[0, 10, 10]}
                                                    mt={[20, 0, 0]}
                                                    mb={[5, 0, 0]}
                                                    fontSize={0}
                                                    fontWeight="medium"
                                                >
                                                    To
                                                </Text>
                                                <TimePicker
                                                    fontSize="14px"
                                                    padding="0 18px"
                                                    px={30}
                                                    py={12}
                                                    height={52}
                                                    minuteStep={15}
                                                    use12Hours
                                                    format={TIMEPICKER_FORMAT}
                                                    onChange={handleTimeFieldChange(
                                                        'selectedEndTime',
                                                        'HH:MM'
                                                    )}
                                                    defaultOpenValue={moment().hour(
                                                        8
                                                    )}
                                                />
                                            </Flex>

                                            <Text
                                                mt="20px"
                                                fontWeight="medium"
                                                mb="5px"
                                                fontSize={0}
                                            >
                                                Additional notes
                                            </Text>
                                            <TextArea
                                                height="140px"
                                                py={16}
                                                px={18}
                                                onChange={handleFieldChange(
                                                    'additionalNote'
                                                )}
                                                placeholder="Put your notes here ... "
                                            />
                                            {errors && (
                                                <Box mt="10px">
                                                    {renderErrorMessage(errors)}
                                                </Box>
                                            )}
                                            <Button
                                                mt="14px"
                                                width="100%"
                                                htmlType="submit"
                                            >
                                                Request confirmation
                                            </Button>
                                        </Box>
                                    </Form>
                                </Box>
                            );
                        }}
                    </Formik>
                </Fragment>
            </Fragment>
        );
    }
}

AppointmentFormView.propTypes = {
    appointments: PropTypes.array,
    onSelect: PropTypes.func,
    onClose: PropTypes.func.isRequired,
    validate: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    patientsName: PropTypes.arrayOf(
        PropTypes.shape({
            fullName: PropTypes.string,
            key: PropTypes.string,
        })
    ),
    preferredLocations: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
        })
    ),
};

export default AppointmentFormView;
