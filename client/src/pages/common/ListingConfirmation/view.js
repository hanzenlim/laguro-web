import React from 'react';
import PropTypes from 'prop-types';

import { Box, Flex, Text, Icon, Card } from '../../../components';

const ListingConfirmation = props => {
    const { name, address, listings, equipment } = props;

    return (
        <Box width="100%" mt={140} mb={60}>
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
                You're all set!
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
                    numChairsAvailable,
                    chairHourlyPrice,
                    cleaningFee,
                }) => (
                    <Card key={id} p={[20, '', 28]} mb={10}>
                        <Text
                            fontSize={[1, '', 4]}
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
                        {equipment.length > 0 && (
                            <Text
                                fontSize={[1, '', 4]}
                                fontWeight="bold"
                                color="text.gray"
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
                                fontSize={'16px'}
                                fontWeight="500"
                                color="text.black"
                                pb={16}
                            >
                                {e.name}
                            </Text>
                        ))}
                        <Text
                            fontSize={[1, '', 4]}
                            fontWeight="bold"
                            color="text.gray"
                            mt={10}
                            pb={14}
                            borderBottom="1px solid"
                            borderColor="divider.dustyGray"
                            mb={20}
                        >
                            CLEANING FEE
                        </Text>
                        <Text
                            fontSize={2}
                            fontWeight="500"
                            color="text.black"
                            pb={18}
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
                            <Box width={['100%', '', '262px']}>
                                <Text
                                    fontSize={[1, '', 4]}
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
                                        {chairHourlyPrice}{' '}
                                    </Text>
                                    per hour
                                </Text>
                            </Box>
                        </Flex>
                    </Card>
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
