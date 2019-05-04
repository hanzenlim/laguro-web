import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Onboarding } from '@laguro/the-bright-side-components';
import { Form, Field, withFormik, FieldArray, getIn } from 'formik';
import * as Yup from 'yup';
import { message } from 'antd';
import {
    Box,
    Text,
    Button,
    Flex,
    Grid,
    TimePicker,
    Tag,
    Icon,
    Card,
} from '../../../../components';
import { withScreenSizes } from '../../../../components/Responsive';
import moment from 'moment';
import _get from 'lodash/get';
import { ListingTime, ABBREVIATED_DAYS, DAYS } from '../../../../util/timeUtil';
import ListingRangePicker from '../../ListingRangePicker';

const format = 'ha';

const SELECTED_LOCATION_OPTIONS = [
    {
        key: '[0,1]',
        value: 'All preferred locations',
    },
    {
        key: '[0]',
        value: 'Preferred location 1',
    },
    {
        key: '[1]',
        value: 'Preferred location 2',
    },
];

const StyledRangePicker = styled(ListingRangePicker)`
    &&&& {
        width: 100%;
        .listing-range-picker-starting-date, .listing-range-picker-ending-date {
            font-size: 14px
            font-weight: 500;
            letter-spacing:-0.4px
            margin-bottom: 10px
        }
    }
`;

const getTimePickerField = props => innerProps => (
    <TimePickerField {...props} {...innerProps} />
);

const TimePickerField = props => {
    const { field, form, ...rest } = props;
    const fieldName = field.name;
    const hasError =
        getIn(form.touched, fieldName) && getIn(form.errors, fieldName);
    const errorMessage = !field.value
        ? 'This field is required'
        : _get(form.errors, fieldName);

    return (
        <Box className={hasError ? 'has-error' : ''} mb={15}>
            <TimePicker
                {...rest}
                px={30}
                py={12}
                format={format}
                height={52}
                use12Hours
                placeholder=""
                onChange={time => {
                    props.form.setFieldValue(props.field.name, time);
                }}
                value={props.field.value}
            />

            {hasError && <Onboarding.ValidationMessage text={errorMessage} />}
        </Box>
    );
};

const getFrequency = days => {
    // if monday, tuesday, friday => form will return [true, true, false, false, true, false, false] for repeatingDayBooleans
    const repeatingDayBooleans = ABBREVIATED_DAYS.map(d => days[d]);

    // now frequency is ['Monday', 'Tuesday']
    const frequency = DAYS.filter((d, i) => repeatingDayBooleans[i]);

    return frequency;
};

const RangePickerField = props => {
    const { field, form } = props;
    const fieldName = field.name;
    const hasError =
        _get(form.touched, fieldName) && _get(form.errors, fieldName);
    const errorMessage = _get(form.errors, fieldName);

    return (
        <Box mb={15}>
            <StyledRangePicker
                onDateChange={() => {}}
                disabledDate={currentDate => {
                    const today = moment()
                        .startOf('day')
                        .startOf('hour');
                    return currentDate.isBefore(today);
                }}
                onChange={date => {
                    props.form.setFieldValue(props.field.name, date);
                }}
                value={props.field.value}
            />

            {hasError && <Onboarding.ValidationMessage text={errorMessage} />}
        </Box>
    );
};

const { CheckableTag } = Tag;

const StyledCheckableTag = styled(CheckableTag)`
    &&.ant-tag-checkable {
        line-height: ${props => (props.desktopOnly ? '30px' : '41px')};
        border-radius: ${props => (props.desktopOnly ? '22.5px' : '50%')};
        border: none;
        background-color: #f5f5f5;
    }
`;

const DayPickerField = props => {
    const { desktopOnly } = props;

    return ABBREVIATED_DAYS.map(d => {
        let dayText = d.charAt(0).toUpperCase() + d.slice(1);

        if (!desktopOnly) {
            if (d === 'sat' || d === 'sun') {
                dayText = d.charAt(0).toUpperCase() + d.charAt(1);
            } else {
                dayText = d.charAt(0).toUpperCase();
            }
        }

        return (
            <StyledCheckableTag
                width={[40, '', 60]}
                height={[40, '', 30]}
                mr={8}
                mb={[5, '', 0]}
                borderRadius={['50%', '', '0']}
                checked={props.field.value && props.field.value[d]}
                onChange={isActive =>
                    props.form.setFieldValue(
                        `${props.field.name}.${d}`,
                        isActive
                    )
                }
                desktopOnly={desktopOnly}
            >
                {dayText}
            </StyledCheckableTag>
        );
    });
};

const StyledNextButton = styled(Button)`
    && {
        border-radius: 29.5px;
        border: 1px solid;
        font-size: 16px;
    }
`;

