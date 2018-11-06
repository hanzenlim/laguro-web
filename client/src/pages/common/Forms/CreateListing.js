import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import {
    Box,
    Button,
    Card,
    Grid,
    Flex,
    Icon,
    InnerForm,
    Input,
    RangePicker,
    Text,
    TimePicker,
    Counter,
} from '../../../components';
import ListingCard from '../ListingCard';
import { withScreenSizes } from '../../../components/Responsive';
import { renderPrice } from '../../../util/paymentUtil';

const { FormItem } = InnerForm;
const format = 'h:mm a';

const StyledForm = styled(InnerForm)`
    .ant-form-item {
        margin-bottom: 0px;
    }
`;

const StyledRangePicker = styled(RangePicker)`
    && {
        width: 100%;
    }
`;

const StyledCard = styled(Card)`
    ${props => !props.visible && `display: none;`};
`;
const StyledButton = styled(Button)`
    && {
        ${props => !props.visible && `display: none;`};
    }
`;

const rightArrowHeight = 16;
const rightArrowWidth = 1.25 * rightArrowHeight;

// This function is used by antd datepicker to determin which days are disabled.
const disabledDate = currentDate => {
    const today = moment()
        .startOf('day')
        .startOf('hour');
    return currentDate.isBefore(today);
};

const minPriceValidator = (rule, value, callback) => {
    if (!value) {
        callback('Price cannot less than $1.00');
        return;
    }

    // strip off the $ character
    const price = parseFloat(value.substring(1));
    // eslint-disable-next-line
    if (isNaN(price) || price < 1) {
        callback('Price cannot less than $1.00');
    }

    callback();
};

const priceValidator = (rule, value, callback) => {
    if (value === '$0.00') {
        callback('Price cannot be $0.00');
    }

    callback();
};

const chairsValidator = (rule, value, callback) => {
    if (value <= 0) {
        callback('Numbers of chairs cannot be less than 1');
    }

    callback();
};

class CreateListing extends Component {
    onChairCounterHandler = fieldName => chairCount => {
        this.props.form.setFieldsValue({
            [fieldName]: chairCount,
        });
        this.props.form.validateFields([fieldName]);
    };

    validateStartAndEndTime = (rule, value, callback) => {
        const index = this.props['data-index'];
        // const { options } = this.state;
        const { form, desktopOnly } = this.props;
        const startTime = form.getFieldValue(`startTime${index}`);
        const endTime = form.getFieldValue(`endTime${index}`);

        if (desktopOnly) {
            if (!startTime && rule.field.startsWith('startTime')) {
                return callback('Please select your daily start time');
            }

            if (!endTime && rule.field.startsWith('endTime')) {
                return callback('Please select your daily end time');
            }
        }

        if (rule.field.startsWith('endTime') && (!startTime || !endTime)) {
            return callback('Please select your daily start time and end time');
        }

        return callback();
    };

