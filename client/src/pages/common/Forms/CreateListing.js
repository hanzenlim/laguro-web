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
import { renderPrice } from '../../../util/paymentUtil';

const { GridItem } = Grid;
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

    render() {
        const { active, form, onDelete, ...rest } = this.props;
        const values = form.getFieldsValue();
        const index = this.props['data-index'];
        const availability = values[`availability${index}`];
        const startDate = availability && availability[0];
        const endDate = availability && availability[1];

        return (
            <InnerForm form={form} {...rest}>
                <StyledButton
                    width="100%"
                    height="auto"
                    visible={!active}
                    type="ghost"
                    mb={10}
                >
                    {/* TODO: Make props here explicit */}
                    <Card {...rest}>
                        <Flex justifyContent="space-between">
                            <Flex
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Text
                                    fontSize={3}
                                    lineHeight={1}
                                    mr={50}
                                    letterSpacing="-0.6px"
                                    color="text.black"
                                >
                                    {(startDate &&
                                        moment(startDate).format('ddd M/DD')) ||
                                        'Start date'}
                                </Text>
                                <Icon
                                    type="rightForwardArrow"
                                    fontSize={2}
                                    mr={50}
                                />
                                <Text
                                    fontSize={3}
                                    lineHeight={1}
                                    letterSpacing="-0.6px"
                                    color="text.black"
                                >
                                    {(endDate &&
                                        moment(endDate).format('ddd M/DD')) ||
                                        'End date'}
                                </Text>
                            </Flex>
                            <Flex>
                                <Flex flexDirection="column" mr={10}>
                                    <Text
                                        fontWeight="medium"
                                        fontSize={2}
                                        lineHeight="18px"
                                        letterSpacing="-0.4px"
                                        color="text.blue"
                                        textAlign="right"
                                    >
                                        {values[`numChairs${index}`] || '0'}
                                    </Text>
                                    <Text
                                        fontWeight="medium"
                                        fontSize={2}
                                        lineHeight="18px"
                                        letterSpacing="-0.4px"
                                        color="text.blue"
                                        textAlign="right"
                                    >
                                        {values[`hourlyChairPrice${index}`] ||
                                            '$0'}
                                    </Text>
                                    <Text
                                        fontWeight="medium"
                                        fontSize={2}
                                        lineHeight="18px"
                                        letterSpacing="-0.4px"
                                        color="text.blue"
                                        textAlign="right"
                                    >
                                        {values[`cleaningFee${index}`] || '$0'}
                                    </Text>
                                </Flex>
                                <Flex flexDirection="column">
                                    <Text
                                        fontWeight="light"
                                        fontSize={2}
                                        lineHeight="18px"
                                        letterSpacing="-0.4px"
                                        color="text.black"
                                        textAlign="left"
                                    >
                                        available chairs
                                    </Text>
                                    <Text
                                        fontWeight="light"
                                        fontSize={2}
                                        lineHeight="18px"
                                        letterSpacing="-0.4px"
                                        color="text.black"
                                        textAlign="left"
                                    >
                                        per chair
                                    </Text>
                                    <Text
                                        fontWeight="light"
                                        fontSize={2}
                                        lineHeight="18px"
                                        letterSpacing="-0.4px"
                                        color="text.black"
                                        textAlign="left"
                                    >
                                        cleaning fee
                                    </Text>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Card>
                </StyledButton>
                <StyledCard mb={10} visible={active} {...rest}>
                    <Box maxWidth="620px" position="relative">
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
                                top="-5px"
                            >
                                <Text fontSize={1} color="text.blue">
                                    delete listing
                                </Text>
                            </Button>
                        )}

                        <StyledForm form={form}>
                            <Grid
                                gtc="282px 22px 22px 282px"
                                alignItems="center"
                            >
                                <GridItem gc="all">
                                    <FormItem
                                        name={`availability${index}`}
                                        label="Availability"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please select your dates',
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
                                </GridItem>

                                <GridItem gc="all" mb={40}>
                                    <Flex position="relative">
                                        <Box
                                            width="100%"
                                            height="50px"
                                            position="absolute"
                                            border="1px solid #dbdbdb"
                                        />
                                        <FormItem
                                            form={form}
                                            width={`calc((100% - ${rightArrowWidth}px) / 2)`}
                                            name={`startTime${index}`}
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please select your daily start time',
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

                                        {/* width is 1.25 * rightArrowWidth */}
                                        <Icon
                                            lineHeight="50px"
                                            type="rightForwardArrow"
                                            fontSize={`${rightArrowHeight}px`}
                                        />

                                        <FormItem
                                            form={form}
                                            width={`calc((100% - ${rightArrowWidth}px) / 2)`}
                                            name={`endTime${index}`}
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please select your daily end time',
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
                                    </Flex>
                                </GridItem>

                                <GridItem gc="all">
                                    <Text fontSize={3}>
                                        Number of Chairs Available
                                    </Text>
                                    <Box position="relative" left="-10px">
                                        <Counter
                                            onCounterCountHandler={this.onChairCounterHandler(
                                                `numChairs${index}`
                                            )}
                                        />
                                    </Box>
                                    <FormItem
                                        name={`numChairs${index}`}
                                        initialValue={1}
                                        rules={[
                                            {
                                                required: true,
                                                validator: chairsValidator,
                                                message:
                                                    'Please enter a vaild number',
                                            },
                                        ]}
                                        input={<Input type="hidden" />}
                                    />
                                </GridItem>

                                <GridItem gc="1 / 2">
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
                                </GridItem>

                                <GridItem gc="4 / 5">
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
                                </GridItem>
                            </Grid>
                        </StyledForm>
                    </Box>
                </StyledCard>
            </InnerForm>
        );
    }
}

export default CreateListing;