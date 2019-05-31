import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

import PriceEstimationQuizView from './view';

export const FORM_STEPS = {
    SELECT_PROCEDURE: 'Which procedure are you looking for?',
    SELECT_AVAILABILITY: 'When are you available for your appointment?',
    SELECT_DAYS: 'Which days do you prefer?',
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

        if (step === FORM_STEPS.SELECT_AVAILABILITY) {
            this.setStep(FORM_STEPS.SELECT_PROCEDURE);
        }
    };

    // Handler for next button
    onNext = () => {};

    render() {
        const { progress, step } = this.state;

        return (
            <Formik
                initialValues={{ procedure: '', availability: '' }}
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
