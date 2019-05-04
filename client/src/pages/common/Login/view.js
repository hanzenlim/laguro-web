import React, { Fragment } from 'react';
import * as Yup from 'yup';
import { Wizard } from '@laguro/the-bright-side-components';
import { Flex } from '@laguro/basic-components';
import {
    validatePhoneOrEmail,
    validatePhone,
} from '../../../util/validationUtils';

import { RegisterOrLoginStep } from '../../RegisterOrLoginStep';

const steps = [
    {
        id: '0',
        validationSchema: Yup.object().shape({
            firstName: Yup.string().when('mode', {
                is: 'getName',
                then: Yup.string().required(),
            }),
            lastName: Yup.string().when('mode', {
                is: 'getName',
                then: Yup.string().required(),
            }),
            emailOrPhoneNumber: Yup.string().when('mode', {
                is: 'signIn',
                then: Yup.string()
                    .required('This field is required')
                    .test(
                        'is phone number or email valid',
                        'Please use a valid email or phone number',
                        validatePhoneOrEmail
                    ),
            }),
            phoneNumber: Yup.string().when('mode', {
                is: 'signUp',
                then: Yup.string()
                    .required('This field is required')
                    .test(
                        'is phone number',
                        'Please use a valid phone number',
                        validatePhone
                    ),
            }),
        }),
        component: null,
        initialValues: {
            mode: 'signIn',
            isPinValid: false,
            emailOrPhoneNumber: '',
            phoneNumber: '',
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
            onSubmit={() => {}}
            Form="form"
            render={props => render({ ...props, ...componentProps })}
            steps={steps}
        />
    </Fragment>
);

export default KioskOnboardingPage;
