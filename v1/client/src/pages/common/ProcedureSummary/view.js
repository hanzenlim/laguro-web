import React from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, Text } from '../../../components';

const ProcedureSummaryView = props => {
    const { procedures, serviceFee, totalPrice } = props;

    return (
        <Box maxWidth={662} width="100%">
            <Text
                fontSize={5}
                lineHeight={1}
                fontWeight="bold"
                letterSpacing="-0.6px"
                color="text.gray"
                mb={20}
            >
                Consent and Payment
            </Text>
            <Text
                mb={30}
                fontSize={5}
                lineHeight={1}
                fontWeight="bold"
                letterSpacing="-0.6px"
                color="text.black"
            >
                Review and pay for your procedure
            </Text>
            <Box px={38} py={26} boxShadow={0}>
                <Text
                    fontSize={4}
                    lineHeight={1}
                    fontWeight="bold"
                    letterSpacing="-0.6px"
                    color="text.black"
                    pb={28}
                >
                    Procedure Summary
                </Text>

                {procedures.map(procedure => (
                    <Flex
                        borderBottom="1px solid"
                        pb={10}
                        mb={12}
                        borderColor="divider.black"
                        alignItems="flex-end"
                        justifyContent="space-between"
                    >
                        <Box>
                            <Text
                                fontSize={2}
                                lineHeight="20px"
                                fontWeight="500"
                                letterSpacing="-0.6px"
                                color="text.black"
                            >
                                {procedure.name}
                            </Text>

                            <Text
                                fontSize={2}
                                lineHeight="20px"
                                fontWeight="300"
                                letterSpacing="-0.6px"
                                color="text.black"
                            >
                                {procedure.date}
                            </Text>
                        </Box>
                        <Box>
                            <Text
                                fontSize={2}
                                lineHeight={1}
                                letterSpacing="-0.6px"
                                color="text.black"
                            >
                                {procedure.price}
                            </Text>
                        </Box>
                    </Flex>
                ))}

                <Flex
                    borderBottom="1px solid"
                    pb={10}
                    mb={12}
                    borderColor="divider.black"
                    alignItems="flex-end"
                    justifyContent="space-between"
                >
                    <Box>
                        <Text
                            fontSize={2}
                            lineHeight="20px"
                            fontWeight="500"
                            letterSpacing="-0.6px"
                            color="text.black"
                        >
                            Service fee
                        </Text>
                    </Box>
                    <Box>
                        <Text
                            fontSize={2}
                            lineHeight={1}
                            letterSpacing="-0.6px"
                            color="text.black"
                        >
                            {serviceFee}
                        </Text>
                    </Box>
                </Flex>
                <Flex alignItems="flex-end" justifyContent="space-between">
                    <Box>
                        <Text
                            fontSize={2}
                            lineHeight="20px"
                            fontWeight="bold"
                            letterSpacing="-0.6px"
                            color="text.black"
                        >
                            Total
                        </Text>
                    </Box>
                    <Box>
                        <Text
                            fontSize={2}
                            lineHeight={1}
                            fontWeight="bold"
                            letterSpacing="-0.6px"
                            color="text.black"
                        >
                            {totalPrice}
                        </Text>
                    </Box>
                </Flex>
            </Box>
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
    serviceFee: PropTypes.string,
    totalPrice: PropTypes.string,
};

ProcedureSummaryView.defaultProps = {
    procedures: [
        {
            name: 'Surgical Placement of Implant Body:  Endosteal Implant',
            date: '8:00 PM Aug 28. 2018',
            price: '$252.51',
        },
        {
            name: 'Gum Surgery',
            date: '6:00 PM Aug 30. 2018',
            price: '$1000.00',
        },
    ],
    serviceFee: '$30.00',
    totalPrice: '$1252.51',
};

export default ProcedureSummaryView;
