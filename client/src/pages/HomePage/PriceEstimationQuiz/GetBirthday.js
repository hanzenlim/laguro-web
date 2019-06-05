import React, { Fragment } from 'react';
import { Select as AntdSelect } from 'antd';
import { Field } from 'formik';
import moment from 'moment';

import { Box, Text } from '../../../components';
import { Select } from './CustomInputs';

const { Option } = AntdSelect;

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

const days = Array.from(Array(31), (_, index) => (index + 1).toString());

const years = Array.from(Array(100), (_, index) =>
    (new Date().getFullYear() - index).toString()
);

const GetBirthday = () => (
    <Box mt={30}>
        <Field
            name="holderBirthMonth"
            render={({ form }) => (
                <Box id="birth-month-input" mx="auto" mb={10} maxWidth={320}>
                    <Select
                        {...(form.values.holderBirthMonth
                            ? { value: form.values.holderBirthMonth }
                            : {})}
                        placeholder="Month"
                        onChange={value =>
                            form.setFieldValue('holderBirthMonth', value)
                        }
                        getPopupContainer={() =>
                            document.getElementById('birth-month-input')
                        }
                    >
                        {months.map(month => (
                            <Option key={month} value={month}>
                                {month}
                            </Option>
                        ))}
                    </Select>
                </Box>
            )}
        />

        <Field
            name="holderBirthDay"
            render={({ form }) => (
                <Box id="birth-day-input" mx="auto" mb={10} maxWidth={320}>
                    <Select
                        {...(form.values.holderBirthDay
                            ? { value: form.values.holderBirthDay }
                            : {})}
                        placeholder="Day"
                        onChange={value =>
                            form.setFieldValue('holderBirthDay', value)
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
            )}
        />

        <Field
            name="holderBirthYear"
            render={({ form }) => {
                const {
                    values: {
                        holderBirthMonth,
                        holderBirthDay,
                        holderBirthYear,
                    },
                } = form;

                let isMinor = false;

                if (holderBirthMonth && holderBirthDay && holderBirthYear) {
                    const completeBirthDate = new Date(
                        `${holderBirthMonth} ${holderBirthDay}, ${holderBirthYear}`
                    ).toISOString();

                    isMinor = moment().diff(completeBirthDate, 'years') < 18;
                }

                return (
                    <Fragment>
                        <Box
                            id="birth-year-input"
                            mx="auto"
                            mb={20}
                            maxWidth={320}
                        >
                            <Select
                                {...(form.values.holderBirthYear
                                    ? { value: form.values.holderBirthYear }
                                    : {})}
                                placeholder="Year"
                                onChange={value =>
                                    form.setFieldValue('holderBirthYear', value)
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

GetBirthday.propTypes = {};

export default GetBirthday;
