import React, { Fragment } from 'react';
import {
    HealthHistoryForm,
    Progress,
} from '@laguro/the-bright-side-components';
import { adopt } from 'react-adopt';
import { UPDATE_PATIENT_HEALTH_DATA } from './queries';
import { Mutation } from 'react-apollo';

const progressSteps = [
    '1 REGISTRATION',
    '2 BOOK AN APPOINTMENT',
    '3 MEDICAL HISTORY FORM',
    '4 INSURANCE',
];

const Composed = adopt({
    updatePatientHealthData: ({ render }) => {
        return (
            <Mutation mutation={UPDATE_PATIENT_HEALTH_DATA}>{render}</Mutation>
        );
    },
});

const KioskMedicalHistoryFormPage = props => {
    return (
        <Composed>
            {({ updatePatientHealthData }) => {
                return (
                    <Fragment>
                        {/* TODO: Move progress to a parent component */}
                        <Progress
                            step={3}
                            steps={progressSteps}
                            percent={22.5}
                        />
                        <HealthHistoryForm
                            onFinishForm={async values => {
                                const valuesKeys = Object.keys(values);

                                const newArray = [];
                                valuesKeys.forEach(valueKey => {
                                    const innerKeys = Object.keys(
                                        values[valueKey]
                                    );

                                    innerKeys.forEach(innerKey => {
                                        newArray.push({
                                            key: innerKey,
                                            value: values[valueKey][innerKey],
                                        });
                                    });
                                });

                                const result = await updatePatientHealthData({
                                    variables: {
                                        input: {
                                            patientId:
                                                '5151d7c0-2988-11e9-b5b9-d578a7e23723',
                                            patientHealthData: {
                                                items: newArray,
                                            },
                                        },
                                    },
                                });

                                props.history.push(`/kiosk/insurance`);
                            }}
                        />
                    </Fragment>
                );
            }}
        </Composed>
    );
};

export default KioskMedicalHistoryFormPage;
