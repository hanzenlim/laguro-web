import React from 'react';
import PropTypes from 'prop-types';

import { Box, Flex, Text, Icon } from '../../../components';

const ListingConfirmation = props => {
    const {
        name,
        address,
        availability,
        equipments,
        numOfChairs,
        hourlyPriceOfChair,
    } = props;

    return (
        <Box width={668}>
            <Text
                fontSize={5}
                fontWeight="bold"
                color="text.gray"
                lineHeight={1}
                pb={14}
            >
                Confirmation
            </Text>
            <Text
                fontSize={5}
                fontWeight="bold"
                color="text.trueBlack"
                lineHeight={1}
                pb={50}
            >
                Your first listing has been created.
            </Text>
            <Text
                fontSize={6}
                fontWeight="bold"
                color="text.trueBlack"
                lineHeight={1}
                pb={10}
            >
                {name}
            </Text>
            <Flex alignItems="center" pb={36}>
                <Icon type="locationPinWithFill" fontSize={2} mr={12} />
                <Text fontSize={4} color="text.trueBlack" lineHeight={1}>
                    {address}
                </Text>
            </Flex>
            <Box
                pl={50}
                pr={44}
                py={32}
                boxShadow={1}
                bg="background.white"
                borderRadius="4px"
            >
                <Text
                    fontSize={4}
                    fontWeight="bold"
                    color="text.gray"
                    pb={14}
                    borderBottom="1px solid"
                    borderColor="divider.dustyGray"
                    mb={20}
                >
                    AVAILABILITY
                </Text>
                <Text fontSize={2} fontWeight="500" color="text.black" pb={18}>
                    {availability}
                </Text>
                <Text
                    fontSize={4}
                    fontWeight="bold"
                    color="text.gray"
                    lineHeight={1}
                    pb={14}
                    mt={10}
                    borderBottom="1px solid"
                    borderColor="divider.dustyGray"
                    mb={20}
                >
                    EQUIPMENTS
                </Text>
                {equipments.map(item => (
                    <Text
                        fontSize={2}
                        fontWeight="500"
                        color="text.black"
                        lineHeight={1}
                        pb={18}
                    >
                        {item}
                    </Text>
                ))}
                <Flex justifyContent="space-between">
                    <Box width="256px">
                        <Text
                            fontSize={4}
                            fontWeight="bold"
                            color="text.gray"
                            pb={14}
                            mt={10}
                            borderBottom="1px solid"
                            borderColor="divider.dustyGray"
                            mb={20}
                        >
                            NUMBER OF CHAIRS
                        </Text>
                        <Text
                            fontSize={3}
                            fontWeight="500"
                            color="text.black"
                            lineHeight={1}
                            pb={18}
                        >
                            <Text is="span" fontWeight="bold">
                                {numOfChairs}{' '}
                            </Text>
                            chairs
                        </Text>
                    </Box>
                    <Box width="262px">
                        <Text
                            fontSize={4}
                            fontWeight="bold"
                            color="text.gray"
                            pb={14}
                            mt={10}
                            borderBottom="1px solid"
                            borderColor="divider.dustyGray"
                            mb={20}
                        >
                            HOURLY CHAIR PRICE
                        </Text>
                        <Text
                            fontSize={3}
                            fontWeight="500"
                            color="text.black"
                            lineHeight={1}
                            pb={18}
                        >
                            <Text is="span" fontWeight="bold">
                                {hourlyPriceOfChair}{' '}
                            </Text>
                            per hour
                        </Text>
                    </Box>
                </Flex>
            </Box>
        </Box>
    );
};

ListingConfirmation.propTypes = {
    name: PropTypes.string,
    address: PropTypes.string,
    availability: PropTypes.string,
    equipments: PropTypes.string.array,
    numOfChairs: PropTypes.string,
    hourlyPriceOfChairnumOfChairs: PropTypes.string,
};

ListingConfirmation.defaultProps = {
    name: 'Bell Dental',
    address: '1598 Washington Ave, San Leandro, CA 94577',
    availability: 'Sep 1, 2018 — Oct 3, 2018 , 9AM - 6PM',
    equipments: ['Mobile Cabinets', 'Excavators', 'Curetts', 'Operative burs'],
    numOfChairs: '3',
    hourlyPriceOfChair: '$84.17',
};

export default ListingConfirmation;