    render() {
        const { active, form, onDelete, desktopOnly, ...rest } = this.props;
        const values = form.getFieldsValue();
        const index = this.props['data-index'];
        const availability = values[`availability${index}`];
        const startDate = availability && availability[0];
        const endDate = availability && availability[1];
        const startTime = values[`startTime${index}`];
        const endTime = values[`endTime${index}`];

        return (
            <InnerForm form={form} {...rest}>
                <StyledButton
                    width="100%"
                    height="auto"
                    visible={!active}
                    type="ghost"
                    mb={10}
                >
                    <ListingCard
                        startDate={startDate}
                        endDate={endDate}
                        startTime={startTime}
                        endTime={endTime}
                        availableChairs={values[`numChairs${index}`]}
                        pricePerChair={values[`hourlyChairPrice${index}`]}
                        cleaningFee={values[`cleaningFee${index}`]}
                    />
                </StyledButton>
                <StyledCard mb={10} p={[20, '', 28]} visible={active} {...rest}>
                    <Box position="relative">
                        {this.props['data-index'] !== 0 && (
                            <Button
                                position="absolute"
                                right="0"
                                type="ghost"
                                data-index={this.props['data-index']}
                                onClick={onDelete}
                                height="40px"
                                zIndex="100"
                                // HACK (NOTE: AVOID USING MAGIC NUMBERS)
                                top={['-10px', '', '-5px']}
                            >
                                <Text fontSize={[0, '', 1]} color="text.blue">
                                    delete listing
                                </Text>
                            </Button>
                        )}

                        <StyledForm form={form}>
                            <FormItem
                                name={`availability${index}`}
                                label="Availability"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select your dates',
                                    },
                                ]}
                                input={
                                    <StyledRangePicker
                                        onDateChange={() => {}}
                                        disabledDate={disabledDate}
                                        width={608}
                                    />
                                }
                            />
                            <Grid
                                width="100%"
                                gridTemplateRows={['auto auto', '', 'auto']}
                                gridTemplateColumns={[
                                    '100%',
                                    '',
                                    `1fr ${rightArrowWidth}px 1fr`,
                                ]}
                                // position="absolute"
                                alignItems="center"
                                onClick={this.toggleDatePicker}
                            >
                                <Box
                                    width="100%"
                                    height={[100, '', 50]}
                                    position="absolute"
                                    border="1px solid"
                                    borderColor="divider.gray"
                                />
                                <Box
                                    width="100%"
                                    borderBottom={['1px solid', '', 'none']}
                                    borderColor="divider.gray"
                                >
                                    <FormItem
                                        form={form}
                                        mb="0"
                                        width="100%"
                                        name={`startTime${index}`}
                                        rules={[
                                            {
                                                validator: this
                                                    .validateStartAndEndTime,
                                            },
                                        ]}
                                        input={
                                            <TimePicker
                                                px={30}
                                                py={12}
                                                height={50}
                                                borderless
                                                defaultOpenValue={moment(
                                                    '12:00',
                                                    format
                                                )}
                                                use12Hours
                                                minuteStep={60}
                                                placeholder="Daily start time"
                                                format={format}
                                            />
                                        }
                                    />
                                </Box>

                                {/* width is 1.25 * rightArrowWidth */}
                                {/* Using <Desktop /> breaks the UI. Probably becuase of how form works */}
                                <Box display={['none', '', 'inline-block']}>
                                    <Icon
                                        type="rightForwardArrow"
                                        fontSize={`${rightArrowHeight}px`}
                                    />
                                </Box>

                                <FormItem
                                    form={form}
                                    mb="0"
                                    width="100%"
                                    name={`endTime${index}`}
                                    rules={[
                                        {
                                            validator: this
                                                .validateStartAndEndTime,
                                        },
                                    ]}
                                    input={
                                        <TimePicker
                                            px={30}
                                            py={12}
                                            height={50}
                                            borderless
                                            defaultOpenValue={moment(
                                                '12:00',
                                                format
                                            )}
                                            use12Hours
                                            minuteStep={60}
                                            placeholder="Daily end time"
                                            format={format}
                                        />
                                    }
                                />
                            </Grid>

                            <Flex
                                mt={22}
                                flexDirection={['row', '', 'column']}
                                justifyContent="space-between"
                            >
                                <Text
                                    fontSize={[1, '', 3]}
                                    letterSpacing="-0.4px"
                                    mr={[20, '', 0]}
                                >
                                    Number of Chairs Available
                                </Text>

                                <Box position="relative" left="-10px">
                                    <Counter
                                        onCounterCountHandler={this.onChairCounterHandler(
                                            `numChairs${index}`
                                        )}
                                    />
                                </Box>
                            </Flex>

                            <FormItem
                                name={`numChairs${index}`}
                                initialValue={1}
                                rules={[
                                    {
                                        required: true,
                                        validator: chairsValidator,
                                        message: 'Please enter a vaild number',
                                    },
                                ]}
                                input={<Input type="hidden" />}
                            />

                            <Grid
                                gridTemplateColumns={['100%', '', '1fr 1fr']}
                                gridColumnGap="44px"
                                gridTemplateRows={['auto auto', '', 'auto']}
                            >
                                <FormItem
                                    name={`hourlyChairPrice${index}`}
                                    tooltip="The cost of booking a chair on an hourly basis."
                                    label="Hourly Chair Price"
                                    getValueFromEvent={e => {
                                        if (!e || !e.target) {
                                            return e;
                                        }
                                        const { target } = e;
                                        return target.type === 'checkbox'
                                            ? target.checked
                                            : renderPrice(target.value);
                                    }}
                                    rules={[
                                        {
                                            required: true,
                                            validator: minPriceValidator,
                                            message:
                                                'Please enter a value no less than $1.00',
                                        },
                                    ]}
                                    input={
                                        <Input
                                            placeholder="$0.00"
                                            textAlign="right"
                                            height="50px"
                                        />
                                    }
                                />

                                <FormItem
                                    name={`cleaningFee${index}`}
                                    label="Cleaning fee"
                                    tooltip="The total cost that the Host will charge for cleaning the chair and equipments after the Dentist is done. Rates will vary."
                                    getValueFromEvent={e => {
                                        if (!e || !e.target) {
                                            return e;
                                        }
                                        const { target } = e;
                                        return target.type === 'checkbox'
                                            ? target.checked
                                            : renderPrice(target.value);
                                    }}
                                    rules={[
                                        {
                                            required: true,
                                            validator: priceValidator,
                                            message:
                                                'Please enter a value greater than $0.00',
                                        },
                                    ]}
                                    input={
                                        <Input
                                            placeholder="$0.00"
                                            textAlign="right"
                                            height="50px"
                                        />
                                    }
                                />
                            </Grid>
                        </StyledForm>
                    </Box>
                </StyledCard>
            </InnerForm>
        );
    }
}

export default withScreenSizes(CreateListing);
