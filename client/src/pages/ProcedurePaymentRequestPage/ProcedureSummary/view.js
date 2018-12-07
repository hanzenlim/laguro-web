import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import { renderPrice } from '../../../util/paymentUtil';
import { Box, Flex, Text } from '../../../components';

const installmentPlanIntervalMapping = {
    month: 'monthly',
    week: 'weekly',
};

const ProcedureSummaryView = props => {
    const {
        procedures,
        totalPrice,
        discountPrice,
        installmentPlan,
        originalPrice,
    } = props;

    return (
        <Box>
            <Box maxWidth={662} width="100%">
                <Box
                    px={[0, '', 38]}
                    py={[0, '', 26]}
                    boxShadow={['none', '', 0]}
                >
                    <Text
                        fontSize={[3, '', 4]}
                        lineHeight={1}
                        fontWeight="bold"
                        letterSpacing={['-0.5px', '', '-0.6px']}
                        color="text.black"
                        mb={[16, '', 28]}
                    >
                        Procedure Summary
                    </Text>

                    {procedures.map((procedure, index) => {
                        const { name, price } = procedure;
                        return (
                            <Flex
                                key={index}
                                alignItems="center"
                                mb={[10, '', 12]}
                                borderBottom="1px solid"
                                borderColor="divider.black"
                            >
                                <Flex
                                    pb={[8, '', 10]}
                                    alignItems="flex-end"
                                    justifyContent="space-between"
                                    width="100%"
                                    opacity="1"
                                >
                                    <Box>
                                        <Text
                                            fontSize={[1, '', 2]}
                                            lineHeight="20px"
                                            fontWeight="500"
                                            letterSpacing={[
                                                '-0.4px',
                                                '',
                                                '-0.6px',
                                            ]}
                                            color="text.black"
                                        >
                                            {name}
                                        </Text>
                                    </Box>
                                    <Box>
                                        <Text
                                            fontSize={[1, '', 2]}
                                            lineHeight={1}
                                            letterSpacing={[
                                                '-0.4px',
                                                '',
                                                '-0.6px',
                                            ]}
                                            color="text.black"
                                        >
                                            {renderPrice(price)}
                                        </Text>
                                    </Box>
                                </Flex>
                            </Flex>
                        );
                    })}

                    {discountPrice > 0 && (
                        <Flex
                            alignItems="flex-end"
                            justifyContent="space-between"
                        >
                            <Box>
                                <Text
                                    fontSize={[1, '', 2]}
                                    lineHeight="20px"
                                    letterSpacing={['-0.4px', '', '-0.6px']}
                                    color="text.black"
                                >
                                    Subtotal
                                </Text>
                            </Box>
                            <Box>
                                <Text
                                    fontSize={[1, '', 2]}
                                    lineHeight={1}
                                    letterSpacing={['-0.4px', '', '-0.6px']}
                                    color="text.black"
                                >
                                    {renderPrice(originalPrice)}
                                </Text>
                            </Box>
                        </Flex>
                    )}

                    {discountPrice > 0 && (
                        <Flex
                            alignItems="flex-end"
                            justifyContent="space-between"
                            mt={1}
                        >
                            <Box>
                                <Text
                                    fontSize={[1, '', 2]}
                                    lineHeight="20px"
                                    textTransform="capitalize"
                                    letterSpacing={['-0.4px', '', '-0.6px']}
                                    color="text.black"
                                >
                                    Discount
                                </Text>
                            </Box>
                            <Box>
                                <Text
                                    fontSize={[1, '', 2]}
                                    lineHeight={1}
                                    letterSpacing={['-0.4px', '', '-0.6px']}
                                    color="text.red"
                                >
                                    -{renderPrice(discountPrice)}
                                </Text>
                            </Box>
                        </Flex>
                    )}

                    <Flex alignItems="flex-end" justifyContent="space-between">
                        <Box>
                            <Text
                                fontSize={[1, '', 2]}
                                lineHeight="20px"
                                fontWeight="bold"
                                letterSpacing={['-0.4px', '', '-0.6px']}
                                color="text.black"
                            >
                                Total
                            </Text>
                        </Box>
                        <Box>
                            <Text
                                fontSize={[1, '', 2]}
                                lineHeight={1}
                                fontWeight="bold"
                                letterSpacing={['-0.4px', '', '-0.6px']}
                                color="text.black"
                            >
                                {renderPrice(totalPrice)}
                            </Text>
                        </Box>
                    </Flex>
                </Box>
            </Box>
            {!isEmpty(installmentPlan) && (
                <Box mt="30px" maxWidth={662} width="100%">
                    <Box
                        px={[0, '', 38]}
                        py={[0, '', 26]}
                        boxShadow={['none', '', 0]}
                    >
                        <Text
                            fontSize={[3, '', 4]}
                            lineHeight={1}
                            fontWeight="bold"
                            letterSpacing={['-0.5px', '', '-0.6px']}
                            color="text.black"
                            mb={[16, '', 28]}
                        >
                            Payment Plan
                        </Text>

                        {!isEmpty(installmentPlan) && (
                            <Flex
                                alignItems="flex-end"
                                justifyContent="space-between"
                                borderBottom="1px solid"
                                mt={[16, '', 20]}
                                borderColor="divider.black"
                            >
                                <Flex
                                    pb={[8, '', 10]}
                                    alignItems="flex-end"
                                    justifyContent="space-between"
                                    width="100%"
                                    opacity="1"
                                >
                                    <Box>
                                        <Text
                                            fontSize={[1, '', 2]}
                                            lineHeight="20px"
                                            textTransform="capitalize"
                                            letterSpacing={[
                                                '-0.4px',
                                                '',
                                                '-0.6px',
                                            ]}
                                            color="text.black"
                                        >
                                            {
                                                installmentPlanIntervalMapping[
                                                    installmentPlan.interval
                                                ]
                                            }{' '}
                                            Plan
                                        </Text>
                                        <Text>
                                            (
                                            {renderPrice(
                                                installmentPlan.recurringChargeAmount
                                            )}{' '}
                                            x {installmentPlan.numChargePeriods}{' '}
                                            {installmentPlan.interval})
                                        </Text>
                                    </Box>
                                    <Box>
                                        <Text
                                            fontSize={[1, '', 2]}
                                            lineHeight={1}
                                            fontWeight="bold"
                                            letterSpacing={[
                                                '-0.4px',
                                                '',
                                                '-0.6px',
                                            ]}
                                            color="text.black"
                                        >
                                            {renderPrice(
                                                installmentPlan.outstandingAmount
                                            )}
                                        </Text>
                                    </Box>
                                </Flex>
                            </Flex>
                        )}

                        {!isEmpty(installmentPlan) && (
                            <Flex
                                alignItems="flex-end"
                                justifyContent="space-between"
                                mt="5px"
                            >
                                <Box>
                                    <Text
                                        fontSize={[1, '', 2]}
                                        lineHeight="20px"
                                        textTransform="capitalize"
                                        letterSpacing={['-0.4px', '', '-0.6px']}
                                        color="text.black"
                                    >
                                        Down Payment
                                    </Text>
                                </Box>
                                <Box>
                                    <Text
                                        fontSize={[1, '', 2]}
                                        lineHeight={1}
                                        fontWeight="bold"
                                        letterSpacing={['-0.4px', '', '-0.6px']}
                                        color="text.black"
                                    >
                                        {renderPrice(
                                            installmentPlan.downPaymentAmount
                                        )}
                                    </Text>
                                </Box>
                            </Flex>
                        )}

                        {!isEmpty(installmentPlan) && (
                            <Text mt="20px">
                                *you will only be charged for the down payment
                                today
                            </Text>
                        )}
                    </Box>
                </Box>
            )}
        </Box>
    );
};

ProcedureSummaryView.propTypes = {
    procedures: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            date: PropTypes.string,
            price: PropTypes.string,
        })
    ),
    totalPrice: PropTypes.string,
    discountPrice: PropTypes.string,
    originalPrice: PropTypes.string,
    installmentPlan: PropTypes.shape({
        numChargePeriods: PropTypes.number.isRequired,
        interval: PropTypes.string.isRequired,
        downPaymentAmount: PropTypes.number.isRequired,
        outstandingAmount: PropTypes.number.isRequired,
        recurringChargeAmount: PropTypes.number.isRequired,
        productName: PropTypes.string,
    }),
};

ProcedureSummaryView.defaultProps = {
    procedures: [
        {
            name: 'Surgical Placement of Implant Body:  Endosteal Implant',
            price: '25251',
        },
        {
            name: 'Gum Surgery',
            price: '100000',
        },
    ],
    totalPrice: '125251',
    originalPrice: '225251',
    discountPrice: '25251',
    installmentPlan: {
        numChargePeriods: 2,
        interval: 'month',
        downPaymentAmount: 30000,
        outstandingAmount: 20000,
        recurringChargeAmount: 10000,
        productName: 'something',
    },
};

export default ProcedureSummaryView;
