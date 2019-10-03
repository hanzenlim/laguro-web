import React from 'react';
import { Onboarding } from '../../the-bright-side-components';

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

const SelectMonth = props => {
    const { form, field } = props;
    return (
        <Onboarding.SelectField
            form={form}
            field={field}
            placeholder="Month"
            options={months.map((i, index) => (
                <Onboarding.SelectOption value={(index + 1).toString()}>
                    {i}
                </Onboarding.SelectOption>
            ))}
        />
    );
};

export default SelectMonth;
