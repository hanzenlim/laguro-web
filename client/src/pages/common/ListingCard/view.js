import React from 'react';
import { Box, Card, Flex, Text } from '../../../components';
import ListingInfo from '../ListingInfo';
import { ListingTime } from '../../../util/timeUtil';

const ListingCard = props => {
    const {
        startDate,
        endDate,
        startTime,
        endTime,
        availableChairs,
        frequency,
        index,
        category,
    } = props;

    return (
        <Card p={[20, '', 28]}>
            <Flex textAlign="left" flexDirection="column">
                <Text
                    fontWeight="medium"
                    fontSize={[1, '', 2]}
                    color="text.blue"
                    mb={9}
                >{`LISTING ${index + 1}`}</Text>
                <ListingTime
                    startDate={startDate}
                    endDate={endDate}
                    startTime={startTime}
                    endTime={endTime}
                    frequency={frequency}
                    index={index}
                />
                <Box
                    borderBottom="solid 1px rgba(0, 0, 0, 0.08)"
                    height={16}
                    mb={8}
                />
                <ListingInfo
                    availableChairs={availableChairs}
                    category={category}
                />
            </Flex>
        </Card>
    );
};

export default ListingCard;
