import React from 'react';
import _range from 'lodash/range';
import moment from 'moment';
import { Onboarding } from '../../the-bright-side-components';

const years = _range(moment().format('YYYY'), 1900).map(i => i.toString());

const SelectYear = props => {
    const { form, field } = props;
    return (
        <Onboarding.SelectField
            form={form}
            field={field}
            placeholder="Year"
            options={years.map(i => (
                <Onboarding.SelectOption value={i}>{i}</Onboarding.SelectOption>
            ))}
        />
    );
};

export default SelectYear;
