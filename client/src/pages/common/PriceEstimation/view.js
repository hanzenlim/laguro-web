import React from 'react';
import { Box, Text, Flex } from '../../../components';
import { Spin } from 'antd';
import PriceEstimationBundle from './PriceEstimationBundle';
import { getInsuranceText } from '../../../util/insuranceUtil';

const PriceEstimationView = props => {
    const {
        insurancePrice,
        deductibleRemaining,
        annualMaximumRemaining,
        coverage,
        price,
        outOfPocket,
        procedures,
        proceduresDetail,
        insurance,
        withInsurance,
        insuranceName,
        patientName,
        insuranceNumber,
        dateUpdated,
        onSelectProcedure,
        onCheckOutOfPocketCost,
        onAddInsurance,
        isLoading,
        selectedProcedure,
        selectedProcedureName,
        selectedInsurance,
        hasCheckedOutOfPocketCost,
    } = props;

    return (
        <Box opacity={isLoading ? '0.65' : '1'} position="relative">
            {isLoading && (
                <Flex
                    top="0"
                    bottom="0"
                    left="0"
                    right="0"
                    position="absolute"
                    alignItems="center"
                    justifyContent="center"
                    zIndex="100"
                >
                    <Spin />
                </Flex>
            )}
            <Text
                fontSize={[1, '', 2]}
                letterSpacing={['0.05px', '', '-0.4px']}
                lineHeight="30px"
                fontWeight="medium"
                mb={[3, '', 5]}
            >
                Price estimation
            </Text>
            <Text
                fontSize={1}
                lineHeight="26px"
                letterSpacing="-0.51px"
                style={{ 'white-space': 'pre-line' }}
                mb="22px"
            >
                {/* TODO: Get copy */}{' '}
            </Text>
            <Box
                width="100%"
                maxWidth={['100%', '', '752px']}
                height="auto"
                boxShadow="1px 1px 12px 0 rgba(0, 0, 0, 0.06), -1px -1px 12px 0 rgba(0, 0, 0, 0.06)"
                background-color="#ffffff"
                p="22px"
            >
                <Flex
                    height="100%"
                    alignItems={['center', 'flex-start', 'flex-start']}
                    flexDirection={['column', 'row', 'row']}
                >
                    <Box maxWidth="254px" width="100%">
                        <PriceEstimationBundle
                            hasCheckedOutOfPocketCost={
                                hasCheckedOutOfPocketCost
                            }
                            selectedInsurance={selectedInsurance}
                            selectedProcedure={selectedProcedure}
                            selectedProcedureName={selectedProcedureName}
                            price={price}
                            insurancePrice={insurancePrice}
                            variant="priceEstimation"
                            procedures={procedures}
                            insurance={insurance}
                            onSelectProcedure={onSelectProcedure}
                            onCheckOutOfPocketCost={onCheckOutOfPocketCost}
                            onAddInsurance={onAddInsurance}
                        />
                    </Box>
                    <Box
                        width="100%"
                        maxWidth={['100%', '', '408px']}
                        borderLeft={['none', '1px solid #dbdbdb', '']}
                        pl={[0, '22px', '']}
                        ml={[0, '20px', '']}
                        mt={[20, 0, '']}
                    >
                        <Box pb="8px">
                            <Text
                                color="#303449"
                                fontSize="12px"
                                letterSpacing="-0.7px"
                                fontWeight="500"
                            >
                                {withInsurance ? (
                                    <Text is="span">
                                        OUT-OF-POCKET PRICE ESTIMATION WITH{' '}
                                        <Text
                                            is="span"
                                            color="text.blue"
                                            textTransform="uppercase"
                                        >
                                            {getInsuranceText(insuranceName)}
                                        </Text>
                                    </Text>
                                ) : (
                                    'OUT-OF-POCKET PRICE ESTIMATION'
                                )}
                            </Text>
                            {withInsurance && (
                                <Flex ml="15px" mt="4px">
                                    <Text
                                        color="#9b9b9b"
                                        fontSize="10px"
                                        letterSpacing="-0.7px"
                                    >
                                        Estimation for {patientName} •{' '}
                                        {insuranceNumber
                                            ? `Insurance
                                        no. ${insuranceNumber}  •`
                                            : ''}{' '}
                                        Last updated on {dateUpdated}
                                    </Text>
                                </Flex>
                            )}
                        </Box>
                        <Box
                            borderTop="1px solid"
                            borderBottom="1px solid"
                            borderColor="#dbdbdb"
                            py="14px"
                        >
                            <Flex justifyContent="space-between" mb="4px">
                                <Text
                                    color="#303449"
                                    fontSize="12px"
                                    letterSpacing="-0.7px"
                                >
                                    Estimated price for {selectedProcedureName}
                                </Text>
                                <Text
                                    fontSize="12px"
                                    color="#303449"
                                    letterSpacing="-0.7px"
                                    fontWeight="500"
                                >
                                    {price}
                                </Text>
                            </Flex>
                            <Flex ml="15px" flexDirection="column">
                                {proceduresDetail.map(p => (
                                    <Text
                                        color="#9b9b9b"
                                        fontSize="10px"
                                        letterSpacing="0"
                                        mb="3px"
                                    >
                                        {p.name}
                                    </Text>
                                ))}
                            </Flex>
                            {withInsurance && (
                                <Box>
                                    <Flex
                                        justifyContent="space-between"
                                        mb="4px"
                                        mt="16px"
                                    >
                                        <Text
                                            color="#303449"
                                            fontSize="12px"
                                            letterSpacing="-0.7px"
                                        >
                                            Insurance coverage
                                        </Text>
                                        <Text
                                            fontSize="12px"
                                            color="#b11f29"
                                            letterSpacing="-0.7px"
                                            fontWeight="500"
                                        >
                                            {coverage}
                                        </Text>
                                    </Flex>
                                    <Flex ml="15px" flexDirection="column">
                                        <Flex
                                            justifyContent="space-between"
                                            mt="3px"
                                        >
                                            <Text
                                                color="#9b9b9b"
                                                fontSize="10px"
                                                letterSpacing="0"
                                                mb="3px"
                                            >
                                                Deductable
                                            </Text>
                                            <Text
                                                color="#9b9b9b"
                                                fontSize="10px"
                                                letterSpacing="0"
                                                mb="3px"
                                            >
                                                {deductibleRemaining}
                                            </Text>
                                        </Flex>
                                        <Flex
                                            justifyContent="space-between"
                                            mt="3px"
                                        >
                                            <Text
                                                color="#9b9b9b"
                                                fontSize="10px"
                                                letterSpacing="0"
                                                mb="3px"
                                            >
                                                Remaining annual coverage
                                            </Text>
                                            <Text
                                                color="#9b9b9b"
                                                fontSize="10px"
                                                letterSpacing="0"
                                                mb="3px"
                                            >
                                                {annualMaximumRemaining}
                                            </Text>
                                        </Flex>
                                    </Flex>
                                </Box>
                            )}
                        </Box>
                        <Flex justifyContent="flex-end" mt="12px">
                            <Text
                                fontSize="12px"
                                fontWeight="500"
                                letterSpacing="-0.8px"
                                mr="18px"
                            >
                                Out-of-pocket cost* :
                            </Text>
                            <Text
                                fontWeight="500"
                                fontSize="14px"
                                letterSpacing="-0.8px"
                                color="text.blue"
                            >
                                {withInsurance ? outOfPocket : price}
                            </Text>
                        </Flex>

                        <Flex mt="12px">
                            <Text
                                fontSize="10px"
                                color="#303449"
                                textAlign="right"
                                fontWeight="300"
                                letterSpacing="-0.7px"
                            >
                                *This is an estimation based on the insurance
                                input. Actual coverage pricing may differ.
                            </Text>
                        </Flex>
                    </Box>
                </Flex>
            </Box>
        </Box>
    );
};

PriceEstimationView.propTypes = {};

export default PriceEstimationView;
