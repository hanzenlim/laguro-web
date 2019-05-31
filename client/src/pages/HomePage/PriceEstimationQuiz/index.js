import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

import PriceEstimationQuizView from './view';

export const FORM_STEPS = {
    SELECT_PROCEDURE: 'Which procedure are you looking for?',
};

class PriceEstimationQuiz extends PureComponent {
    state = {
        progress: 50,
        step: FORM_STEPS.SELECT_PROCEDURE,
    };

    setProgress = progress => this.setState({ progress });

    // Handler for previous button
    onPrev = () => {
        const { step } = this.state;

        if (step === FORM_STEPS.SELECT_PROCEDURE) {
            const { toggleQuizVisibility } = this.props;
            toggleQuizVisibility();
        }
    };

    render() {
        const { progress, step } = this.state;

        return (
            <Formik
                initialValues={{ procedure: '' }}
                onSubmit={() => {}}
                render={formikProps => (
                    <PriceEstimationQuizView
                        progress={progress}
                        step={step}
                        onPrev={this.onPrev}
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