const DentistAvailabilityForm = props => (
    <Box mx={[-20, '', 0]}>
        <Form>
            <FieldArray
                name="availabilityList"
                render={arrayHelpers => (
                    <div>
                        {props.values.availabilityList.map(
                            (availability, index) => {
                                return (
                                    <Box key={index} mb="14px">
                                        <Card>
                                            {availability.isOpen ? (
                                                <Fragment>
                                                    <Flex
                                                        justifyContent="space-between"
                                                        alignItems="center"
                                                        mb={25}
                                                    >
                                                        <Text
                                                            fontSize={3}
                                                            fontWeight="500"
                                                            color="text.blue"
                                                        >
                                                            New availability
                                                        </Text>
                                                        {props.values
                                                            .availabilityList
                                                            .length > 1 && (
                                                            <Button
                                                                type="ghost"
                                                                height="auto"
                                                                onClick={() =>
                                                                    arrayHelpers.remove(
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                <Text
                                                                    fontSize={1}
                                                                    color="#3481f8"
                                                                >
                                                                    delete
                                                                </Text>
                                                            </Button>
                                                        )}
                                                    </Flex>
                                                    <Text
                                                        fontSize={1}
                                                        fontWeight="500"
                                                        letterSpacing="-0.4px"
                                                        color="text.black"
                                                        mb="10px"
                                                    >
                                                        Select locations
                                                    </Text>
                                                    <Field
                                                        name={`availabilityList.${index}.selectedLocations`}
                                                        placeholder="Selected Locations"
                                                        component={props => (
                                                            <Onboarding.SelectField
                                                                {...props}
                                                                options={SELECTED_LOCATION_OPTIONS.map(
                                                                    option => (
                                                                        <Onboarding.SelectOption
                                                                            value={
                                                                                option.key
                                                                            }
                                                                        >
                                                                            {
                                                                                option.value
                                                                            }
                                                                        </Onboarding.SelectOption>
                                                                    )
                                                                )}
                                                            />
                                                        )}
                                                    />
                                                    <Box mb={15}>
                                                        <Text
                                                            fontSize={1}
                                                            fontWeight="500"
                                                            letterSpacing="-0.4px"
                                                            color="text.black"
                                                            mb="10px"
                                                        >
                                                            Repeat on
                                                        </Text>
                                                        <Field
                                                            name={`availabilityList.${index}.days`}
                                                            component={withScreenSizes(
                                                                DayPickerField
                                                            )}
                                                        />
                                                    </Box>
                                                    <Grid
                                                        gridTemplateColumns={[
                                                            '100%',
                                                            '',
                                                            `64px 150px 64px 150px`,
                                                        ]}
                                                    >
                                                        <Text
                                                            fontSize={1}
                                                            fontWeight="500"
                                                            letterSpacing="-0.4px"
                                                            color="text.black"
                                                            mt={[0, '', 20]}
                                                            mb={10}
                                                        >
                                                            From
                                                        </Text>
                                                        <Field
                                                            name={`availabilityList.${index}.startTime`}
                                                            component={getTimePickerField(
                                                                {
                                                                    defaultOpenValue: moment()
                                                                        .startOf(
                                                                            'hour'
                                                                        )
                                                                        .hour(
                                                                            8
                                                                        ),
                                                                }
                                                            )}
                                                        />

                                                        <Text
                                                            fontSize={1}
                                                            fontWeight="500"
                                                            letterSpacing="-0.4px"
                                                            color="text.black"
                                                            mt={[0, '', 20]}
                                                            textAlign={[
                                                                'left',
                                                                '',
                                                                'center',
                                                            ]}
                                                            mb={10}
                                                        >
                                                            to
                                                        </Text>
                                                        <Field
                                                            name={`availabilityList.${index}.endTime`}
                                                            component={getTimePickerField(
                                                                {
                                                                    defaultOpenValue: moment()
                                                                        .startOf(
                                                                            'hour'
                                                                        )
                                                                        .hour(
                                                                            10
                                                                        ),
                                                                }
                                                            )}
                                                        />
                                                    </Grid>
                                                    <Field
                                                        name={`availabilityList.${index}.range`}
                                                        component={
                                                            RangePickerField
                                                        }
                                                    />
                                                </Fragment>
                                            ) : (
                                                <Button
                                                    type="ghost"
                                                    height="auto"
                                                    onClick={() => {
                                                        props.values.availabilityList.forEach(
                                                            (
                                                                availability,
                                                                index2
                                                            ) => {
                                                                if (
                                                                    index ===
                                                                    index2
                                                                ) {
                                                                    props.setFieldValue(
                                                                        `availabilityList.${index2}.isOpen`,
                                                                        true
                                                                    );
                                                                } else {
                                                                    props.setFieldValue(
                                                                        `availabilityList.${index2}.isOpen`,
                                                                        false
                                                                    );
                                                                }
                                                            }
                                                        );
                                                    }}
                                                >
                                                    <Box textAlign="left">
                                                        {props.values
                                                            .availabilityList[
                                                            index
                                                        ].selectedLocations && (
                                                            <Text
                                                                fontSize={3}
                                                                color="text.blue"
                                                                fontWeight="500"
                                                                mb="7px"
                                                            >
                                                                {
                                                                    SELECTED_LOCATION_OPTIONS.find(
                                                                        option =>
                                                                            props
                                                                                .values
                                                                                .availabilityList[
                                                                                index
                                                                            ]
                                                                                .selectedLocations ===
                                                                            option.key
                                                                    ).value
                                                                }
                                                            </Text>
                                                        )}
                                                        <ListingTime
                                                            startDate={
                                                                availability
                                                                    .range[0]
                                                            }
                                                            endDate={
                                                                availability
                                                                    .range[1]
                                                            }
                                                            startTime={
                                                                availability.startTime
                                                            }
                                                            endTime={
                                                                availability.endTime
                                                            }
                                                            frequency={getFrequency(
                                                                availability.days
                                                            )}
                                                            index={0}
                                                        />
                                                    </Box>
                                                </Button>
                                            )}
                                        </Card>
                                    </Box>
                                );
                            }
                        )}

                        <Button type="ghost" mt={16} ml={30}>
                            <Flex
                                height="22px"
                                onClick={() => {
                                    props.values.availabilityList.forEach(
                                        (availability, index) => {
                                            props.setFieldValue(
                                                `availabilityList.${index}.isOpen`,
                                                false
                                            );
                                        }
                                    );

                                    arrayHelpers.push({
                                        startTime: moment()
                                            .startOf('hour')
                                            .hour(8),
                                        endTime: moment()
                                            .startOf('hour')
                                            .hour(15),
                                        range: [
                                            moment()
                                                .startOf('day')
                                                .add(1, 'day'),
                                            null,
                                        ],
                                        selectedLocations: '',
                                        isOpen: true,
                                        days: {},
                                    });
                                }}
                                alignItems="center"
                            >
                                <Icon
                                    mr={16}
                                    type="plus"
                                    fontSize="14px"
                                    color="icon.black"
                                />
                                <Text
                                    fontSize={[1, '', 3]}
                                    letterSpacing="-0.5px"
                                >
                                    Add another availability
                                </Text>
                            </Flex>
                        </Button>
                    </div>
                )}
            />

            <Flex width="100%" justifyContent="center" mt={28}>
                <StyledNextButton
                    htmlType="submit"
                    loading={props.isSubmitting}
                    width={329}
                    height={50}
                    ghost={true}
                >
                    Save changes
                </StyledNextButton>
            </Flex>
        </Form>
    </Box>
);

DentistAvailabilityForm.defaultProps = {
    onSuccess: async () => {},
};

DentistAvailabilityForm.propTypes = {
    onSuccess: PropTypes.func.isRequired,
};

export default withFormik({
    validationSchema: Yup.object().shape({
        availabilityList: Yup.array()
            .of(
                Yup.object().shape({
                    selectedLocations: Yup.string().required(
                        'This field is required'
                    ),
                    startTime: Yup.date()
                        .required('This field is required')
                        .test(
                            'is start time valid',
                            'Start time should be before end time',
                            function(startTime) {
                                const { endTime } = this.parent;

                                if (!startTime) return false;

                                if (
                                    startTime.toString().split(' ')[4] >
                                    endTime.toString().split(' ')[4]
                                ) {
                                    return false;
                                }

                                return true;
                            }
                        ),
                    endTime: Yup.date()
                        .required('This field is required')
                        .test(
                            'is end time valid',
                            'End time should be after start time',
                            function(endTime) {
                                const { startTime } = this.parent;

                                if (!endTime) return false;

                                if (
                                    endTime.toString().split(' ')[4] <
                                    startTime.toString().split(' ')[4]
                                ) {
                                    return false;
                                }

                                return true;
                            }
                        ),
                    range: Yup.array().required('This field is required'),
                })
            )
            .required('Must have availability setting'),
    }),
    mapPropsToValues: props => {
        const { data } = props;
        return { ...data };
    },
    handleSubmit: async (values, actions) => {
        const result = await actions.props.onSuccess(values);
        actions.setSubmitting(false);

        if (result) {
            message.success('Availability settings successfully updated!');
        }
    },
})(DentistAvailabilityForm);
