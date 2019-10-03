import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

import PriceEstimationQuizView from './view';
import { trackPriceEstimationQuizStep } from '~/util/trackingUtils';

export const FORM_STEPS = {
    SELECT_BUNDLE_GROUP: 'Which procedure are you looking for?',
    SELECT_TIME_AVAILABILITY: 'When are you available for your appointment?',
    SELECT_DAYS: 'Which days do you prefer?',
    INPUT_AGE: 'How old are you?',
    CHECK_INSURANCE: 'Do you have insurance?',
    GET_INSURANCE_PROVIDER: 'What is the name of your insurance provider?',
};

export const FORM_LOADERS = {
    MATCH_DENTIST_AVAILABLE: `We're matching you with the best dentist available`,
};

const formStepsKeys = Object.keys(FORM_STEPS);

const PriceEstimationQuiz = ({ toggleQuizVisibility }) => {
    const [progress, setProgress] = useState((1 / formStepsKeys.length) * 100);
    const [step, setStep] = useState(FORM_STEPS.SELECT_BUNDLE_GROUP);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.body.style.position = 'fixed';
        document.body.style.top = 0;
        document.body.style.bottom = 0;
        document.body.style.left = 0;
        document.body.style.right = 0;

        return () => {
            document.body.style = null;
        };
    }, []);

    const setFormStep = nextStep => {
        if (trackPriceEstimationQuizStep) {
            trackPriceEstimationQuizStep({ eventLabel: nextStep });
        }

        if ([FORM_LOADERS.MATCH_DENTIST_AVAILABLE].includes(nextStep)) {
            setStep(nextStep);
            setProgress(0);
            return;
        }

        const indexOfStep = formStepsKeys.findIndex(
            stepKey => FORM_STEPS[stepKey] === nextStep
        );

        const nextProgress = ((indexOfStep + 1) / formStepsKeys.length) * 100;
        setStep(nextStep);
        setProgress(nextProgress);
    };

    // Handler for previous button
    const onPrev = () => {
        switch (step) {
            case FORM_STEPS.SELECT_BUNDLE_GROUP:
                toggleQuizVisibility();
                break;

            case FORM_STEPS.SELECT_TIME_AVAILABILITY:
                setFormStep(FORM_STEPS.SELECT_BUNDLE_GROUP);
                break;

            case FORM_STEPS.SELECT_DAYS:
                setFormStep(FORM_STEPS.SELECT_TIME_AVAILABILITY);
                break;

            case FORM_STEPS.INPUT_AGE:
                setFormStep(FORM_STEPS.SELECT_DAYS);
                break;

            case FORM_STEPS.CHECK_INSURANCE:
                setFormStep(FORM_STEPS.INPUT_AGE);
                break;

            case FORM_STEPS.GET_INSURANCE_PROVIDER:
                setFormStep(FORM_STEPS.CHECK_INSURANCE);
                break;

            default:
                toggleQuizVisibility();
                break;
        }
    };

    // Handler for next button
    const onNext = () => {
        switch (step) {
            case FORM_STEPS.INPUT_AGE:
                setFormStep(FORM_STEPS.CHECK_INSURANCE);
                break;

            default:
                toggleQuizVisibility();
                break;
        }
    };

    return (
        <Formik
            initialValues={{
                bundleGroup: '',
                timeAvailability: '',
                dayAvailability: '',
                hasInsurance: null,
                insuranceProvider: '',
            }}
            onSubmit={() => {}}
            render={formikProps => (
                <PriceEstimationQuizView
                    progress={progress}
                    step={step}
                    onPrev={onPrev}
                    onNext={onNext}
                    setFormStep={setFormStep}
                    toggleQuizVisibility={toggleQuizVisibility}
                    formikProps={formikProps}
                />
            )}
        />
    );
};

PriceEstimationQuiz.propTypes = {
    toggleQuizVisibility: PropTypes.func.isRequired,
};

export default PriceEstimationQuiz;
