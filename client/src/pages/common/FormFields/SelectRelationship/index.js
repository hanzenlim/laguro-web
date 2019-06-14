import React from 'react';
import { Onboarding } from '../../the-bright-side-components';

const relationshipMap = [
    { key: 'CHILD', name: 'Child' },
    { key: 'SPOUSE', name: 'Spouse' },
    { key: 'OTHER_DEPENDENT', name: 'Dependent' },
];

const SelectRelationship = props => {
    const { form, field } = props;
    return (
        <Onboarding.SelectField
            form={form}
            field={field}
            placeholder="Select relationship"
            options={relationshipMap.map(i => (
                <Onboarding.SelectOption value={i.key}>
                    {i.name}
                </Onboarding.SelectOption>
            ))}
        />
    );
};

export default SelectRelationship;
