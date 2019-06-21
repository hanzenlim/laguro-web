import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import _get from 'lodash/get';

import PriceEstimationQuizView from './view';
import { CHECK_ELIGIBILITY, GET_BUNDLE_GROUP_COVERAGE } from './queries';
import { insuranceClient, pricingClient } from '../../../util/apolloClients';

export const FORM_STEPS = {
    SELECT_BUNDLE_GROUP: 'Which procedure are you looking for?',
    SELECT_TIME_AVAILABILITY: 'When are you available for your appointment?',
    SELECT_DAYS: 'Which days do you prefer?',
    INPUT_NAME: 'What is your name?',
    INPUT_BIRTHDAY: 'When is your birthday?',
    CHECK_INSURANCE: 'Do you have insurance?',
    GET_INSURANCE_PROVIDER: 'What is the name of your insurance provider?',
    ASK_PRIMARY_HOLDER: 'Are you the primary holder?',
    ASK_HOLDER_INFO: `What is the primary holder's name?`,
    INPUT_HOLDER_BIRTHDAY: `When is the primary holder's birthday?`,
    INPUT_MEMBER_ID: `Insurance Information`,
};

export const FORM_LOADERS = {
    MATCH_DENTIST_AVAILABLE: `We're matching you with the best dentist available`,
    CALCULATING_PRICE: `We're calculating your price estimation`,
};

const formStepsKeys = Object.keys(FORM_STEPS);

const PriceEstimationQuiz = ({
    toggleQuizVisibility,
    setQuizDone,
    setBundleGroupCoverageData,
    setFormValues,
}) => {
    const [progress, setProgress] = useState((1 / formStepsKeys.length) * 100);
    const [step, setStep] = useState(FORM_STEPS.SELECT_BUNDLE_GROUP);
    const [isHolder, setIsHolder] = useState(true);
    const [isCheckEligibilityLoading, setCheckEligibilityLoading] = useState(
        false
    );

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
            case FORM_STEPS.SELECT_BUNDLE_GROUP:
                toggleQuizVisibility();
                break;

            case FORM_STEPS.SELECT_TIME_AVAILABILITY:
                setFormStep(FORM_STEPS.SELECT_BUNDLE_GROUP);
                break;

            case FORM_STEPS.SELECT_DAYS:
                setFormStep(FORM_STEPS.SELECT_TIME_AVAILABILITY);
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
                bundleGroup: '',
                timeAvailability: '',
                dayAvailability: '',
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
                planOrGroupNumber: '',
            }}
            onSubmit={async (values, { setErrors }) => {
                const {
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
                    bundleGroup,
                    planOrGroupNumber,
                } = values;
                let response = {};
                let patientId = '';

                // Check Eligibility query run
                try {
                    patientId = (isPrimaryHolder
                        ? `${lastName}-${firstName}-${insuranceProvider}-${birthMonth}${birthDay}${birthYear}`
                        : `${holderLastName}-${holderFirstName}-${insuranceProvider}-${holderBirthMonth}${holderBirthDay}${holderBirthYear}`
                    )
                        .replace(/\s+/g, '-')
                        .toUpperCase();

                    setCheckEligibilityLoading(true);
                    response = await insuranceClient.query({
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
                                    planOrGroupNumber,
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
                    const gqlErrorOnly = _get(
                        error,
                        'graphQLErrors[0].message'
                    );
                    const parsedError = JSON.parse(
                        gqlErrorOnly.replace('Error: ', '')
                    );

                    setErrors({
                        memberId:
                            parsedError.type === 'Onederful'
                                ? `${parsedError.message[0].reason}. ${
                                      parsedError.message[0].followup
                                  }.`
                                : 'Something went wrong. Please Try again later.',
                    });
                } finally {
                    setCheckEligibilityLoading(false);
                }

                // getBundleGroupCoverage run
                if (_get(response, 'data.checkEligibility.isEligible')) {
                    try {
                        setFormStep(FORM_LOADERS.CALCULATING_PRICE);
                        response = await pricingClient.query({
                            query: GET_BUNDLE_GROUP_COVERAGE,
                            variables: {
                                input: {
                                    patientId,
                                    bundleGroup,
                                },
                            },
                        });

                        setBundleGroupCoverageData(
                            _get(response, 'data.getBundleGroupCoverage')
                        );
                        setFormValues(values);
                        toggleQuizVisibility();
                        setQuizDone(true);
                    } catch (error) {
                        setErrors({
                            memberId:
                                'Something went wrong. Please Try again later.',
                        });
                        setFormStep(FORM_STEPS.INPUT_MEMBER_ID);
                    }
                }
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
    setBundleGroupCoverageData: PropTypes.func.isRequired,
    setFormValues: PropTypes.func.isRequired,
};

export default PriceEstimationQuiz;
