import React from 'react';
import styled from 'styled-components';
import { Form, Select } from '../../../components';

const { SubmitButton, FormItem } = Form;

const StyledFormContainer = styled.div`
    > form {
        display: grid;
        grid-column-gap: 15px;
        grid-template-columns: 50%;

        > div:nth-child(1) {
            grid-column: 1;
        }

        > div:nth-child(2) {
            grid-column: 2;
        }

        > div:nth-child(3) {
            grid-column-start: 1;
            grid-column-end: 3;
        }
    }
`;

const FindAppointmentForm = () => (
    <StyledFormContainer>
        <Form onSuccess={() => {}}>
            <FormItem
                name="date"
                label="date"
                rules={[
                    {
                        required: true,
                        message: 'Please input your first name!',
                    },
                ]}
                initialValue={'Today'}
                input={
                    <Select>
                        <Select.Option value="Today">Today</Select.Option>
                    </Select>
                }
            />
            <FormItem
                name="time"
                label="time"
                rules={[
                    {
                        required: true,
                        message: 'Please input your first name!',
                    },
                ]}
                initialValue={'3:00 PM'}
                input={
                    <Select>
                        <Select.Option value="3:00 PM">3:00 PM</Select.Option>
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

export default FindAppointmentForm;
