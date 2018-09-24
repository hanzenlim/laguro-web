import React from 'react';
import PropTypes from 'prop-types';

import { Box, Flex, Text, Icon } from '../../../components';

const ListingConfirmation = props => {
    const { name, address, listings } = props;

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
                Your first listings have been created.
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

            {listings.map(
                ({
                    id,
                    availability,
                    equipments,
                    numChairsAvailable,
                    chairHourlyPrice,
                }) => (
                    <Box
                        key={id}
                        pl={50}
                        pr={44}
                        py={32}
                        mb={10}
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
                        <Text
                            fontSize={2}
                            fontWeight="500"
                            color="text.black"
                            pb={18}
                        >
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
                        {equipments.map((item, index) => (
                            <Text
                                key={index}
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
                                        {numChairsAvailable}{' '}
                                    </Text>
                                    chair
                                    {numChairsAvailable > 1 ? 's' : ''}
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
                                        ${chairHourlyPrice}{' '}
                                    </Text>
                                    per hour
                                </Text>
                            </Box>
                        </Flex>
                    </Box>
                )
            )}
        </Box>
    );
};

const listingShape = PropTypes.shape({
    availability: PropTypes.string,
    equipments: PropTypes.arrayOf(PropTypes.string),
    numChairsAvailable: PropTypes.number,
    chairHourlyPrice: PropTypes.string,
});

ListingConfirmation.propTypes = {
    name: PropTypes.string,
    address: PropTypes.string,
    listings: PropTypes.arrayOf(listingShape),
};

export default ListingConfirmation;
