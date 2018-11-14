import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { renderPrice } from '../../../util/paymentUtil';
import { Box, Flex, Text, Icon, Button } from '../../../components';

const RejectButton = styled(Button)`
    &&&& {
        > * {
            &:first-child {
                display: block;
            }

            &:last-child {
                display: none;
            }
        }

        &:hover {
            > * {
                &:first-child {
                    display: none;
                }

                &:last-child {
                    display: block;
                }
            }
        }
    }
`;

const ProcedureSummaryView = props => {
    const { procedures, serviceFee, totalPrice, rejectProcedure } = props;

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

                {procedures.map(procedure => {
                    const { id, name, date, price, rejected } = procedure;
                    return (
                        <Flex
                            key={id}
                            alignItems="center"
                            mb={[10, '', 12]}
                            borderBottom="1px solid"
                            borderColor="divider.black"
                        >
                            <Box px={16}>
                                {rejected ? (
                                    <Button
                                        type="ghost"
                                        onClick={rejectProcedure(id)}
                                    >
                                        <Icon
                                            type="revert"
                                            width={20}
                                            height={20}
                                        />
                                    </Button>
                                ) : (
                                    <RejectButton
                                        type="ghost"
                                        onClick={rejectProcedure(id)}
                                    >
                                        <Icon
                                            type="closeCircle"
                                            width={20}
                                            height={20}
                                        />
                                        <Icon
                                            type="closeCircleHover"
                                            width={20}
                                            height={20}
                                        />
                                    </RejectButton>
                                )}
                            </Box>
                            <Flex
                                pb={[8, '', 10]}
                                alignItems="flex-end"
                                justifyContent="space-between"
                                width="100%"
                                opacity={rejected ? 0.2 : 1}
                            >
                                <Box>
                                    <Text
                                        fontSize={[1, '', 2]}
                                        lineHeight="20px"
                                        fontWeight="500"
                                        letterSpacing={['-0.4px', '', '-0.6px']}
                                        color="text.black"
                                    >
                                        {name}
                                    </Text>

                                    <Text
                                        fontSize={[1, '', 2]}
                                        lineHeight="20px"
                                        fontWeight="300"
                                        letterSpacing={['-0.4px', '', '-0.6px']}
                                        color="text.black"
                                    >
                                        {date}
                                    </Text>
                                </Box>
                                <Box>
                                    <Text
                                        fontSize={[1, '', 2]}
                                        lineHeight={1}
                                        letterSpacing={['-0.4px', '', '-0.6px']}
                                        color="text.black"
                                    >
                                        {renderPrice(price)}
                                    </Text>
                                </Box>
                            </Flex>
                        </Flex>
                    );
                })}

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
    rejectProcedure: PropTypes.func.isRequired,
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
