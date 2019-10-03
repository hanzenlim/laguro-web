import React from 'react';
import { GetPatientName } from '~/common/the-bright-side-components/components/Onboarding/Registration/GetPatientName';

export const PatientName = props => (
    <GetPatientName
        {...props}
        onNext={() => {
            if (Object.keys(props.formikProps.errors).length !== 0) return;
            props.formikProps.setFieldValue('mode', 'signUp');
        }}
    />
);
