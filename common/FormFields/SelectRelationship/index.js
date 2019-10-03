import React from 'react';
import { Onboarding } from '../../the-bright-side-components';
import { relationshipList } from '~/data/relationshipList';

const SelectRelationship = props => {
    const { form, field } = props;
    return (
        <Onboarding.SelectField
            form={form}
            field={field}
            placeholder="Select relationship"
            options={relationshipList.map(i => (
                <Onboarding.SelectOption value={i.key}>
                    {i.name}
                </Onboarding.SelectOption>
            ))}
        />
    );
};

export default SelectRelationship;
