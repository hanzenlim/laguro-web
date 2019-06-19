import { Box, Button, Flex } from '@laguro/basic-components';
import * as React from 'react';
import Onboarding, { LastMargin } from '../../../../Onboarding';
import ToolsIcon from '../../../Assets/toolsIcon';
import ToothIcon from '../../../Assets/toothIcon';
import { injectIntl } from 'react-intl';
import {
    BOOKAPPOINTMENT_REASONOFVISIT_REASONOFVISIT,
    BOOKAPPOINTMENT_REASONOFVISIT_LETUSKNOW,
    BOOKAPPOINTMENT_REASONOFVISIT_EXAM,
    BOOKAPPOINTMENT_REASONOFVISIT_SPECIALTREATMENT,
} from '../../../../../../../../strings/messageStrings';
import { getFormatTextFromProps } from '../../../../../../../../util/intlUtils';
import { Text } from '../../../../../../../../components';

class ReasonOfVisitClass extends React.Component {
    render() {
        const formatText = getFormatTextFromProps(this.props);
        return (
            <Box width="400px" mx="auto">
                <Flex justifyContent="center">
                    <ToolsIcon />
                </Flex>
                <Onboarding.StepTitleText
                    text={formatText(
                        BOOKAPPOINTMENT_REASONOFVISIT_REASONOFVISIT
                    )}
                />
                <Onboarding.StepBlurbText
                    text={formatText(BOOKAPPOINTMENT_REASONOFVISIT_LETUSKNOW)}
                />

                <Flex
                    alignItems="center"
                    flexDirection="column"
                    mb={LastMargin}
                >
                    <Button
                        type="ghost"
                        height="auto"
                        onClick={() =>
                            this.props.formikProps.setFieldValue(
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
                                this.props.formikProps.values.reasonOfVisit ===
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
                                        {formatText(
                                            BOOKAPPOINTMENT_REASONOFVISIT_EXAM
                                        )}
                                    </Text>
                                </Flex>
                            </Flex>
                        </Box>
                    </Button>

                    <Button
                        type="ghost"
                        height="auto"
                        onClick={() =>
                            this.props.formikProps.setFieldValue(
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
                                this.props.formikProps.values.reasonOfVisit ===
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
                                        {formatText(
                                            BOOKAPPOINTMENT_REASONOFVISIT_SPECIALTREATMENT
                                        )}
                                    </Text>
                                </Flex>
                            </Flex>
                        </Box>
                    </Button>
                </Flex>

                <Onboarding.NextButton
                    onClick={() => this.props.formikProps.submitForm()}
                />
            </Box>
        );
    }
}

export const ReasonOfVisit = injectIntl(ReasonOfVisitClass);
