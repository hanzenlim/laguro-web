import React from 'react';
import PropTypes from 'prop-types';
import { renderPrice } from '../../../util/paymentUtil';
import { Box, Flex, Text } from '../../../components';

const ProcedureSummaryView = props => {
    const { procedures, serviceFee, totalPrice } = props;

    return (
        <Box maxWidth={662} width="100%">
            <Box px={[0, '', 38]} py={[0, '', 26]} boxShadow={['none', '', 0]}>
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

                {procedures.map(procedure => (
                    <Flex
                        borderBottom="1px solid"
                        pb={[8, '', 10]}
                        mb={[10, '', 12]}
                        borderColor="divider.black"
                        alignItems="flex-end"
                        justifyContent="space-between"
                    >
                        <Box>
                            <Text
                                fontSize={[1, '', 2]}
                                lineHeight="20px"
                                fontWeight="500"
                                letterSpacing={['-0.4px', '', '-0.6px']}
                                color="text.black"
                            >
                                {procedure.name}
                            </Text>

                            <Text
                                fontSize={[1, '', 2]}
                                lineHeight="20px"
                                fontWeight="300"
                                letterSpacing={['-0.4px', '', '-0.6px']}
                                color="text.black"
                            >
                                {procedure.date}
                            </Text>
                        </Box>
                        <Box>
                            <Text
                                fontSize={[1, '', 2]}
                                lineHeight={1}
                                letterSpacing={['-0.4px', '', '-0.6px']}
                                color="text.black"
                            >
                                {renderPrice(procedure.price)}
                            </Text>
                        </Box>
                    </Flex>
                ))}

                {serviceFee > 0 ? (
                    <Flex
                        borderBottom="1px solid"
                        pb={[8, '', 10]}
                        mb={[10, '', 12]}
                        borderColor="divider.black"
                        alignItems="flex-end"
                        justifyContent="space-between"
                    >
                        <Box>
                            <Text
                                fontSize={[1, '', 2]}
                                lineHeight="20px"
                                fontWeight="500"
                                letterSpacing={['-0.4px', '', '-0.6px']}
                                color="text.black"
                            >
                                Service fee
                            </Text>
                        </Box>
                        <Box>
                            <Text
                                fontSize={[1, '', 2]}
                                lineHeight={1}
                                letterSpacing={['-0.4px', '', '-0.6px']}
                                color="text.black"
                            >
                                {renderPrice(serviceFee)}
                            </Text>
                        </Box>
                    </Flex>
                ) : null}

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
