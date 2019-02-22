import React, { Fragment } from 'react';
import * as Yup from 'yup';
import { Wizard } from '@laguro/the-bright-side-components';
import { Flex } from '@laguro/basic-components';

import { RegisterOrLoginStep } from '../../KioskRegistrationPage/view';

const steps = [
    {
        id: '0',
        validationSchema: Yup.object().shape({
            firstName: Yup.string().when('mode', {
                is: 'addName',
                then: Yup.string().required(),
            }),
            lastName: Yup.string().when('mode', {
                is: 'addName',
                then: Yup.string().required(),
            }),
        }),
        component: null,
        initialValues: {
            mode: 'signIn',
            isPinValid: false,
            emailOrPhoneNumber: '',
            isCodeSent: false,
            code: '',
            firstName: '',
            middleName: '',
            lastName: '',
        },
    },
];

const Step0 = props => <RegisterOrLoginStep context="web" {...props} />;

const render = props => {
    let step = null;

    switch (props.actions.currentStep) {
        case '0':
            step = Step0(props);
            break;
        default:
            step = Step0(props);
    }

    return <Flex justifyContent="center">{step}</Flex>;
};

const KioskOnboardingPage = componentProps => (
    <Fragment>
        <Wizard
            onSubmit={value => console.log(value)}
            Form="form"
            render={props => render({ ...props, ...componentProps })}
            steps={steps}
        />
    </Fragment>
);

export default KioskOnboardingPage;
