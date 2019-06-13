import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Select as AntdSelect } from 'antd';
import { Field } from 'formik';
import moment from 'moment';

import { Box, Text } from '../../../components';
import { Select } from './CustomInputs';

const { Option } = AntdSelect;

// Month, day, year values
const months = [
    { name: 'January', value: '01' },
    { name: 'February', value: '02' },
    { name: 'March', value: '03' },
    { name: 'April', value: '04' },
    { name: 'May', value: '05' },
    { name: 'June', value: '06' },
    { name: 'July', value: '07' },
    { name: 'August', value: '08' },
    { name: 'September', value: '09' },
    { name: 'October', value: '10' },
    { name: 'November', value: '11' },
    { name: 'December', value: '12' },
];

const days = Array.from(Array(31), (_, index) =>
    index + 1 < 10 ? `0${(index + 1).toString()}` : (index + 1).toString()
);

const years = Array.from(Array(100), (_, index) =>
    (new Date().getFullYear() - index).toString()
);

// This function returns the value prop for month, day, and year

const getValueProp = ({ forHolder, form }) => {
    let monthPropValue = {};
    let dayPropValue = {};
    let yearPropValue = {};

    if (forHolder) {
        monthPropValue = form.values.holderBirthMonth
            ? { value: form.values.holderBirthMonth }
            : {};

        dayPropValue = form.values.holderBirthDay
            ? { value: form.values.holderBirthDay }
            : {};

        yearPropValue = form.values.holderBirthYear
            ? { value: form.values.holderBirthYear }
            : {};
    } else {
        monthPropValue = form.values.birthMonth
            ? { value: form.values.birthMonth }
            : {};

        dayPropValue = form.values.birthDay
            ? { value: form.values.birthDay }
            : {};

        yearPropValue = form.values.birthYear
            ? { value: form.values.birthYear }
            : {};
    }

    return { monthPropValue, dayPropValue, yearPropValue };
};

// this function checks if the birthdate value is Minor

const checkIfMinor = ({ form, forHolder }) => {
    let isMinor = false;

    if (forHolder) {
        const {
            values: { holderBirthMonth, holderBirthDay, holderBirthYear },
        } = form;

        if (holderBirthMonth && holderBirthDay && holderBirthYear) {
            const completeBirthDate = new Date(
                `${holderBirthMonth} ${holderBirthDay}, ${holderBirthYear}`
            ).toISOString();
            isMinor = moment().diff(completeBirthDate, 'years') < 18;
        }
    } else {
        const {
            values: { birthMonth, birthDay, birthYear },
        } = form;

        if (birthMonth && birthDay && birthYear) {
            const completeBirthDate = new Date(
                `${birthMonth} ${birthDay}, ${birthYear}`
            ).toISOString();
            isMinor = moment().diff(completeBirthDate, 'years') < 18;
        }
    }

    return isMinor;
};

// Component

const GetBirthday = ({ forHolder }) => (
    <Box mt={30}>
        <Field
            name={forHolder ? 'holderBirthMonth' : 'birthMonth'}
            render={({ form }) => {
                const { monthPropValue } = getValueProp({ form, forHolder });
                return (
                    <Box
                        id="birth-month-input"
                        mx="auto"
                        mb={10}
                        maxWidth={320}
                    >
                        <Select
                            {...monthPropValue}
                            placeholder="Month"
                            onChange={value =>
                                form.setFieldValue(
                                    forHolder
                                        ? 'holderBirthMonth'
                                        : 'birthMonth',
                                    value
                                )
                            }
                            getPopupContainer={() =>
                                document.getElementById('birth-month-input')
                            }
                        >
                            {months.map(month => (
                                <Option key={month.name} value={month.value}>
                                    {month.name}
                                </Option>
                            ))}
                        </Select>
                    </Box>
                );
            }}
        />

        <Field
            name={forHolder ? 'holderBirthDay' : 'birthDay'}
            render={({ form }) => {
                const { dayPropValue } = getValueProp({ form, forHolder });
                return (
                    <Box id="birth-day-input" mx="auto" mb={10} maxWidth={320}>
                        <Select
                            {...dayPropValue}
                            placeholder="Day"
                            onChange={value =>
                                form.setFieldValue(
                                    forHolder ? 'holderBirthDay' : 'birthDay',
                                    value
                                )
                            }
                            getPopupContainer={() =>
                                document.getElementById('birth-day-input')
                            }
                        >
                            {days.map(day => (
                                <Option key={day} value={day}>
                                    {day}
                                </Option>
                            ))}
                        </Select>
                    </Box>
                );
            }}
        />

        <Field
            name={forHolder ? 'holderBirthYear' : 'birthYear'}
            render={({ form }) => {
                const { yearPropValue } = getValueProp({ form, forHolder });
                const isMinor = checkIfMinor({ form, forHolder });
                return (
                    <Fragment>
                        <Box
                            id="birth-year-input"
                            mx="auto"
                            mb={20}
                            maxWidth={320}
                        >
                            <Select
                                {...yearPropValue}
                                placeholder="Year"
                                onChange={value =>
                                    form.setFieldValue(
                                        forHolder
                                            ? 'holderBirthYear'
                                            : 'birthYear',
                                        value
                                    )
                                }
                                getPopupContainer={() =>
                                    document.getElementById('birth-year-input')
                                }
                            >
                                {years.map(year => (
                                    <Option key={year} value={year}>
                                        {year}
                                    </Option>
                                ))}
                            </Select>
                        </Box>
                        {isMinor && (
                            <Text
                                color="#ea424c"
                                fontSize={0}
                                mx="auto"
                                maxWidth={320}
                                textAlign="left"
                            >
                                You must be at least 18 years old to continue.
                                If you are not, then please restart the quiz
                                using your legal guardian’s information.
                            </Text>
                        )}
                    </Fragment>
                );
            }}
        />
    </Box>
);

GetBirthday.propTypes = {
    forHolder: PropTypes.bool,
};

export default GetBirthday;
