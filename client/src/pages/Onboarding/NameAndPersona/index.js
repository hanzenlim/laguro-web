import React from 'react';
import { adopt } from 'react-adopt';
import _isEmpty from 'lodash/isEmpty';
import {
    Wizard,
    GetPatientName,
    PreviousButton,
    PersonaSelection,
} from '@laguro/the-bright-side-components';
import * as Yup from 'yup';
import { Flex, Box } from '@laguro/basic-components';
import { UPDATE_USER } from './queries';
import cookies from 'browser-cookies';
import { Mutation } from 'react-apollo';
import queryString from 'query-string';
import { StyledPreviousButtonContainer } from '../common';
import { getRedirectUrl, redirectWithSearchParams } from '../../../history';
import {
    PATIENT_ONBOARDING_MEDICAL_HISTORY_FORM,
    DENTIST_ONBOARDING_PROFILE_URL,
} from '../../../util/urls';

const steps = [
    {
        id: '0',
        validationSchema: Yup.object().shape({
            firstName: Yup.string().required('First name is required'),
            lastName: Yup.string().required('Last name is required'),
        }),
        component: null,
        initialValues: {
            firstName: '',
            middleName: '',
            lastName: '',
        },
    },
    {
        id: '1',
        validationSchema: Yup.object().shape({
            persona: Yup.string().required('Persona is required'),
        }),
        component: null,
    },
];
const ComposedStep0 = adopt({
    updateUser: ({ render }) => {
        return <Mutation mutation={UPDATE_USER}>{render}</Mutation>;
    },
});

const Step0 = props => {
    return (
        <ComposedStep0>
            {({ updateUser }) => {
                return (
                    <GetPatientName
                        {...props}
                        onNext={async values => {
                            let user = cookies.get('user');
                            if (user) {
                                user = JSON.parse(user);
                            }

                            if (
                                !_isEmpty(values.firstName) &&
                                !_isEmpty(values.lastName)
                            ) {
                                await updateUser({
                                    variables: {
                                        input: {
                                            id: user.id,
                                            ...(!_isEmpty(values.firstName) && {
                                                firstName: values.firstName,
                                            }),
                                            ...(!_isEmpty(
                                                values.middleName
                                            ) && {
                                                middleName: values.middleName,
                                            }),
                                            ...(!_isEmpty(values.lastName) && {
                                                lastName: values.lastName,
                                            }),
                                        },
                                    },
                                });
                            } else {
                                return true;
                            }

                            // skip persona selection for patients from booking appointments
                            if (getRedirectUrl().includes('/dentist/')) {
                                redirectWithSearchParams(
                                    PATIENT_ONBOARDING_MEDICAL_HISTORY_FORM
                                );

                                return false;
                            }
                            // skip persona selection for patients from booking reservations
                            else if (getRedirectUrl().includes('/office/')) {
                                redirectWithSearchParams(
                                    DENTIST_ONBOARDING_PROFILE_URL
                                );
                                return false;
                            }

                            return true;
                        }}
                    />
                );
            }}
        </ComposedStep0>
    );
};

const Step1 = props => <PersonaSelection {...props} />;

const render = props => {
    let step = null;

    switch (props.actions.currentStep) {
        case '0':
            step = Step0(props);
            break;
        case '1':
            step = Step1(props);
            break;
        default:
            step = Step0(props);
    }

    return (
        <Flex justifyContent="center" mt="100px">
            {step}
        </Flex>
    );
};

const KioskNameAndPersonaPage = componentProps => {
    return (
        <Box pt={48}>
            <Wizard
                Form="form"
                render={props => (
                    <React.Fragment>
                        {props.actions.canGoBack && (
                            <StyledPreviousButtonContainer>
                                <PreviousButton
                                    goToPreviousStep={
                                        props.actions.goToPreviousStep
                                    }
                                />
                            </StyledPreviousButtonContainer>
                        )}
                        {render({ ...props, ...componentProps })}
                    </React.Fragment>
                )}
                onSubmit={objectOfObjectOfStepValues => {
                    const objectOfValues = Object.values(
                        objectOfObjectOfStepValues
                    ).reduce((objectOfValues, currentObject) => ({
                        ...objectOfValues,
                        ...currentObject,
                    }));

                    const { redirectTo } = queryString.parse(
                        componentProps.location.search
                    );

                    let nextUrl = redirectTo || '/';

                    switch (objectOfValues.persona) {
                        case 'patient':
                            nextUrl = `/kiosk/medical-history-form/${
                                componentProps.location.search
                            }`;
                            break;
                        case 'dentist':
                            nextUrl = `/onboarding/dentist/profile/${
                                componentProps.location.search
                            }`;
                            break;
                        case 'host':
                            // hostOnboarding does not redirect
                            nextUrl = '/host-onboarding/add-office/';
                            break;
                        default:
                            nextUrl = redirectTo || '/';
                    }

                    componentProps.history.push(nextUrl);
                }}
                steps={steps}
            />
        </Box>
    );
};

export default KioskNameAndPersonaPage;
