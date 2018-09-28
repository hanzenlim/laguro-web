import React from 'react';
import styled from 'styled-components';
import { Form, Select } from '../../../../components';

const INTIAL_TIME_SLOT = '7:00AM';

const TIME_SLOTS = [
    '12:00 AM',
    '1:00 AM',
    '2:00 AM',
    '3:00 AM',
    '4:00 AM',
    '5:00 AM',
    '6:00 AM',
    '7:00 AM',
    '8:00 AM',
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
    '6:00 PM',
    '7:00 PM',
    '8:00 PM',
    '9:00 PM',
    '10:00 PM',
    '11:00 PM',
];

const { SubmitButton, FormItem } = Form;

const StyledFormContainer = styled.div`
    > form {
        display: grid;
        grid-column-gap: 15px;
        grid-template-columns: 50%;

        > div:nth-child(1) {
            grid-column-start: 1;
            grid-column-end: 3;
        }

        > div:nth-child(2) {
            grid-column: 1;
        }

        > div:nth-child(3) {
            grid-column: 2;
        }

        > div:nth-child(4) {
            grid-column-start: 1;
            grid-column-end: 3;
        }
    }
`;

const renderOptions = list => (
    <Select>
        {list.map(item => (
            <Select.Option value={item.key}>{item.value}</Select.Option>
        ))}
    </Select>
);

const FilterAppointmentsFormView = props => {
    const { handleSubmit, availableDateList, locationList } = props;

    return (
        <StyledFormContainer>
            <Form onSuccess={handleSubmit}>
                <FormItem
                    mb={20}
                    name="location"
                    label="location"
                    rules={[
                        {
                            required: true,
                            message: 'Please select a Location',
                        },
                    ]}
                    initialValue={locationList[0]}
                    input={renderOptions(locationList)}
                />
                <FormItem
                    name="date"
                    label="date"
                    mb={20}
                    rules={[
                        {
                            required: true,
                            message: 'Please select a date',
                        },
                    ]}
                    initialValue={
                        availableDateList[0] && availableDateList[0].key
                    }
                    input={renderOptions(availableDateList)}
                />
                <FormItem
                    name="time"
                    label="time"
                    mb={20}
                    rules={[
                        {
                            required: true,
                            message: 'Please select a time',
                        },
                    ]}
                    initialValue={INTIAL_TIME_SLOT}
                    input={
                        <Select>
                            {TIME_SLOTS.map(time => (
                                <Select.Option value={time}>
                                    {time}
                                </Select.Option>
                            ))}
                        </Select>
                    }
                />
                <SubmitButton
                    width="100%"
                    height="59px"
                    fontSize={3}
                    px={14}
                    buttonText="Find appointment"
                />
            </Form>
        </StyledFormContainer>
    );
};

export default FilterAppointmentsFormView;
