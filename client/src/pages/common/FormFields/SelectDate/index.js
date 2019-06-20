import React from 'react';
import _range from 'lodash/range';
import { Onboarding } from '../../the-bright-side-components';

const dates = _range(1, 32)
    .map(i => i.toString())
    .map(num => ('0' + num).slice(-2));

const SelectDate = props => {
    const { form, field } = props;

    return (
        <Onboarding.SelectField
            form={form}
            field={field}
            placeholder="Date"
            options={dates.map(i => (
                <Onboarding.SelectOption value={i}>{i}</Onboarding.SelectOption>
            ))}
        />
    );
};

export default SelectDate;
