import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

import PriceEstimationQuizView from './view';
import { CHECK_ELIGIBILITY } from './queries';
import { insuranceClient } from '../../../util/apolloClients';

export const FORM_STEPS = {
    SELECT_PROCEDURE: 'Which procedure are you looking for?',
    SELECT_AVAILABILITY: 'When are you available for your appointment?',
    SELECT_DAYS: 'Which days do you prefer?',
    INPUT_NAME: 'What is your name?',
    INPUT_BIRTHDAY: 'When is your birthday?',
    CHECK_INSURANCE: 'Do you have insurance?',
    GET_INSURANCE_PROVIDER: 'What is the name of your insurance provider?',
    ASK_PRIMARY_HOLDER: 'Are you the primary holder?',
    ASK_HOLDER_INFO: `What is the primary holder's name?`,
    INPUT_HOLDER_BIRTHDAY: `When is the primary holder's birthday?`,
    INPUT_MEMBER_ID: `What's your member ID?`,
};

export const FORM_LOADERS = {
    MATCH_DENTIST_AVAILABLE: `We're matching you with the best dentist available`,
    CALCULATING_PRICE: `We're calculating your price estimation`,
};

const formStepsKeys = Object.keys(FORM_STEPS);

const PriceEstimationQuiz = ({ toggleQuizVisibility, setQuizDone }) => {
    const [progress, setProgress] = useState((1 / formStepsKeys.length) * 100);
    const [step, setStep] = useState(FORM_STEPS.SELECT_PROCEDURE);
    const [isHolder, setIsHolder] = useState(true);
    const [isCheckEligibilityLoading, setCheckEligibilityLoading] = useState(
        false
    );

    const setFormStep = nextStep => {
        if (
            [
                FORM_LOADERS.MATCH_DENTIST_AVAILABLE,
                FORM_LOADERS.CALCULATING_PRICE,
            ].includes(nextStep)
        ) {
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
            case FORM_STEPS.SELECT_PROCEDURE:
                toggleQuizVisibility();
                break;

            case FORM_STEPS.SELECT_AVAILABILITY:
                setFormStep(FORM_STEPS.SELECT_PROCEDURE);
                break;

            case FORM_STEPS.SELECT_DAYS:
                setFormStep(FORM_STEPS.SELECT_AVAILABILITY);
                break;

            case FORM_STEPS.INPUT_NAME:
                setFormStep(FORM_STEPS.SELECT_DAYS);
                break;

            case FORM_STEPS.INPUT_BIRTHDAY:
                setFormStep(FORM_STEPS.INPUT_NAME);
                break;

            case FORM_STEPS.CHECK_INSURANCE:
                setFormStep(FORM_STEPS.INPUT_BIRTHDAY);
                break;

            case FORM_STEPS.GET_INSURANCE_PROVIDER:
                setFormStep(FORM_STEPS.CHECK_INSURANCE);
                break;

            case FORM_STEPS.ASK_PRIMARY_HOLDER:
                setFormStep(FORM_STEPS.GET_INSURANCE_PROVIDER);
                break;

            case FORM_STEPS.ASK_HOLDER_INFO:
                setFormStep(FORM_STEPS.ASK_PRIMARY_HOLDER);
                break;

            case FORM_STEPS.INPUT_HOLDER_BIRTHDAY:
                setFormStep(FORM_STEPS.ASK_HOLDER_INFO);
                break;

            default:
                setFormStep(
                    isHolder
                        ? FORM_STEPS.ASK_PRIMARY_HOLDER
                        : FORM_STEPS.INPUT_HOLDER_BIRTHDAY
                );
                break;
        }
    };

    // Handler for next button
    const onNext = () => {
        switch (step) {
            case FORM_STEPS.INPUT_NAME:
                setFormStep(FORM_STEPS.INPUT_BIRTHDAY);
                break;

            case FORM_STEPS.INPUT_BIRTHDAY:
                setFormStep(FORM_STEPS.CHECK_INSURANCE);
                break;

            case FORM_STEPS.GET_INSURANCE_PROVIDER:
                setFormStep(FORM_STEPS.ASK_PRIMARY_HOLDER);
                break;

            case FORM_STEPS.ASK_HOLDER_INFO:
                setFormStep(FORM_STEPS.INPUT_HOLDER_BIRTHDAY);
                break;

            default:
                setFormStep(FORM_STEPS.INPUT_MEMBER_ID);
                break;
        }
    };

    return (
        <Formik
            initialValues={{
                procedure: '',
                availability: '',
                days: '',
                firstName: '',
                lastName: '',
                birthMonth: '',
                birthDay: '',
                birthYear: '',
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
            onSubmit={async ({
                firstName,
                lastName,
                birthMonth,
                birthDay,
                birthYear,
                holderBirthMonth,
                holderBirthDay,
                holderBirthYear,
                insuranceProvider,
                memberId,
                holderFirstName,
                holderLastName,
                isPrimaryHolder,
            }) => {
                try {
                    const patientId = isPrimaryHolder
                        ? `${lastName.toUpperCase()}-${firstName.toUpperCase()}-${birthMonth}${birthDay}${birthYear}`
                        : `${holderLastName.toUpperCase()}-${holderFirstName.toUpperCase()}-${holderBirthMonth}${holderBirthDay}${holderBirthYear}`;

                    setCheckEligibilityLoading(true);
                    await insuranceClient.query({
                        query: CHECK_ELIGIBILITY,
                        variables: {
                            input: {
                                anonymous: true,
                                patientId,
                                firstName: firstName.toUpperCase(),
                                lastName: lastName.toUpperCase(),
                                dob: `${birthMonth}/${birthDay}/${birthYear}`,
                                insuranceInfo: {
                                    insuranceProviderId: insuranceProvider,
                                    insuranceProvider,
                                    policyHolderId: memberId,
                                    planOrGroupNumber: '00449948',
                                },
                                ...(!isPrimaryHolder
                                    ? {
                                          dependentFirstName: holderFirstName.toUpperCase(),
                                          dependentLastName: holderLastName.toUpperCase(),
                                          dependentDob: `${holderBirthMonth}/${holderBirthDay}/${holderBirthYear}`,
                                      }
                                    : {}),
                            },
                        },
                    });
                } catch (error) {
                    alert('test');
                } finally {
                    setCheckEligibilityLoading(false);
                }

                setFormStep(FORM_LOADERS.CALCULATING_PRICE);

                setTimeout(() => {
                    toggleQuizVisibility();
                    setQuizDone(true);
                }, 3000);
            }}
            render={formikProps => (
                <PriceEstimationQuizView
                    progress={progress}
                    step={step}
                    onPrev={onPrev}
                    onNext={onNext}
                    setFormStep={setFormStep}
                    setIsHolder={setIsHolder}
                    isCheckEligibilityLoading={isCheckEligibilityLoading}
                    formikProps={formikProps}
                />
            )}
        />
    );
};

PriceEstimationQuiz.propTypes = {
    toggleQuizVisibility: PropTypes.func.isRequired,
    setQuizDone: PropTypes.func.isRequired,
};

export default PriceEstimationQuiz;
