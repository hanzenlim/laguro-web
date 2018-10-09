import React from 'react';
import styled from 'styled-components';
import { Form, Select } from '../../../../components';

const { SubmitButton, FormItem } = Form;

const StyledFormContainer = styled.div`
    > form {
        display: grid;
        grid-column-gap: 15px;
        grid-template-columns: 1fr 1fr;

        > div {
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
    const {
        handleSubmit,
        availableDateList,
        locationList,
        onSelectLocation,
    } = props;

    return (
        <StyledFormContainer>
            <Form onSuccess={handleSubmit} debounce="false">
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
                    input={
                        <Select onSelect={onSelectLocation}>
                            {locationList.map(location => (
                                <Select.Option value={location}>
                                    {location}
                                </Select.Option>
                            ))}
                        </Select>
                    }
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
