import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Progress } from 'antd';
import moment from 'moment';
import { transparentize } from 'polished';

import { Box, Flex, Button, Text } from '../../../components';
import BundleGroupSelection from './BundleGroupSelection';
import TimeAvailabilitySelection from './TimeAvailabilitySelection';
import DaysSelection from './DaysSelection';
import NameStep from './NameStep';
import CheckInsurance from './CheckInsurance';
import InsuranceProvider from './InsuranceProvider';
import AskPrimaryHolder from './AskPrimaryHolder';
import AskHolderInfo from './AskHolderInfo';
import GetBirthday from './GetBirthday';
import GetAge from './GetAge';
import MemberIdStep from './MemberIdStep';
import Loader from './Loader';
import { FORM_STEPS, FORM_LOADERS } from '.';

const StyledProgress = styled(Progress)`
    &.ant-progress {
        line-height: 8px;
        display: block;
        overflow: hidden;
        margin-top: 14px;
    }
`;

const NextButton = styled(Button)`
    &&.ant-btn-ghost.disabled,
    &&.ant-btn-ghost[disabled],
    &&.ant-btn-ghost.disabled:hover,
    &&.ant-btn-ghost[disabled]:hover,
    &&.ant-btn-ghost.disabled:focus,
    &&.ant-btn-ghost[disabled]:focus,
    &&.ant-btn-ghost.disabled:active,
    &&.ant-btn-ghost[disabled]:active,
    &&.ant-btn-ghost.disabled.active,
    &&.ant-btn-ghost[disabled].active {
        background-color: transparent;
    }
`;

// This function check if step is allowed to render Next button. Add a step to stepsWithNext to include it from UI.
const shouldNextButtonRender = step => {
    const stepsWithNext = [
        FORM_STEPS.INPUT_NAME,
        FORM_STEPS.INPUT_BIRTHDAY,
        FORM_STEPS.INPUT_AGE,
        FORM_STEPS.ASK_HOLDER_INFO,
        FORM_STEPS.INPUT_HOLDER_BIRTHDAY,
    ];
    return stepsWithNext.includes(step);
};

// This function checks if the bday fields are valid
const checkIfNextOnBdayIsDisabled = (values, isInputHolderBirthday) => {
    const isBdayFieldsEmpty =
        !values[isInputHolderBirthday ? 'holderBirthMonth' : 'birthMonth'] ||
        !values[isInputHolderBirthday ? 'holderBirthDay' : 'birthDay'] ||
        !values[isInputHolderBirthday ? 'holderBirthYear' : 'birthYear'];

    let isMinor = true;

    if (
        values[isInputHolderBirthday ? 'holderBirthMonth' : 'birthMonth'] &&
        values[isInputHolderBirthday ? 'holderBirthDay' : 'birthDay'] &&
        values[isInputHolderBirthday ? 'holderBirthYear' : 'birthYear']
    ) {
        const month = isInputHolderBirthday
            ? values.holderBirthMonth
            : values.birthMonth;
        const day = isInputHolderBirthday
            ? values.holderBirthDay
            : values.birthDay;
        const year = isInputHolderBirthday
            ? values.holderBirthYear
            : values.birthYear;

        const completeBirthDate = moment(
            `${month}/${day}/${year}`,
            'MM-DD-YYYY'
        );

        isMinor = moment().diff(completeBirthDate, 'years') < 18;
    }
    return isBdayFieldsEmpty || isMinor;
};

const checkIfNextOnAgeIsDisabled = values => {
    const isAgeFieldEmpty = !values['age'];

    let isMinor = true;

    if (values.age) {
        isMinor = values.age < 18;
    }
    return isAgeFieldEmpty || isMinor;
};

// Check disabled state for next button. Return true to set it to disabled mode
const checkDisabledState = (step, values) => {
    if (step === FORM_STEPS.INPUT_NAME)
        return !values.firstName || !values.lastName;

    if (step === FORM_STEPS.INPUT_BIRTHDAY) {
        return checkIfNextOnBdayIsDisabled(values, false);
    }

    if (step === FORM_STEPS.INPUT_AGE) {
        return checkIfNextOnAgeIsDisabled(values);
    }

    if (step === FORM_STEPS.GET_INSURANCE_PROVIDER)
        return !values.insuranceProvider;

    if (step === FORM_STEPS.ASK_HOLDER_INFO)
        return !values.holderFirstName || !values.holderLastName;

    if (step === FORM_STEPS.INPUT_HOLDER_BIRTHDAY) {
        return checkIfNextOnBdayIsDisabled(values, true);
    }

    return false;
};

const { innerHeight } = window;

