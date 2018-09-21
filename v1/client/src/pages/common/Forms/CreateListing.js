import React, { Component } from 'react';
import styled from 'styled-components';
import {
    Box,
    Button,
    Card,
    Counter,
    Flex,
    Icon,
    InnerForm,
    Input,
    RangePicker,
    Text,
    TimePicker,
} from '../../../components';

const { FormItem } = InnerForm;
const format = 'HH:mm';

const StyledContainer = styled(Box)`
    form {
        display: grid;
        grid-template-columns: 282px 22px 22px 282px;
        grid-template-rows: auto 20px auto auto 40px auto 20px 35px 25px auto;
        align-items: center;

        > :nth-child(1) {
            grid-column: 1 / 5;
        }

        > :nth-child(3) {
            grid-column: 1 / 5;
        }

        > :nth-child(4) {
            grid-column: 1 / 5;
        }

        > :nth-child(n + 5) {
            grid-column: 1 / 5;
        }

        > :nth-child(8) {
            grid-column: 1 / 3;
        }

        > :nth-child(9) {
            grid-column: 4 / 5;
            justify-self: end;
        }

        > :nth-child(11) {
            grid-column: 1 / 2;
        }

        > :nth-child(12) {
            grid-column: 4 / 5;
        }
    }
`;

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

class CreateListing extends Component {
    render() {
        const { active, form, ...rest } = this.props;
        const values = form.getFieldsValue();
        const index = this.props['data-index'];
        const availability = values[`availability${index}`];
        const startDate = availability && availability[0];
        const endDate = availability && availability[1];

        return (
            <Box>
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
                                        startDate.format('ddd M/DD')) ||
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
                                    {(endDate && endDate.format('ddd M/DD')) ||
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
                                        color="text.green"
                                        textAlign="right"
                                    >
                                        {values[`numChairs${index}`] || '0'}
                                    </Text>
                                    <Text
                                        fontWeight="medium"
                                        fontSize={2}
                                        lineHeight="18px"
                                        letterSpacing="-0.4px"
                                        color="text.green"
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
                                        color="text.green"
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
                    <Box maxWidth="620px">
                        <StyledContainer>
                            <StyledForm form={form}>
                                {/* child 1 */}
                                <Text
                                    fontWeight="bold"
                                    fontSize={4}
                                    lineHeight="1"
                                    letterSpacing="0px"
                                    color="text.green"
                                >
                                    Select Availability
                                </Text>

                                {/* child 2 */}
                                <Box />

                                {/* child 3 */}
                                <FormItem
                                    name={`availability${index}`}
                                    label="Availability"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please input the name of your office',
                                        },
                                    ]}
                                    input={
                                        <StyledRangePicker
                                            onDateChange={() => {}}
                                            width={608}
                                        />
                                    }
                                />
                                {/* child 4 */}
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
                                                    'Please input your first name!',
                                            },
                                        ]}
                                        input={
                                            <TimePicker
                                                px={30}
                                                py={12}
                                                height={50}
                                                borderless
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
                                                    'Please input your first name!',
                                            },
                                        ]}
                                        input={
                                            <TimePicker
                                                px={30}
                                                py={12}
                                                height={50}
                                                borderless
                                                use12Hours
                                                minuteStep={60}
                                                placeholder="Daily end time"
                                                format={format}
                                            />
                                        }
                                    />
                                </Flex>

                                {/* child 6 */}
                                <Box />

                                {/* child 7 */}
                                <Text
                                    fontWeight="bold"
                                    fontSize={4}
                                    lineHeight="1"
                                    letterSpacing="0px"
                                    color="text.green"
                                >
                                    DENTAL CHAIR
                                </Text>

                                {/* child 8 */}
                                <Box />

                                {/* child 9 */}
                                <FormItem
                                    name={`numChairs${index}`}
                                    label="Number of chairs available"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please input the name of your office',
                                        },
                                    ]}
                                    input={<div />}
                                />

                                {/* child 10 */}
                                <Counter />

                                {/* child 11 */}
                                <Box />

                                {/* child 12 */}
                                <FormItem
                                    name={`hourlyChairPrice${index}`}
                                    label="Hourly Chair Price"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please input the name of your office',
                                        },
                                    ]}
                                    initialValue={'$50.00'}
                                    input={<Input height="50px" />}
                                />

                                {/* child 13 */}
                                <FormItem
                                    name={`cleaningFee${index}`}
                                    label="Cleaning fee"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please input the name of your office',
                                        },
                                    ]}
                                    initialValue={'$20.00'}
                                    input={<Input height="50px" />}
                                />
                            </StyledForm>
                        </StyledContainer>
                    </Box>
                </StyledCard>
            </Box>
        );
    }
}

export default CreateListing;
