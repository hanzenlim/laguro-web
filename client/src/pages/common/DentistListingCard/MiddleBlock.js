import React, { Fragment } from 'react';
import _isEmpty from 'lodash/isEmpty';

import { Box, Flex, Text, Icon, Responsive } from '../../../components';
import { getProcedureColor } from '../../../util/dentistUtils';
import { getInsuranceText } from '../../../util/insuranceUtil';

const { Desktop, TabletMobile } = Responsive;

const MiddleBlock = ({ dentist, tagStopPoint }) => (
    <Fragment>
        <TabletMobile>
            <Procedures
                procedures={dentist.procedures}
                tagStopPoint={tagStopPoint}
            />
        </TabletMobile>

        {!_isEmpty(dentist.acceptedInsurances) && (
            <Flex alignItems="flex-start" mb={4}>
                <Icon type="insurance" />
                <Text fontSize={[0, '', 1]} lineHeight="17px" ml="8px">
                    Accepts{' '}
                    {dentist.acceptedInsurances.length > 1
                        ? dentist.acceptedInsurances.map((sp, index) =>
                              index !== dentist.acceptedInsurances.length - 1
                                  ? `${getInsuranceText(sp)}, `
                                  : `and ${getInsuranceText(sp)}`
                          )
                        : getInsuranceText(dentist.acceptedInsurances[0])}
                </Text>
            </Flex>
        )}

        {!_isEmpty(dentist.languages) && (
            <Flex alignItems="center" mb={[24, '', 10]}>
                <Icon type="languages" />
                <Text fontSize={[0, '', 1]} lineHeight="17px" ml="8px">
                    Speaks{' '}
                    {dentist.languages.length > 1 ? (
                        dentist.languages.map((sp, index) =>
                            index !== dentist.languages.length - 1 ? (
                                <Text
                                    is="span"
                                    textTransform="capitalize"
                                >{`${sp.toLowerCase()}, `}</Text>
                            ) : (
                                <Fragment>
                                    and
                                    <Text
                                        is="span"
                                        textTransform="capitalize"
                                    >{` ${sp.toLowerCase()}`}</Text>
                                </Fragment>
                            )
                        )
                    ) : (
                        <Text is="span" textTransform="capitalize">
                            {dentist.languages[0].toLowerCase()}
                        </Text>
                    )}
                </Text>
            </Flex>
        )}

        <Desktop>
            <Procedures
                procedures={dentist.procedures}
                tagStopPoint={tagStopPoint}
            />
        </Desktop>
    </Fragment>
);

const Procedures = ({ procedures, tagStopPoint }) =>
    !_isEmpty(procedures) &&
    procedures.length && (
        <Box overflow="hidden" mb={[10, '', 20]}>
            <Flex flexWrap="wrap">
                {procedures.map((procedure, index) => {
                    if (tagStopPoint && index > tagStopPoint) {
                        return null;
                    }

                    if (tagStopPoint && index === tagStopPoint) {
                        return (
                            <Box
                                bg="background.blue"
                                px={[12, '', 16]}
                                py="3px"
                                borderRadius={['15.5px', '', '19.5px']}
                                mr="6px"
                                mb="6px"
                            >
                                <Text
                                    color="text.white"
                                    lineHeight="normal"
                                    fontSize={['10px', '', '12px']}
                                >
                                    ...
                                </Text>
                            </Box>
                        );
                    }

                    return (
                        <Box
                            bg={getProcedureColor(procedure)}
                            px={[12, '', 16]}
                            py="3px"
                            borderRadius={['15.5px', '', '19.5px']}
                            mr="6px"
                            mb="6px"
                        >
                            <Text
                                color="text.white"
                                lineHeight="normal"
                                fontSize={['10px', '', '12px']}
                            >
                                {procedure}
                            </Text>
                        </Box>
                    );
                })}
            </Flex>
        </Box>
    );

MiddleBlock.propTypes = {};

export default MiddleBlock;
