import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

import PriceEstimationQuizView from './view';

export const FORM_STEPS = {
    SELECT_PROCEDURE: 'Which procedure are you looking for?',
    SELECT_AVAILABILITY: 'When are you available for your appointment?',
    SELECT_DAYS: 'Which days do you prefer?',
    INPUT_NAME: 'What is your name?',
    CHECK_INSURANCE: 'Do you have insurance?',
    GET_INSURANCE_PROVIDER: 'What is the name of your insurance provider?',
    ASK_PRIMARY_HOLDER: 'Are you the primary holder?',
    ASK_HOLDER_INFO: `What is the primary holder's name?`,
    INPUT_BIRTHDAY: 'When is your birthday?',
    INPUT_MEMBER_ID: `What's your member ID?`,
};

export const FORM_LOADERS = {
    MATCH_DENTIST_AVAILABLE: `We're matching you with the best dentist available`,
    CALCULATING_PRICE: `We're calculating your price estimation`,
};

const formStepsKeys = Object.keys(FORM_STEPS);

class PriceEstimationQuiz extends PureComponent {
    state = {
        progress: (1 / formStepsKeys.length) * 100,
        step: FORM_STEPS.SELECT_PROCEDURE,
        isHolder: true,
    };

    setIsHolder = isHolder => this.setState({ isHolder });

    setStep = step => {
        if (
            [
                FORM_LOADERS.MATCH_DENTIST_AVAILABLE,
                FORM_LOADERS.CALCULATING_PRICE,
            ].includes(step)
        ) {
            this.setState({ step, progress: 0 });
            return;
        }

        const indexOfStep = formStepsKeys.findIndex(
            stepKey => FORM_STEPS[stepKey] === step
        );

        const progress = ((indexOfStep + 1) / formStepsKeys.length) * 100;

        this.setState({ step, progress });
    };

    // Handler for previous button
    onPrev = () => {
        const { step, isHolder } = this.state;
        const { toggleQuizVisibility } = this.props;

        switch (step) {
            case FORM_STEPS.SELECT_PROCEDURE:
                toggleQuizVisibility();
                break;

            case FORM_STEPS.SELECT_AVAILABILITY:
                this.setStep(FORM_STEPS.SELECT_PROCEDURE);
                break;

            case FORM_STEPS.SELECT_DAYS:
                this.setStep(FORM_STEPS.SELECT_AVAILABILITY);
                break;

            case FORM_STEPS.INPUT_NAME:
                this.setStep(FORM_STEPS.SELECT_DAYS);
                break;

            case FORM_STEPS.CHECK_INSURANCE:
                this.setStep(FORM_STEPS.INPUT_NAME);
                break;

            case FORM_STEPS.GET_INSURANCE_PROVIDER:
                this.setStep(FORM_STEPS.CHECK_INSURANCE);
                break;

            case FORM_STEPS.ASK_PRIMARY_HOLDER:
                this.setStep(FORM_STEPS.GET_INSURANCE_PROVIDER);
                break;

            case FORM_STEPS.ASK_HOLDER_INFO:
                this.setStep(FORM_STEPS.ASK_PRIMARY_HOLDER);
                break;

            case FORM_STEPS.INPUT_BIRTHDAY:
                this.setStep(
                    isHolder
                        ? FORM_STEPS.ASK_PRIMARY_HOLDER
                        : FORM_STEPS.ASK_HOLDER_INFO
                );
                break;

            default:
                this.setStep(FORM_STEPS.INPUT_BIRTHDAY);
                break;
        }
    };

    // Handler for next button
    onNext = () => {
        const { step } = this.state;

        switch (step) {
            case FORM_STEPS.INPUT_NAME:
                this.setStep(FORM_STEPS.CHECK_INSURANCE);
                break;

            case FORM_STEPS.GET_INSURANCE_PROVIDER:
                this.setStep(FORM_STEPS.ASK_PRIMARY_HOLDER);
                break;

            case FORM_STEPS.ASK_HOLDER_INFO:
                this.setStep(FORM_STEPS.INPUT_BIRTHDAY);
                break;

            default:
                this.setStep(FORM_STEPS.INPUT_MEMBER_ID);
                break;
        }
    };

    render() {
        const { progress, step } = this.state;

        return (
            <Formik
                initialValues={{
                    procedure: '',
                    availability: '',
                    days: '',
                    firstName: '',
                    lastName: '',
                    hasInsurance: null,
                    insuranceProvider: '',
                    isPrimaryHolder: null,
                    holderFirstName: '',
                    holderLastName: '',
                    holderBirthMonth: '',
                    holderBirthDay: '',
                    holderBirthYear: '',
                    memberId: '',
                }}
                onSubmit={() => {
                    // TODO: ('do mutation here');
                    this.setStep(FORM_LOADERS.CALCULATING_PRICE);
                }}
                render={formikProps => (
                    <PriceEstimationQuizView
                        progress={progress}
                        step={step}
                        onPrev={this.onPrev}
                        onNext={this.onNext}
                        setStep={this.setStep}
                        setIsHolder={this.setIsHolder}
                        formikProps={formikProps}
                    />
                )}
            />
        );
    }
}

PriceEstimationQuiz.propTypes = {
    toggleQuizVisibility: PropTypes.func.isRequired,
};

export default PriceEstimationQuiz;
