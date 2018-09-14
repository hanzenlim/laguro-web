import React, { Component } from 'react';
import styled from 'styled-components';
import { Card } from 'antd';
import moment from 'moment';
import {
    Box,
    Form,
    Input,
    Text,
    TimePicker,
    RangePicker,
    Counter,
} from '../../../components';

// import { addTooltip } from './sharedComponents';
const { FormItem } = Form;
const format = 'HH:mm';

const StyledContainer = styled(Box)`
    form {
        display: grid;
        grid-template-columns: 282px 22px 22px 282px;
        grid-template-rows: auto 20px auto auto 20px auto 20px auto auto auto;
        align-items: center;

        > :nth-child(1) {
            grid-column: 1 / 5;
        }

        > :nth-child(3) {
            grid-column: 1 / 5;
        }

        > :nth-child(4) {
            grid-column: 1 / 3;
        }

        > :nth-child(5) {
            grid-column: 3 / 5;
        }

        > :nth-child(n + 6) {
            grid-column: 1 / 5;
        }

        > :nth-child(9) {
            grid-column: 1 / 3;
        }

        > :nth-child(10) {
            grid-column: 4 / 5;
            justify-self: end;
        }

        > :nth-child(12) {
            grid-column: 1 / 2;
        }

        > :nth-child(13) {
            grid-column: 4 / 5;
        }
    }
`;

const StyledForm = styled(Form)`
    .ant-form-item {
        margin-bottom: 0px;
    }
`;

const StyledRangePicker = styled(RangePicker)`
    && {
        width: 100%;
        color: pink;
    }
`;

class AddOfficeInfo extends Component {
    render() {
        return (
            <Card>
                <Box maxWidth="620px">
                    <StyledContainer>
                        <StyledForm onSuccess={this.onSubmit}>
                            <Text
                                fontWeight="bold"
                                fontSize={4}
                                lineHeight="1"
                                letterSpacing="0px"
                                color="text.green"
                            >
                                Select Availability
                            </Text>
                            <Box />

                            <FormItem
                                name="availability"
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
                            <FormItem
                                name="startTime"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please input your first name!',
                                    },
                                ]}
                                input={
                                    <TimePicker
                                        iconless
                                        placeholder="Daily start time"
                                        pl={75}
                                        height={50}
                                        format={format}
                                    />
                                }
                            />
                            <FormItem
                                name="endTime"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please input your first name!',
                                    },
                                ]}
                                input={
                                    <TimePicker
                                        iconless
                                        placeholder="Daily end time"
                                        pl={160}
                                        height={50}
                                        format={format}
                                    />
                                }
                            />

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
                                name="numChair"
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
                                name="hourlyChairPrice"
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
                                name="cleaningFee"
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
            </Card>
        );
    }
}

export default AddOfficeInfo;
