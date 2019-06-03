import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Progress } from 'antd';

import { Box, Flex, Button, Text } from '../../../components';
import ProcedureSelection from './ProcedureSelection';
import AvailabilitySelection from './AvailabilitySelection';
import DaysSelection from './DaysSelection';
import NameStep from './NameStep';
import CheckInsurance from './CheckInsurance';
import { FORM_STEPS } from '.';

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

// Check disabled state for next button. Return true to set it to disabled mode
const checkDisabledState = (step, values) =>
    step === FORM_STEPS.INPUT_NAME && (!values.firstName || !values.lastName);

// This function check if step is allowed to render Next button. Add a step to excludedSteps to exclude it from UI.
const shouldNextButtonRender = step => {
    const excludedSteps = [
        FORM_STEPS.SELECT_PROCEDURE,
        FORM_STEPS.SELECT_AVAILABILITY,
        FORM_STEPS.SELECT_DAYS,
        FORM_STEPS.CHECK_INSURANCE,
    ];
    return !excludedSteps.includes(step);
};

const PriceEstimationQuiz = ({
    progress = 0,
    step = '',
    onPrev,
    onNext,
    setStep,
    formikProps,
}) => {
    const title = step;
    const { handleSubmit, values } = formikProps;

    const isNextDisabled = checkDisabledState(step, values);

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
            pt={50}
            textAlign="center"
            style={{ transform: 'translateX(-50%)' }}
        >
            <form onSubmit={handleSubmit}>
                {step === FORM_STEPS.CHECK_INSURANCE && (
                    <Text
                        fontSize={1}
                        color="text.gray"
                        lineHeight="17px"
                        mb={10}
                        mt={-27}
                    >
                        Hang in there, you're halfway done!
                    </Text>
                )}
                <Text fontSize={3} fontWeight="bold">
                    {title}
                </Text>

                {step === FORM_STEPS.SELECT_PROCEDURE && (
                    <ProcedureSelection setStep={setStep} />
                )}

                {step === FORM_STEPS.SELECT_AVAILABILITY && (
                    <AvailabilitySelection setStep={setStep} />
                )}

                {step === FORM_STEPS.SELECT_DAYS && (
                    <DaysSelection setStep={setStep} />
                )}

                {step === FORM_STEPS.INPUT_NAME && <NameStep />}

                {step === FORM_STEPS.CHECK_INSURANCE && (
                    <CheckInsurance setStep={setStep} />
                )}

                <Flex
                    justifyContent="space-between"
                    position="absolute"
                    bottom={26}
                    left={0}
                    right={0}
                    px={25}
                >
                    <Button height={40} type="ghost" px={12} onClick={onPrev}>
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
            </form>
        </Box>
    );
};

PriceEstimationQuiz.propTypes = {
    progress: PropTypes.number.isRequired,
    step: PropTypes.string.isRequired,
    onPrev: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    setStep: PropTypes.func.isRequired,
    formikProps: PropTypes.shape({
        handleSubmit: PropTypes.func,
    }).isRequired,
};

export default PriceEstimationQuiz;
