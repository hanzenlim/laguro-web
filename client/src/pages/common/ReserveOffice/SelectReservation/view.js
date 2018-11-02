import React from 'react';
import moment from 'moment';
import _isEmpty from 'lodash/isEmpty';
import { Box, Text, Flex, Button, Counter } from '../../../../components';
import SelectHours from '../../SelectHours';
import SelectEquipment from '../../SelectEquipment';
import SummaryCost from '../SummaryCost';

const renderHourSlotsBlocks = (list, priceRange, selectedHoursHandler) => {
    const dateList = Object.keys(list);
    let counter = 0;
    return dateList.map(dateText => {
        if (_isEmpty(list[dateText])) {
            return null;
        }

        counter++;
        return (
            <Box mb={26}>
                <SelectHours
                    isToggleOpen={counter <= 3}
                    priceRangeLength={Object.keys(priceRange).length}
                    hourList={list[dateText]}
                    formattedDateText={moment(dateText).format('ddd M/D')}
                    selectedHoursHandler={(
                        selectedHours,
                        selectedPrice,
                        selectedCleaningFee,
                        selectedListingId
                    ) =>
                        selectedHoursHandler(
                            dateText,
                            selectedHours,
                            selectedPrice,
                            selectedCleaningFee,
                            selectedListingId
                        )
                    }
                />
            </Box>
        );
    });
};

const getFormattedPriceRange = priceRange =>
    Object.keys(priceRange).length > 1
        ? `$${priceRange.minPrice} ~ $${priceRange.maxPrice}`
        : `$${priceRange.minPrice}`;

const SelectReservationView = ({
    hourSlotsData,
    priceRange,
    selectedHoursHandler,
    makeReservationHandler,
    onChairCounterHandler,
    officeEquipment,
    onSelectEquipment,
    summaryDetailsData,
    totalPrice,
}) => {
    if (_isEmpty(hourSlotsData)) {
        return (
            <Text textAlign="center" color="text.gray" my={50}>
                Sorry no listings available. Please pick another date
            </Text>
        );
    }

    return (
        <Box mt={30}>
            <Text mb={8} lineHeight="40px" color="text.black">
                <Text is="span" fontSize={[24, '', 5]} fontWeight="bold">
                    {getFormattedPriceRange(priceRange)}{' '}
                </Text>
                <Text is="span" fontSize={[24, '', 2]} fontWeight="500">
                    per hour
                </Text>
            </Text>
            <Box mb={30}>
                {renderHourSlotsBlocks(
                    hourSlotsData,
                    priceRange,
                    selectedHoursHandler
                )}
            </Box>
            <Flex mb={20} justifyContent="space-between">
                <Flex flexDirection="column" mr={14}>
                    <Text
                        fontSize={[1, '', 2]}
                        fontWeight="bold"
                        color="text.black"
                    >
                        Chairs needed
                    </Text>
                    <Text fontSize={1} color="text.black">
                        {getFormattedPriceRange(priceRange)} / chair / hr
                    </Text>
                </Flex>
                <Counter onCounterCountHandler={onChairCounterHandler} />
            </Flex>

            <SelectEquipment
                officeEquipment={officeEquipment}
                onSelectEquipment={onSelectEquipment}
            />
            <Box mt={30}>
                <SummaryCost
                    summaryData={summaryDetailsData}
                    totalPrice={totalPrice}
                />
            </Box>
            <Button
                mt={36}
                width="100%"
                fontSize={[1, '', 3]}
                height={['50px', '', '60px']}
                onClick={makeReservationHandler}
            >
                book a chair
            </Button>
        </Box>
    );
};

export default SelectReservationView;
