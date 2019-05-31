import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Progress } from 'antd';

import { Box, Flex, Button, Text } from '../../../components';
import ProcedureSelection from './ProcedureSelection';
import { FORM_STEPS } from '.';

const StyledProgress = styled(Progress)`
    .ant-progress {
        line-height: 8px;
    }
`;

const PriceEstimationQuiz = ({
    progress = 0,
    step = '',
    onPrev,
    formikProps,
}) => {
    const title = step;
    const { handleSubmit } = formikProps;

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
                <Text fontSize={3} fontWeight="bold">
                    {title}
                </Text>

                {step === FORM_STEPS.SELECT_PROCEDURE && <ProcedureSelection />}

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
                    <Button height={40} width={126} type="ghost">
                        <Text
                            color="text.blue"
                            lineHeight="38px"
                            border="1px solid"
                            borderColor="divider.blue"
                            borderRadius={32}
                        >
                            Next
                        </Text>
                    </Button>
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
    formikProps: PropTypes.shape({
        handleSubmit: PropTypes.func,
    }).isRequired,
};

export default PriceEstimationQuiz;
