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
};

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

        if (step === FORM_STEPS.SELECT_PROCEDURE) {
            const { toggleQuizVisibility } = this.props;
            toggleQuizVisibility();
        }

        if (step === FORM_STEPS.SELECT_AVAILABILITY)
            this.setStep(FORM_STEPS.SELECT_PROCEDURE);

        if (step === FORM_STEPS.SELECT_DAYS)
            this.setStep(FORM_STEPS.SELECT_AVAILABILITY);

        if (step === FORM_STEPS.INPUT_NAME)
            this.setStep(FORM_STEPS.SELECT_DAYS);

        if (step === FORM_STEPS.CHECK_INSURANCE)
            this.setStep(FORM_STEPS.INPUT_NAME);

        if (step === FORM_STEPS.GET_INSURANCE_PROVIDER) {
            this.setStep(FORM_STEPS.CHECK_INSURANCE);
        }
    };

    // Handler for next button
    onNext = () => {
        const { step } = this.state;

        if (step === FORM_STEPS.INPUT_NAME)
            this.setStep(FORM_STEPS.CHECK_INSURANCE);
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
                }}
                onSubmit={() => {}}
                render={formikProps => (
                    <PriceEstimationQuizView
                        progress={progress}
                        step={step}
                        onPrev={this.onPrev}
                        onNext={this.onNext}
                        setStep={this.setStep}
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
