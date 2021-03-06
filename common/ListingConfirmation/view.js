import React from 'react';
import PropTypes from 'prop-types';

import { Box, Flex, Text, Card } from '~/components';
import { ListingTime } from '~/util/timeUtil';

const ListingConfirmation = props => {
    const { name, address, listings } = props;

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
                (
                    {
                        id,
                        availability,
                        numChairsAvailable,
                        localStartTime,
                        localEndTime,
                        category,
                    },
                    index
                ) => {
                    const { startDay, endDay, days } = availability;
                    const frequency = days.map(
                        d => d.charAt(0) + d.slice(1).toLowerCase()
                    );

                    return (
                        <Box key={id} mb={20}>
                            <Card p={[20, '', 28]} mb={10}>
                                <Text
                                    fontWeight="medium"
                                    fontSize={[1, '', 2]}
                                    color="text.blue"
                                    mb={9}
                                >{`LISTING ${index + 1}`}</Text>
                                <Text
                                    fontSize={[1, '', 4]}
                                    fontWeight="bold"
                                    color="text.blue"
                                    pb={10}
                                >
                                    AVAILABILITY
                                </Text>
                                <ListingTime
                                    startDate={startDay}
                                    endDate={endDay}
                                    startTime={localStartTime}
                                    endTime={localEndTime}
                                    frequency={frequency}
                                    index={index}
                                />
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
                                                numChairsAvailable > 1
                                                    ? 's'
                                                    : ''
                                            }`}
                                        </Text>
                                    </Box>
                                    <Box width={['100%', '', '256px']}>
                                        <Text
                                            fontSize={[1, '', 4]}
                                            fontWeight="bold"
                                            color="text.blue"
                                            pb={10}
                                            mt={10}
                                        >
                                            PLAN
                                        </Text>
                                        <Text
                                            fontSize={2}
                                            fontWeight="500"
                                            color="text.black"
                                            lineHeight={1}
                                            pb={18}
                                        >
                                            Option {category}
                                        </Text>
                                    </Box>
                                </Flex>
                            </Card>
                        </Box>
                    );
                }
            )}
        </Box>
    );
};
const listingShape = PropTypes.shape({
    availability: PropTypes.string,
    numChairsAvailable: PropTypes.number,
    chairHourlyPrice: PropTypes.string,
});
ListingConfirmation.propTypes = {
    name: PropTypes.string,
    address: PropTypes.string,
    listings: PropTypes.arrayOf(listingShape),
};
export default ListingConfirmation;
