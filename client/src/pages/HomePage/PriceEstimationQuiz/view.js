import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Progress } from 'antd';
import moment from 'moment';

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
import MemberIdStep from './MemberIdStep';
import Loader from './Loader';
import { FORM_STEPS, FORM_LOADERS } from '.';

const StyledProgress = styled(Progress)`
    .ant-progress {
        line-height: 8px;
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
        FORM_STEPS.GET_INSURANCE_PROVIDER,
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

        const completeBirthDate = new Date(
            `${month} ${day}, ${year}`
        ).toISOString();

        isMinor = moment().diff(completeBirthDate, 'years') < 18;
    }
    return isBdayFieldsEmpty || isMinor;
};

// Check disabled state for next button. Return true to set it to disabled mode
const checkDisabledState = (step, values) => {
    if (step === FORM_STEPS.INPUT_NAME)
        return !values.firstName || !values.lastName;

    if (step === FORM_STEPS.INPUT_BIRTHDAY) {
        return checkIfNextOnBdayIsDisabled(values, false);
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

const PriceEstimationQuiz = ({
    progress = 0,
    step = '',
    onPrev,
    onNext,
    setFormStep,
    setIsHolder,
    formikProps,
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
        FORM_STEPS.CHECK_INSURANCE,
        FORM_STEPS.GET_INSURANCE_PROVIDER,
        FORM_STEPS.ASK_PRIMARY_HOLDER,
        FORM_STEPS.INPUT_HOLDER_BIRTHDAY,
        FORM_STEPS.INPUT_MEMBER_ID,
    ];

    return (
        <Box
            width={587}
            maxWidth="100%"
            height={['calc(100vh - 48px)', 547, '']}
            position="fixed"
            top={[48, '', 114]}
            left="50%"
            bg="background.aquaBlue"
            boxShadow="6px 6px 31px 2px rgba(0, 0, 0, 0.14)"
            px={25}
            textAlign="center"
            style={{ transform: 'translateX(-50%)' }}
        >
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
                    <Text fontSize={3} fontWeight="bold">
                        {title}
                    </Text>

                    {step === FORM_STEPS.SELECT_BUNDLE_GROUP && (
                        <BundleGroupSelection setFormStep={setFormStep} />
                    )}

                    {step === FORM_STEPS.SELECT_TIME_AVAILABILITY && (
                        <TimeAvailabilitySelection setFormStep={setFormStep} />
                    )}

                    {step === FORM_STEPS.SELECT_DAYS && (
                        <DaysSelection setFormStep={setFormStep} />
                    )}

                    {step === FORM_STEPS.INPUT_NAME && <NameStep />}

                    {step === FORM_STEPS.INPUT_BIRTHDAY && <GetBirthday />}

                    {step === FORM_STEPS.CHECK_INSURANCE && (
                        <CheckInsurance setFormStep={setFormStep} />
                    )}

                    {step === FORM_STEPS.GET_INSURANCE_PROVIDER && (
                        <InsuranceProvider />
                    )}

                    {step === FORM_STEPS.ASK_PRIMARY_HOLDER && (
                        <AskPrimaryHolder
                            setFormStep={setFormStep}
                            setIsHolder={setIsHolder}
                        />
                    )}

                    {step === FORM_STEPS.ASK_HOLDER_INFO && <AskHolderInfo />}

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

                    <Flex
                        justifyContent="space-between"
                        position="absolute"
                        bottom={26}
                        left={0}
                        right={0}
                        px={25}
                    >
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

                    <Box
                        position="absolute"
                        bottom={0}
                        left={0}
                        right={0}
                        height={8}
                    >
                        <StyledProgress
                            percent={progress}
                            status="active"
                            showInfo={false}
                        />
                    </Box>
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
    formikProps: PropTypes.shape({
        handleSubmit: PropTypes.func,
    }).isRequired,
    isCheckEligibilityLoading: PropTypes.bool.isRequired,
};

export default PriceEstimationQuiz;
