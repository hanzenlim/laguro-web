import * as React from 'react';
import { Box, Button, Flex } from '@laguro/basic-components';
import { useFormatMessage } from '@comparaonline/react-intl-hooks';
import Onboarding, { LastMargin } from '../../../../Onboarding';
import ToolsIcon from '../../../Assets/toolsIcon';
import ToothIcon from '../../../Assets/toothIcon';
import {
    BOOKAPPOINTMENT_REASONOFVISIT_REASONOFVISIT,
    BOOKAPPOINTMENT_REASONOFVISIT_LETUSKNOW,
    BOOKAPPOINTMENT_REASONOFVISIT_EXAM,
    BOOKAPPOINTMENT_REASONOFVISIT_SPECIALTREATMENT,
} from '../../../../../../../../strings/messageStrings';
import { Text } from '../../../../../../../../components';

const ReasonOfVisit = props => {
    const t = useFormatMessage();

    return (
        <Box width="400px" mx="auto">
            <Flex justifyContent="center">
                <ToolsIcon />
            </Flex>
            <Onboarding.StepTitleText
                text={t(BOOKAPPOINTMENT_REASONOFVISIT_REASONOFVISIT)}
            />
            <Onboarding.StepBlurbText
                text={t(BOOKAPPOINTMENT_REASONOFVISIT_LETUSKNOW)}
            />

            <Flex alignItems="center" flexDirection="column" mb={LastMargin}>
                <Button
                    type="ghost"
                    height="auto"
                    onClick={() =>
                        props.formikProps.setFieldValue(
                            'reasonOfVisit',
                            'Exam/Check up/Cleaning'
                        )
                    }
                >
                    <Box
                        px="24px"
                        mb="7px"
                        width="330px"
                        height="63px"
                        boxShadow="0 2px 7px 0 rgba(207, 218, 235, 0.25)"
                        border="1px solid"
                        borderColor={
                            props.formikProps.values.reasonOfVisit ===
                            'Exam/Check up/Cleaning'
                                ? '#3481f8'
                                : '#dfe0e2'
                        }
                        borderRadius="4px"
                    >
                        <Flex height="100%" alignItems="center">
                            <Box mr="20px">
                                <ToothIcon />
                            </Box>
                            <Flex width="100%" justifyContent="center">
                                <Text multiline>
                                    {t(BOOKAPPOINTMENT_REASONOFVISIT_EXAM)}
                                </Text>
                            </Flex>
                        </Flex>
                    </Box>
                </Button>

                <Button
                    type="ghost"
                    height="auto"
                    onClick={() =>
                        props.formikProps.setFieldValue(
                            'reasonOfVisit',
                            'Special Treatment'
                        )
                    }
                >
                    <Box
                        px="24px"
                        mb="7px"
                        width="330px"
                        height="63px"
                        boxShadow="0 2px 7px 0 rgba(207, 218, 235, 0.25)"
                        border="1px solid"
                        borderColor={
                            props.formikProps.values.reasonOfVisit ===
                            'Special Treatment'
                                ? '#3481f8'
                                : '#dfe0e2'
                        }
                        borderRadius="4px"
                    >
                        <Flex height="100%" alignItems="center">
                            <Box mr="20px">
                                <ToolsIcon />
                            </Box>
                            <Flex width="100%" justifyContent="center">
                                <Text multiline>
                                    {t(
                                        BOOKAPPOINTMENT_REASONOFVISIT_SPECIALTREATMENT
                                    )}
                                </Text>
                            </Flex>
                        </Flex>
                    </Box>
                </Button>
            </Flex>

            <Onboarding.NextButton
                onClick={() => props.formikProps.submitForm()}
            />
        </Box>
    );
};

export { ReasonOfVisit };
