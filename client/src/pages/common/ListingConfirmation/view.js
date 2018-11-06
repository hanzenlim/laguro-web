import React from 'react';
import PropTypes from 'prop-types';

import { Box, Flex, Text, Card } from '../../../components';

const ListingConfirmation = props => {
    const { name, address, listings, equipment } = props;

    return (
        <Box width="100%" mt={[0, '', 140]} mb={60}>
            <Text
                fontSize={[2, '', 5]}
                fontWeight="bold"
                color="text.gray"
                lineHeight={[1.88, '', 1]}
                pb={[0, '', 14]}
            >
                Confirmation
            </Text>
            <Text
                fontSize={[2, '', 5]}
                fontWeight="bold"
                color="text.trueBlack"
                lineHeight={1}
                pb={[16, '', 50]}
            >
                You're all set!
            </Text>
            <Text
                fontSize={[5, '', 6]}
                fontWeight="bold"
                color="text.trueBlack"
                lineHeight={[1.43, '', 1]}
                pb={[0, '', 10]}
            >
                {name}
            </Text>
            <Flex alignItems="center" pb={36}>
                <Text
                    fontSize={[0, '', 4]}
                    color="text.trueBlack"
                    lineHeight={[1.43, '', 1]}
                >
                    {address}
                </Text>
            </Flex>
            {listings.map(
                ({
                    id,
                    availability,
                    numChairsAvailable,
                    chairHourlyPrice,
                    cleaningFee,
                }) => (
                    <Box key={id} mb={20}>
                        <Card p={[20, '', 28]} mb={10}>
                            <Text
                                fontSize={[1, '', 4]}
                                fontWeight="bold"
                                color="text.blue"
                                pb={10}
                            >
                                AVAILABILITY
                            </Text>
                            <Text
                                fontSize={2}
                                fontWeight="500"
                                color="text.black"
                                pb={18}
                                lineHeight={1}
                            >
                                {availability}
                            </Text>
                            {equipment.length > 0 && (
                                <Text
                                    fontSize={[1, '', 4]}
                                    fontWeight="bold"
                                    color="text.blue"
                                    mt={10}
                                    pb={14}
                                    borderBottom="1px solid"
                                    borderColor="divider.dustyGray"
                                    mb={20}
                                >
                                    EQUIPMENT
                                </Text>
                            )}
                            {equipment.map(e => (
                                <Text
                                    fontSize={2}
                                    fontWeight="500"
                                    color="text.black"
                                    pb={16}
                                    lineHeight={1}
                                >
                                    {e.name}
                                </Text>
                            ))}
                            <Text
                                fontSize={[1, '', 4]}
                                fontWeight="bold"
                                mt={10}
                                color="text.blue"
                                pb={10}
                            >
                                CLEANING FEE
                            </Text>
                            <Text
                                fontSize={2}
                                fontWeight="500"
                                color="text.black"
                                pb={18}
                                lineHeight={1}
                            >
                                {cleaningFee}
                            </Text>
                            <Flex
                                justifyContent="space-between"
                                flexDirection={['column', '', 'row']}
                            >
                                <Box width={['100%', '', '256px']}>
                                    <Text
                                        fontSize={[1, '', 4]}
                                        fontWeight="bold"
                                        color="text.blue"
                                        pb={10}
                                        mt={10}
                                    >
                                        NUMBER OF CHAIRS
                                    </Text>
                                    <Text
                                        fontSize={2}
                                        fontWeight="500"
                                        color="text.black"
                                        lineHeight={1}
                                        pb={18}
                                    >
                                        {`${numChairsAvailable} chair${
                                            numChairsAvailable > 1 ? 's' : ''
                                        }`}
                                    </Text>
                                </Box>
                                <Box width={['100%', '', '262px']}>
                                    <Text
                                        fontSize={[1, '', 4]}
                                        fontWeight="bold"
                                        color="text.blue"
                                        pb={10}
                                        mt={10}
                                    >
                                        HOURLY CHAIR PRICE
                                    </Text>
                                    <Text
                                        fontSize={2}
                                        fontWeight="500"
                                        color="text.black"
                                        lineHeight={1}
                                        pb={18}
                                    >
                                        {`${chairHourlyPrice} per hour`}
                                    </Text>
                                </Box>
                            </Flex>
                        </Card>
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
