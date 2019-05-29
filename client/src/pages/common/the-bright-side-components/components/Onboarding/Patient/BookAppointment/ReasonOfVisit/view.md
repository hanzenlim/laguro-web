import { Box, Button, Flex, Text } from '@laguro/basic-components';
import * as React from 'react';
import * as Yup from 'yup';
import Onboarding, { LastMargin } from '../../../../Onboarding';
import ToolsIcon from '../../../Assets/toolsIcon';
import ToothIcon from '../../../Assets/toothIcon';

const ReasonOfVisitView = props => {
    return (
        <Box width="400px" mx="auto">
            <Flex justifyContent="center">
                <ToolsIcon />
            </Flex>
            <Onboarding.StepTitleText text="What is your reason of visit today?" />
            <Onboarding.StepBlurbText text="Let us know what you need so that we could find you the best dentists around according to your needs." />

            <Flex alignItems="center" flexDirection="column" mb={LastMargin}>
                <Button
                    type="ghost"
                    height="auto"
                    onClick={() => props.formikProps.setFieldValue('reasonOfVisit', 'Exam/Check up/Cleaning')}
                >
                    <Box
                        pl="24px"
                        mb="7px"
                        width="330px"
                        height="63px"
                        boxShadow="0 2px 7px 0 rgba(207, 218, 235, 0.25)"
                        border="1px solid"
                        borderColor={
                            props.formikProps.values.reasonOfVisit === 'Exam/Check up/Cleaning' ? '#3481f8' : '#dfe0e2'
                        }
                        borderRadius="4px"
                    >
                        <Flex height="100%" alignItems="center">
                            <Box mr="20px">
                                <ToothIcon />
                            </Box>
                            <Flex alignItems="flex-start" flexDirection="column">
                                <Text>Exam/Check up/Cleaning</Text>
                                <Text>Routine initial visit</Text>
                            </Flex>
                        </Flex>
                    </Box>
                </Button>

                <Button
                    type="ghost"
                    height="auto"
                    onClick={() => props.formikProps.setFieldValue('reasonOfVisit', 'Special Treatment')}
                >
                    <Box
                        pl="24px"
                        mb="7px"
                        width="330px"
                        height="63px"
                        boxShadow="0 2px 7px 0 rgba(207, 218, 235, 0.25)"
                        border="1px solid"
                        borderColor={
                            props.formikProps.values.reasonOfVisit === 'Special Treatment' ? '#3481f8' : '#dfe0e2'
                        }
                        borderRadius="4px"
                    >
                        <Flex height="100%" alignItems="center">
                            <Box mr="20px">
                                <ToolsIcon />
                            </Box>
                            <Flex alignItems="flex-start" flexDirection="column">
                                <Text>Special Treatment</Text>
                                <Text>(E.g. Crown or Root canal)</Text>
                            </Flex>
                        </Flex>
                    </Box>
                </Button>
            </Flex>

            <Onboarding.NextButton onClick={() => props.formikProps.submitForm()} />
        </Box>
    );
};

export default ReasonOfVisitView;
