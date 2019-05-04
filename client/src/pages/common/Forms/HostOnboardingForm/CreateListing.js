import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import {
    Box,
    Button,
    Card,
    Grid,
    Flex,
    InnerForm,
    Input,
    Tag,
    Text,
    TimePicker,
    Counter,
} from '../../../../components';
import ListingCard from '../../ListingCard';
import { withScreenSizes } from '../../../../components/Responsive';
import { ABBREVIATED_DAYS, DAYS } from '../../../../util/timeUtil';
import ListingRangePicker from '../../ListingRangePicker';
import { ListingPlan } from '../../ListingPlan';

const TIMEPICKER_FORMAT = 'ha';
const { FormItem } = InnerForm;
const { CheckableTag } = Tag;

const DEFAULT_DAYS = ABBREVIATED_DAYS.slice(0, 5);
const DEFAULT_START_TIME = moment('08:00', TIMEPICKER_FORMAT);
const DEFAULT_END_TIME = moment('17:00', TIMEPICKER_FORMAT);

const StyledFormItem = styled(FormItem)`
    height: 20px;
`;

const StyledForm = styled(InnerForm)`
    .ant-form-item {
        margin-bottom: 0px;
    }
`;

const StyledRangePicker = styled(ListingRangePicker)`
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

        const StyledCheckableTag = styled(CheckableTag)`
            &&.ant-tag-checkable {
                line-height: ${desktopOnly ? '30px' : '41px'}
                border-radius: ${desktopOnly ? '22.5px' : '0'};
                border: ${desktopOnly ? 'none' : 'solid 0.1px #dbdbdb'};
                background-color: ${props =>
                    desktopOnly
                        ? props.theme.colors.background.whiteSmoke
                        : props.theme.colors.background.white};
            }
        `;

        const values = form.getFieldsValue();
        const index = this.props['data-index'];
        const availability = values[`availability${index}`];
        const startDate = availability && availability[0];
        const endDate = availability && availability[1];
        const startTime = values[`startTime${index}`];
        const endTime = values[`endTime${index}`];
        const category = values[`plan${index}`];

        // if monday, tuesday, friday => form will return [true, true, false, false, true, false, false] for repeatingDayBooleans
        const repeatingDayBooleans = ABBREVIATED_DAYS.map(
            d => values[`${d}${index}`]
        );

        // now frequency is ['Monday', 'Tuesday']
        const frequency = DAYS.filter((d, i) => repeatingDayBooleans[i]);

        return (
            <InnerForm form={form} {...rest}>
                {/* closed listing */}
                <StyledButton
                    width="100%"
                    height="auto"
                    visible={!active}
                    type="ghost"
                    mb={10}
                >
                    <ListingCard
                        index={index}
                        frequency={frequency}
                        startDate={startDate}
                        endDate={endDate}
                        category={category}
                        startTime={startTime}
                        endTime={endTime}
                        availableChairs={values[`numChairs${index}`]}
                    />
                </StyledButton>
                {/* current, open listing */}
                <Box mb={10}>
                    <StyledCard
                        mb={10}
                        p={[20, '', 28]}
                        visible={active}
                        {...rest}
                    >
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
                                    <Text
                                        fontSize={[0, '', 1]}
                                        color="text.blue"
                                    >
                                        delete listing
                                    </Text>
                                </Button>
                            )}

                            <Text
                                fontWeight="bold"
                                fontSize={[2, '', 4]}
                                color="text.blue"
                                mb={9}
                            >
                                SELECT AVAILABILITY
                            </Text>

                            <StyledForm form={form}>
                                <FormItem
                                    name="labelOnly"
                                    mb={0}
                                    label="Repeat On:"
                                    input={<div />}
                                />
                                <Flex>
                                    {ABBREVIATED_DAYS.map(d => (
                                        <FormItem
                                            name={`${d}${index}`}
                                            initialValue={DEFAULT_DAYS.includes(
                                                d
                                            )}
                                            valuePropName="checked"
                                            input={
                                                <StyledCheckableTag
                                                    width={[41, '', 60]}
                                                    height={[41, '', 30]}
                                                    mr={[0, '', 8]}
                                                >
                                                    {d.charAt(0).toUpperCase() +
                                                        d.slice(1)}
                                                </StyledCheckableTag>
                                            }
                                        />
                                    ))}
                                </Flex>

                                <FormItem
                                    form={form}
                                    name="labelOnly"
                                    mb={0}
                                    input={<div />}
                                />

                                <Grid
                                    width="100%"
                                    gridTemplateRows={[
                                        'auto auto auto auto',
                                        '',
                                        'auto',
                                    ]}
                                    gridTemplateColumns={[
                                        '100%',
                                        '',
                                        `64px 150px 64px 150px`,
                                    ]}
                                    alignItems="center"
                                    onClick={this.toggleDatePicker}
                                >
                                    <Box
                                        display="inline-block"
                                        mb={[0, '', 20]}
                                    >
                                        <StyledFormItem
                                            name="labelOnly"
                                            label="From"
                                            mt={[0, '', 14]}
                                            mb={12}
                                            height={20}
                                            input={<div />}
                                        />
                                    </Box>
                                    <Box width="100%">
                                        <FormItem
                                            form={form}
                                            mb={[13, '', 26]}
                                            width="100%"
                                            name={`startTime${index}`}
                                            rules={[
                                                {
                                                    validator: this
                                                        .validateStartAndEndTime,
                                                },
                                            ]}
                                            initialValue={DEFAULT_START_TIME}
                                            input={
                                                <TimePicker
                                                    px={30}
                                                    py={12}
                                                    format={TIMEPICKER_FORMAT}
                                                    height={52}
                                                    use12Hours
                                                    placeholder=""
                                                    defaultOpenValue={moment().hour(
                                                        8
                                                    )}
                                                />
                                            }
                                        />
                                    </Box>

                                    {/* width is 1.25 * rightArrowWidth */}
                                    {/* Using <Desktop /> breaks the UI. Probably becuase of how form works */}
                                    <Box
                                        display="inline-block"
                                        mb={[0, '', 20]}
                                    >
                                        <StyledFormItem
                                            name="labelOnly"
                                            label={desktopOnly ? 'to' : 'To'}
                                            ml={[0, '', 24]}
                                            mt={[0, '', 14]}
                                            mb={12}
                                            height={['auto', '', 20]}
                                            input={<div />}
                                        />
                                    </Box>

                                    <FormItem
                                        form={form}
                                        mb={[20, '', 26]}
                                        width="100%"
                                        name={`endTime${index}`}
                                        rules={[
                                            {
                                                validator: this
                                                    .validateStartAndEndTime,
                                            },
                                        ]}
                                        initialValue={DEFAULT_END_TIME}
                                        input={
                                            <TimePicker
                                                px={30}
                                                py={12}
                                                height={52}
                                                use12Hours
                                                format={TIMEPICKER_FORMAT}
                                                defaultOpenValue={moment().hour(
                                                    10
                                                )}
                                            />
                                        }
                                    />
                                </Grid>

                                <FormItem
                                    name={`availability${index}`}
                                    label={
                                        this.props.tabletMobileOnly &&
                                        'Listing Duration'
                                    }
                                    validateTrigger="onSubmit"
                                    rules={[
                                        {
                                            validator: (
                                                rule,
                                                value,
                                                callback
                                            ) => {
                                                if (
                                                    _isEmpty(_get(value, '[0]'))
                                                ) {
                                                    return callback(
                                                        'You must select the starting date'
                                                    );
                                                }
                                                return callback();
                                            },
                                            message:
                                                'Please provide listing date',
                                        },
                                    ]}
                                    initialValue={[
                                        moment()
                                            .startOf('day')
                                            .add(1, 'day'),
                                        null,
                                    ]}
                                    input={
                                        <StyledRangePicker
                                            onDateChange={() => {}}
                                            width={608}
                                        />
                                    }
                                />
                                <Text
                                    fontWeight="bold"
                                    fontSize={[2, '', 4]}
                                    color="text.blue"
                                    mb={9}
                                >
                                    DENTAL CHAIR
                                </Text>
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
                                            message:
                                                'Please enter a vaild number',
                                        },
                                    ]}
                                    input={<Input type="hidden" />}
                                />
                                <Text
                                    fontWeight="bold"
                                    fontSize={[2, '', 4]}
                                    color="text.blue"
                                    mb={27}
                                >
                                    SELECT PLAN
                                </Text>
                                <Box position="absolute">
                                    <FormItem
                                        name={`plan${index}`}
                                        initialValue={2}
                                        input={<Input type="hidden" />}
                                    />
                                </Box>
                                <Grid
                                    gridTemplateColumns={[
                                        'unset',
                                        '',
                                        '1fr 1fr 1fr',
                                    ]}
                                    gridColumnGap={8}
                                    gridRowGap={8}
                                >
                                    <ListingPlan
                                        onSelect={this.onChairCounterHandler(
                                            `plan${index}`
                                        )}
                                        option={1}
                                        selectedOption={this.props.form.getFieldValue(
                                            `plan${index}`
                                        )}
                                    />
                                    <ListingPlan
                                        onSelect={this.onChairCounterHandler(
                                            `plan${index}`
                                        )}
                                        selectedOption={this.props.form.getFieldValue(
                                            `plan${index}`
                                        )}
                                        option={2}
                                    />
                                    <ListingPlan
                                        onSelect={this.onChairCounterHandler(
                                            `plan${index}`
                                        )}
                                        selectedOption={this.props.form.getFieldValue(
                                            `plan${index}`
                                        )}
                                        option={3}
                                    />
                                </Grid>
                                <Text
                                    fontWeight="medium"
                                    fontSize="10px"
                                    letterSpacing="-0.28px"
                                    mt={10}
                                >
                                    *Shared assistant can help with materials
                                    and sterilization. Note: max of 3 D.D.S. per
                                    shared assistant
                                </Text>
                                <Text
                                    fontWeight="medium"
                                    fontSize="10px"
                                    letterSpacing="-0.28px"
                                >
                                    **Enclosed surgical room optional
                                </Text>
                            </StyledForm>
                        </Box>
                    </StyledCard>
                </Box>
            </InnerForm>
        );
    }
}

export default withScreenSizes(CreateListing);