const PriceEstimationQuiz = ({
    progress = 0,
    step = '',
    onPrev,
    onNext,
    setFormStep,
    setIsHolder,
    formikProps,
    toggleQuizVisibility,
    isCheckEligibilityLoading,
}) => {
    const title = step;
    const { handleSubmit, values } = formikProps;

    const isNextDisabled = checkDisabledState(step, values);

    const formLoaderSteps = [
        FORM_LOADERS.MATCH_DENTIST_AVAILABLE,
        FORM_LOADERS.CALCULATING_PRICE,
    ];

    const stepsWithPreText = [
        // FORM_STEPS.CHECK_INSURANCE,
        // FORM_STEPS.GET_INSURANCE_PROVIDER,
        // FORM_STEPS.ASK_PRIMARY_HOLDER,
        // FORM_STEPS.INPUT_HOLDER_BIRTHDAY,
        // FORM_STEPS.INPUT_MEMBER_ID,
    ];

    const onClose = useCallback(() => toggleQuizVisibility(), []);

    return (
        <Box
            width={587}
            maxWidth="100%"
            height={[innerHeight - 48, 547, '']}
            maxHeight={[innerHeight - 48, '', innerHeight - 83]}
            position="fixed"
            top={[48, '', 83]}
            left="50%"
            textAlign="center"
            style={{ transform: 'translateX(-50%)' }}
        >
            <Box
                height="100%"
                bg="background.aquaBlue"
                boxShadow="6px 6px 31px 2px rgba(0, 0, 0, 0.14)"
                px={25}
                position="relative"
                style={{ overflowY: 'auto' }}
            >
                <Box position="absolute" top={5} right={5} zIndex={1}>
                    <Button
                        type="ghost"
                        height="auto"
                        width={30}
                        onClick={onClose}
                    >
                        <Text fontSize={5}>&times;</Text>
                    </Button>
                </Box>

                {formLoaderSteps.includes(step) && <Loader step={step} />}

                {!formLoaderSteps.includes(step) && (
                    <Box is="form" pt={50} onSubmit={handleSubmit}>
                        {stepsWithPreText.includes(step) && (
                            <Text
                                fontSize={1}
                                color="text.gray"
                                lineHeight="17px"
                                mb={10}
                                mt={-27}
                            >
                                {[
                                    FORM_STEPS.CHECK_INSURANCE,
                                    FORM_STEPS.GET_INSURANCE_PROVIDER,
                                    FORM_STEPS.ASK_PRIMARY_HOLDER,
                                ].includes(step) &&
                                    `Hang in there, you're halfway done!`}

                                {step === FORM_STEPS.INPUT_HOLDER_BIRTHDAY &&
                                    'One more step!'}

                                {step === FORM_STEPS.INPUT_MEMBER_ID &&
                                    `You're almost there!`}
                            </Text>
                        )}
                        <Box mb={63}>
                            <Text fontSize={3} fontWeight="bold">
                                {title}
                            </Text>

                            {step === FORM_STEPS.SELECT_BUNDLE_GROUP && (
                                <BundleGroupSelection
                                    setFormStep={setFormStep}
                                />
                            )}

                            {step === FORM_STEPS.SELECT_TIME_AVAILABILITY && (
                                <TimeAvailabilitySelection
                                    setFormStep={setFormStep}
                                />
                            )}

                            {step === FORM_STEPS.SELECT_DAYS && (
                                <DaysSelection setFormStep={setFormStep} />
                            )}

                            {step === FORM_STEPS.INPUT_NAME && <NameStep />}

                            {step === FORM_STEPS.INPUT_BIRTHDAY && (
                                <GetBirthday />
                            )}

                            {step === FORM_STEPS.INPUT_AGE && <GetAge />}

                            {step === FORM_STEPS.CHECK_INSURANCE && (
                                <CheckInsurance setFormStep={setFormStep} />
                            )}

                            {step === FORM_STEPS.GET_INSURANCE_PROVIDER && (
                                <InsuranceProvider setFormStep={setFormStep} />
                            )}

                            {step === FORM_STEPS.ASK_PRIMARY_HOLDER && (
                                <AskPrimaryHolder
                                    setFormStep={setFormStep}
                                    setIsHolder={setIsHolder}
                                />
                            )}

                            {step === FORM_STEPS.ASK_HOLDER_INFO && (
                                <AskHolderInfo />
                            )}

                            {step === FORM_STEPS.INPUT_HOLDER_BIRTHDAY && (
                                <GetBirthday forHolder />
                            )}

                            {step === FORM_STEPS.INPUT_MEMBER_ID && (
                                <MemberIdStep
                                    isCheckEligibilityLoading={
                                        isCheckEligibilityLoading
                                    }
                                />
                            )}
                        </Box>
                    </Box>
                )}
            </Box>
            {!formLoaderSteps.includes(step) && (
                <Box
                    position="relative"
                    mt={-63}
                    bg={transparentize(0.4, '#f7f8fc')}
                >
                    <Flex justifyContent="space-between" px={25}>
                        <Button
                            height={40}
                            type="ghost"
                            px={12}
                            onClick={onPrev}
                        >
                            <Text color="text.blue">← Previous</Text>
                        </Button>

                        {shouldNextButtonRender(step) && (
                            <NextButton
                                height={40}
                                width={126}
                                type="ghost"
                                onClick={onNext}
                                disabled={isNextDisabled}
                            >
                                <Text
                                    color="text.blue"
                                    lineHeight="38px"
                                    border="1px solid"
                                    borderColor="divider.blue"
                                    borderRadius={32}
                                    opacity={isNextDisabled ? 0.2 : 1}
                                >
                                    Next
                                </Text>
                            </NextButton>
                        )}
                    </Flex>

                    <StyledProgress
                        percent={progress}
                        status="active"
                        showInfo={false}
                    />
                </Box>
            )}
        </Box>
    );
};

PriceEstimationQuiz.propTypes = {
    progress: PropTypes.number.isRequired,
    step: PropTypes.string.isRequired,
    onPrev: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    setFormStep: PropTypes.func.isRequired,
    setIsHolder: PropTypes.func.isRequired,
    toggleQuizVisibility: PropTypes.func.isRequired,
    formikProps: PropTypes.shape({
        handleSubmit: PropTypes.func,
    }).isRequired,
    isCheckEligibilityLoading: PropTypes.bool.isRequired,
};

export default PriceEstimationQuiz;
