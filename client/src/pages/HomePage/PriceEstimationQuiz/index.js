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
};

const PriceEstimationQuizContainer = props => (
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
        }}
        onSubmit={() => {}}
        render={formikProps => (
            <PriceEstimationQuiz formikProps={formikProps} {...props} />
        )}
    />
);

class PriceEstimationQuiz extends PureComponent {
    state = {
        progress: 50,
        step: FORM_STEPS.SELECT_PROCEDURE,
    };

    setProgress = progress => this.setState({ progress });

    setStep = step => this.setState({ step });

    // Handler for previous button
    onPrev = () => {
        const { step } = this.state;
        const { toggleQuizVisibility, formikProps } = this.props;

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
                    formikProps.values.isPrimaryHolder
                        ? FORM_STEPS.ASK_PRIMARY_HOLDER
                        : FORM_STEPS.ASK_HOLDER_INFO
                );
                break;

            default:
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
                break;
        }
    };

    render() {
        const { progress, step } = this.state;
        const { formikProps } = this.props;

        return (
            <PriceEstimationQuizView
                progress={progress}
                step={step}
                onPrev={this.onPrev}
                onNext={this.onNext}
                setStep={this.setStep}
                formikProps={formikProps}
            />
        );
    }
}

PriceEstimationQuiz.propTypes = {
    toggleQuizVisibility: PropTypes.func.isRequired,
    formikProps: PropTypes.shape({}).isRequired,
};

export default PriceEstimationQuizContainer;
