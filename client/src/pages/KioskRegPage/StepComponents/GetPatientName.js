import React from 'react';
import { GetPatientName } from '@laguro/the-bright-side-components';

export const PatientName = props => (
    <GetPatientName
        {...props}
        onNext={() => {
            if (Object.keys(props.formikProps.errors).length !== 0) return;
            props.formikProps.setFieldValue('mode', 'signUp');
        }}
    />
);
