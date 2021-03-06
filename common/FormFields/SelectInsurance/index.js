import React from 'react';
import _get from 'lodash/get';

import { allInsuranceList } from '~/data';
import { Onboarding } from '~/common/the-bright-side-components';

const SelectInsurance = props => {
    const { form, field } = props;
    return (
        <Onboarding.SelectField
            form={form}
            field={field}
            placeholder="Search and select insurance"
            options={allInsuranceList.map(i => (
                <Onboarding.SelectOption value={i.id}>
                    {i.name}
                </Onboarding.SelectOption>
            ))}
            onSelect={(value, element) => {
                // element.props.children is the html value of the element.
                form.setFieldValue(
                    'insuranceProvider',
                    _get(element, 'props.children')
                );
                form.setFieldValue('insuranceProviderId', value);
            }}
            showSearch
        />
    );
};

export default SelectInsurance;
