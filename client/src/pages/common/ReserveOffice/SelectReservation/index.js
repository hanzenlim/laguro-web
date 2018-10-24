import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query, ApolloConsumer } from 'react-apollo';
import moment from 'moment-timezone';
import { message } from 'antd';
import _uniqWith from 'lodash/uniqWith';
import _filter from 'lodash/filter';
import _isEmpty from 'lodash/isEmpty';
import _uniq from 'lodash/uniq';
import _isEqual from 'lodash/isEqual';
import _remove from 'lodash/remove';
import _min from 'lodash/min';
import _max from 'lodash/max';
import _indexOf from 'lodash/indexOf';
import _reduce from 'lodash/reduce';
import _get from 'lodash/get';
import { Loading } from '../../../../components';
import SelectReservationView from './view';
import { RedirectErrorPage } from '../../../../pages/GeneralErrorPage';
import {
    getListingQuery,
    getOfficeEquipments,
    getNumRemainingChairsQuery,
} from './queries';
import {
    OFFICE_ID,
    END_TIME,
    STATUS,
    ACTIVE,
    BOOKING_FEE_PERCENTAGE,
} from '../../../../util/strings';
import { renderPrice } from '../../../../util/paymentUtil';

const hourList = [
    '12am',
    '1am',
    '2am',
    '3am',
    '4am',
    '5am',
    '6am',
    '7am',
    '8am',
    '9am',
    '10am',
    '11am',
    '12pm',
    '1pm',
    '2pm',
    '3pm',
    '4pm',
    '5pm',
    '6pm',
    '7pm',
    '8pm',
    '9pm',
    '10pm',
    '11pm',
];

// Given a start time and end time calculate the
// hour slots in between those time.
// Given the following params
// start: 2018-09-14T09:00:00-07:00
// end: 2018-09-15T13:00:00-07:00
// return array will look like this
// [
//  {time: "9am", price: "5000", cleaningFee: 1500, listingId: '3fg43a-2342fa-ewf323},
//  {time: "10am", price: "5000", cleaningFee: 1500, listingId: '3fg43a-2342fa-ewf323},
//  {time: "11am", price: "5000", cleaningFee: 1500, listingId: '3fg43a-2342fa-ewf323},
//  {time: "12pm", price: "5000", cleaningFee: 1500, listingId: '3fg43a-2342fa-ewf323},
// ]
const getPriceAndHourSlot = (
    start,
    end,
    price,
    cleaningFee,
    listingId,
    numChairsSelected
) => {
    const startTime = moment(start);
    const endTime = moment(end);
    const diffHours = endTime.hour() - startTime.hour();

    const calculatedHourList = [];
    for (let i = 0; i < hourList.length; i++) {
        if (hourList[i] === startTime.format('ha')) {
            for (let y = 0; y < diffHours; y++) {
                calculatedHourList.push({
                    time: hourList[i + y],
                    price,
                    cleaningFee,
                    listingId,
                    numChairsSelected,
                });
            }
        }
    }

    return calculatedHourList;
};

// Sorts the hour slot.
// Given the following
// [
//   {time: "10am", price: "5000", cleaningFee: "1500", listingId: '3fg43a-2342fa-ewf323},
//   {time: "9am", price: "5000", cleaningFee: "1500", listingId: '3fg43a-2342fa-ewf323}
// ]
// return
// [
//   {time: "9am", price: "5000", cleaningFee: "1500", listingId: '3fg43a-2342fa-ewf323},
//   {time: "10am", price: "5000", cleaningFee: "1500", listingId: '3fg43a-2342fa-ewf323}
// ]
const sortPriceAndHourSlot = list => {
    const sortedPriceAndHourList = [];
    // Traverse through the hourList and compare the element
    // to the list
    for (let i = 0; i < hourList.length; i++) {
        for (let y = 0; y < list.length; y++) {
            if (hourList[i] === list[y].time) {
                sortedPriceAndHourList.push(list[y]);
            }
        }
    }

    return sortedPriceAndHourList;
};

// Calculate the UI data structure.
// start: 2018-09-14T09:00:00-07:00
// end: 2018-09-15T10:00:00-07:00
// Return type listingUIData
// {
//     "9/14": [
//       {time: "9am", price: "5000", cleaningFee: 1500, listingId: '3fg43a-2342fa-ewf323},
//       {time: "10am", price: "5000", cleaningFee: 1500, listingId: '3fg43a-2342fa-ewf323},
//     ],
//     "9/15": [
//       {time: "9am", price: "5000", cleaningFee: 1500, listingId: '3fg43a-2342fa-ewf323},
//       {time: "10am", price: "5000", cleaningFee: 1500, listingId: '3fg43a-2342fa-ewf323},
//     ],
// }
const getListingUIData = (
    listingStartDate,
    listingEndDate,
    userSelectedStartDate,
    userSelectedEndDate,
    chairHourlyPrice,
    cleaningFee,
    listingId,
    numChairsSelected
) => {
    const formattedData = {};
    // Check if user selected start date is now or in the future.
    const today = moment().startOf('day');
    let dayIterator;
    if (userSelectedStartDate.isSameOrAfter(today)) {
        dayIterator = moment(userSelectedStartDate);
    } else {
        dayIterator = moment();
    }

    const hourSlot = getPriceAndHourSlot(
        moment(listingStartDate),
        moment(listingEndDate),
        chairHourlyPrice,
        cleaningFee,
        listingId,
        numChairsSelected
    );

    const beginningListingStartDate = moment(listingStartDate).startOf('day');

    const beginningListingEndDate = moment(listingEndDate).endOf('day');

    // dayIterator starts from the user selected start date and iterates
    // to the user selected end date. We check if the user selected dates
    // are between the listings start and end dates.
    while (dayIterator.isSameOrBefore(userSelectedEndDate)) {
        if (
            // [] means inclusion of the dates
            dayIterator.isBetween(
                beginningListingStartDate,
                beginningListingEndDate,
                null,
                '[]'
            )
        ) {
            const key = dayIterator.format('Y-MM-DD');
            // Check if the dayIterator is the same day as today.
            // If true, remove past hour time slots.
            if (
                dayIterator.isSame(today, 'year') &&
                dayIterator.isSame(today, 'month') &&
                dayIterator.isSame(today, 'day')
            ) {
                let startDate;

                // If current time is before the listing start date then we start
                // the hour slot according to the listing start hour.
                if (moment().isBefore(moment(listingStartDate), 'hour')) {
                    startDate = moment(listingStartDate);
                }
                // If current time is after the listing start hour then we start at the
                // next hour of the current time.
                else if (
                    moment().isSameOrBefore(moment(listingEndDate), 'hour')
                ) {
                    startDate = moment()
                        .startOf('hour')
                        .add(1, 'hours');
                }

                const shortenedHourSlot = getPriceAndHourSlot(
                    moment(startDate),
                    moment(listingEndDate),
                    chairHourlyPrice,
                    cleaningFee,
                    listingId,
                    numChairsSelected
                );
                formattedData[key] = shortenedHourSlot;
            } else {
                formattedData[key] = hourSlot;
            }
        }
        dayIterator.add(1, 'days');
    }

    return formattedData;
};

/**
 * This merges two objects of type listingUIData object
 * @first getListingUIData object
 * @second getListingUIData object
 * @return getListingUIData object
 */
const mergeListingUIData = (first, second) => {
    const keys = Object.keys(second);
    const combinedData = first;
    for (let i = 0; i < keys.length; i++) {
        if (!combinedData[keys[i]]) {
            combinedData[keys[i]] = [];
        }

        combinedData[keys[i]] = sortPriceAndHourSlot(
            _uniqWith(combinedData[keys[i]].concat(second[keys[i]]), _isEqual)
        );
    }

    return combinedData;
};

/**
 * This merges two objects of type listingUIData object
 * @first getListingUIData object
 * @second getListingUIData object
 * @return getListingUIData object
 */
const mergeReservationUIData = (first, second) => {
    const keys = Object.keys(second);
    const combinedData = first;
    for (let i = 0; i < keys.length; i++) {
        if (!combinedData[keys[i]]) {
            combinedData[keys[i]] = [];
        }

        combinedData[keys[i]] = sortPriceAndHourSlot(
            combinedData[keys[i]].concat(second[keys[i]])
        );
    }

    return combinedData;
};

/**
 * Iterate over the listings and returns an array of type listingUIData object
 */
const getHourSlotsFromListings = (listings, userSelectedDates) => {
    let accumulatedData = {};
    const [userSelectedStartDate, userSelectedEndDate] = userSelectedDates;
    for (let i = 0; i < listings.length; i++) {
        const listingStartDate = listings[i].localStartTime;
        const listingEndDate = listings[i].localEndTime;

        const { chairHourlyPrice, cleaningFee } = listings[i];

        const data = getListingUIData(
            listingStartDate,
            listingEndDate,
            userSelectedStartDate,
            userSelectedEndDate,
            chairHourlyPrice,
            cleaningFee,
            listings[i].id,
            listings[i].numChairsAvailable
        );
        accumulatedData = mergeListingUIData(accumulatedData, data);
    }

    return accumulatedData;
};

/**
 * Iterate over the reservations and returns an array of type listingUIData object
 */
const getHourSlotsFromReservation = (listings, userSelectedDates) => {
    let accumulatedData = {};
    const [userSelectedStartDate, userSelectedEndDate] = userSelectedDates;
    // Iterate over the listings, reservations and the availabilityTime inside the reservation object.
    for (let i = 0; i < listings.length; i++) {
        for (let y = 0; y < listings[i].reservations.length; y++) {
            const reservation = listings[i].reservations[y];

            if (
                reservation.localAvailableTimes &&
                reservation.localAvailableTimes.length > 0
            ) {
                for (
                    let z = 0;
                    z < reservation.localAvailableTimes.length;
                    z++
                ) {
                    const data = getListingUIData(
                        reservation.localAvailableTimes[z].startTime,
                        reservation.localAvailableTimes[z].endTime,
                        userSelectedStartDate,
                        userSelectedEndDate,
                        listings[i].chairHourlyPrice,
                        listings[i].cleaningFee,
                        listings[i].id,
                        reservation.numChairsSelected
                    );
                    accumulatedData = mergeReservationUIData(
                        accumulatedData,
                        data
                    );
                }
            }
        }
    }

    return accumulatedData;
};

/**
 * Iterate over the listings and reservations array and does a left join to remove
 * the dates and hourSlots from reservations to the listings
 * @return type listingUIData
 */
const removeUnavailableHourSlots = (listings, reservations) => {
    const keys = Object.keys(reservations);
    const modifiedListings = listings;
    for (let i = 0; i < keys.length; i++) {
        if (modifiedListings[keys[i]]) {
            _remove(modifiedListings[keys[i]], n => {
                const listingSlot = n;
                const reservationHourList = reservations[keys[i]];
                let removeFromlist = false;

                // Check if the reservation hour slot exists in the listing hour slot.
                // If so, remove the hour slot from the listing hour slot
                reservationHourList.forEach(timeSlot => {
                    if (timeSlot.time === n.time) {
                        listingSlot.numChairsSelected -=
                            timeSlot.numChairsSelected;
                    }

                    if (n.numChairsSelected <= 0) {
                        removeFromlist = true;
                        return true;
                    }
                    return false;
                });

                return removeFromlist;
            });
        }
    }

    return modifiedListings;
};

const getHourlyChairPriceRange = listings => {
    const priceList = listings.map(listing => listing.chairHourlyPrice);

    // Dividing by 100 because the data is in cents.
    const minPrice = _min(priceList) / 100;
    const maxPrice = _max(priceList) / 100;

    // If the min price and max price are the same then we just return
    // one price else return a price range.
    return minPrice === maxPrice ? { minPrice } : { minPrice, maxPrice };
};

class SelectReservation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            summaryDetailsData: [],
            totalPrice: 0,
        };

        this.reservationObject = {};
        this.selectedDatesAndHours = [];
        this.selectedEquipment = [];
        this.chairCount = '';
    }

    selectedHoursHandler = (
        date,
        selectedhourSlots,
        selectedPrice,
        selectedCleaningFee,
        selectedListingId
    ) => {
        const datesAndHours = [];
        let startHour = null;
        let endHour = null;
        let selectedHourIndex;
        let currentListingIdCounter;

        hourList.map(hour => {
            // this is for finding the earliest selected hour
            if (!startHour && _indexOf(selectedhourSlots, hour) !== -1) {
                startHour = hour;
                endHour = hour;

                selectedHourIndex = _indexOf(selectedhourSlots, hour);
                currentListingIdCounter = selectedListingId[selectedHourIndex];
            } else if (
                _indexOf(selectedhourSlots, hour) !== -1 &&
                currentListingIdCounter ===
                    selectedListingId[_indexOf(selectedhourSlots, hour)]
            ) {
                endHour = hour;
                currentListingIdCounter = selectedListingId[selectedHourIndex];
            }
            // This is when it's a continuous time slots but different listing ID
            else if (
                _indexOf(selectedhourSlots, hour) !== -1 &&
                currentListingIdCounter !==
                    selectedListingId[_indexOf(selectedhourSlots, hour)]
            ) {
                const startDate = moment(`${date} ${startHour}`, [
                    'Y-MM-DD h:mm A',
                ]).format();

                const endDate = moment(`${date} ${endHour}`, ['Y-MM-DD h:mm A'])
                    .add(1, 'hours')
                    .format();

                datesAndHours.push({
                    startDate,
                    endDate,
                    cleaningFee: selectedCleaningFee[selectedHourIndex],
                    price: selectedPrice[selectedHourIndex],
                    listingId: selectedListingId[selectedHourIndex],
                });

                startHour = hour;
                endHour = hour;
                selectedHourIndex = _indexOf(selectedhourSlots, hour);
                currentListingIdCounter = selectedListingId[selectedHourIndex];
            } else {
                if (startHour && endHour) {
                    const startDate = moment(`${date} ${startHour}`, [
                        'Y-MM-DD h:mm A',
                    ]).format();

                    const endDate = moment(`${date} ${endHour}`, [
                        'Y-MM-DD h:mm A',
                    ])
                        .add(1, 'hours')
                        .format();

                    datesAndHours.push({
                        startDate,
                        endDate,
                        cleaningFee: selectedCleaningFee[selectedHourIndex],
                        price: selectedPrice[selectedHourIndex],
                        listingId: selectedListingId[selectedHourIndex],
                    });
                }

                // reset the counter
                startHour = null;
                endHour = null;
            }

            return null;
        });

        const formattedDate = moment(date).format('Y-MM-DD');
        this.selectedDatesAndHours = {
            ...this.selectedDatesAndHours,
            ...{
                [formattedDate]: datesAndHours,
            },
        };

        this.updateSummaryDetails(this.selectedDatesAndHours);
    };

    // This one gets called when user clicks pay.
    createReservationObject = async clientCache => {
        // clear the object everytime. This handles the case when user reselected time slot.
        this.reservationObject = {};

        // get all the listings
        const selectedListingsId = [];
        //
        Object.keys(this.selectedDatesAndHours).forEach(key => {
            this.selectedDatesAndHours[key].forEach(value => {
                selectedListingsId.push(value.listingId);
            });
        });

        const uniqListings = _uniq(selectedListingsId);

        // Iterate over the dateso
        Object.keys(this.selectedDatesAndHours).forEach(key => {
            uniqListings.map(listing => {
                const filteredSelectedDatesAndHours = _filter(
                    this.selectedDatesAndHours[key],
                    o => o.listingId === listing
                );

                if (!this.reservationObject[listing]) {
                    this.reservationObject[listing] = [];
                }

                this.reservationObject[listing] = [
                    ...this.reservationObject[listing],
                    ...filteredSelectedDatesAndHours,
                ];

                return null;
            });
        });

        const listingIds = Object.keys(this.reservationObject);

        const numOfChairsAvailList = [];

        // Iterate over the listing ids and make an api call and check for num of chairs available.
        // We need to get the lowest number of chair a user can reserve.
        await Promise.all(
            listingIds.map(async listingId => {
                const timeIntervals = this.reservationObject[listingId].map(
                    timeSlot => ({
                        startTime: timeSlot.startDate,
                        endTime: timeSlot.endDate,
                    })
                );
                const variables = {
                    input: {
                        timeIntervals,
                        listingId,
                    },
                };
                const result = await clientCache.query({
                    query: getNumRemainingChairsQuery,
                    variables,
                });

                numOfChairsAvailList.push(
                    _get(result, 'data.getNumRemainingChairs')
                );
            })
        );

        const numOfChairsAvailable = _min(numOfChairsAvailList);

        if (numOfChairsAvailable < this.chairCount) {
            message.warning(
                `Sorry there are only ${numOfChairsAvailable} chairs available.`
            );

            return null;
        }

        // Dont' go to the next page if there are no selection.
        if (_isEmpty(this.reservationObject)) {
            message.warning('Please select a time slot');

            return null;
        }

        this.props.onMakeReservation({
            reservation: this.reservationObject,
            selectedEquipment: this.selectedEquipment,
            chairCount: this.chairCount,
        });

        this.props.updateSummarySectionData({
            totalPrice: this.state.totalPrice,
            summaryList: [...this.state.summaryDetailsData],
        });

        return null;
    };

    makeReservationHandler = clientCache => {
        this.createReservationObject(clientCache);
    };

    updateSummaryDetails = selectedDatesAndHours => {
        const summaryList = [];
        const equipmentPrice = _reduce(
            this.selectedEquipment,
            (sum, n) => sum + n.price,
            0
        );

        let totalPrice = 0;
        let totalChairCost = 0;
        Object.keys(selectedDatesAndHours).forEach(key => {
            // Iterate over the dates.
            selectedDatesAndHours[key].forEach(value => {
                const hours = moment(value.endDate).diff(
                    moment(value.startDate),
                    'hours'
                ); // calculate the diff in hours.
                const { price } = value;
                const { cleaningFee } = value;

                // Total = (price * chair cost * numChair) + cleaning fee + equipment fee
                const chairCost = Math.round(price * hours * this.chairCount);
                const timeSlotTotalPrice =
                    chairCost + cleaningFee + equipmentPrice;

                totalPrice += timeSlotTotalPrice;
                totalChairCost += chairCost;

                const obj = {
                    headerText: `${moment(value.startDate).format(
                        'M/DD'
                    )} (${moment(value.startDate).format('ha')} - ${moment(
                        value.endDate
                    ).format('ha')}) `,
                    headerCost: `${timeSlotTotalPrice}`,
                    summaryDetails: [
                        {
                            description: `Total chair price ($${(
                                price / 100
                            ).toFixed(2)} x ${
                                this.chairCount
                            } chair x ${hours}hr)`,
                            cost: `${chairCost}`,
                        },
                        {
                            description: 'Cleaning fee',
                            cost: `${cleaningFee}`,
                        },
                    ],
                };

                this.selectedEquipment.forEach(e => {
                    obj.summaryDetails.push({
                        description: e.name,
                        cost: e.price,
                    });
                });

                summaryList.push(obj);
            });
        });

        const bookingFee = Math.round(totalChairCost * BOOKING_FEE_PERCENTAGE);
        totalPrice += bookingFee;
        summaryList.push({
            headerText: 'Booking Fee',
            headerCost: bookingFee,
            summaryDetails: [
                {
                    description: `15% of the aggregate chair price (${renderPrice(
                        totalChairCost
                    )})`,
                    cost: bookingFee,
                },
            ],
        });

        this.setState(
            {
                summaryDetailsData: summaryList,
                totalPrice,
            },
            () => {
                // Update the parent container.
                this.props.updateSummaryDetailsData(
                    this.state.summaryDetailsData
                );
            }
        );
    };

    onChairCounterHandler = chairCount => {
        this.chairCount = chairCount;
        this.updateSummaryDetails(this.selectedDatesAndHours);
    };

    onSelectEquipment = selectedEquipment => {
        this.selectedEquipment = selectedEquipment;

        // Updates the summary details data
        this.updateSummaryDetails(this.selectedDatesAndHours);
    };

    render() {
        const { officeId, triggerQuery, selectedDates } = this.props;
        const listingVariables = {
            partitionKey: OFFICE_ID,
            partitionValue: officeId,
            options: {
                sortKey: END_TIME,
                rangeStart: moment()
                    .startOf('hour')
                    .startOf('days')
                    .utc()
                    .format(),
                filters: [
                    {
                        filterKey: `${STATUS}`,
                        filterValue: `${ACTIVE}`,
                    },
                ],
            },
        };

        return (
            <ApolloConsumer>
                {client => (
                    <Query
                        query={getOfficeEquipments}
                        variables={{ id: officeId }}
                        skip={!triggerQuery}
                    >
                        {({
                            loading: loadingOfficeEquipment,
                            data: officeEquipmentData,
                        }) => (
                            <Query
                                query={getListingQuery}
                                variables={{ input: listingVariables }}
                                skip={!triggerQuery}
                            >
                                {({
                                    loading: loadingListingQuery,
                                    error,
                                    data,
                                }) => {
                                    if (
                                        (loadingOfficeEquipment ||
                                            loadingListingQuery) &&
                                        triggerQuery
                                    ) {
                                        return <Loading />;
                                    }

                                    if (!triggerQuery) {
                                        return null;
                                    }

                                    if (error) {
                                        return <RedirectErrorPage />;
                                    }

                                    const officeEquipment = _get(
                                        officeEquipmentData,
                                        'getOffice.equipment'
                                    );

                                    const hourSlotsFromListing = getHourSlotsFromListings(
                                        data.queryListings,
                                        selectedDates
                                    );

                                    const hourSlotsFromReservation = getHourSlotsFromReservation(
                                        data.queryListings,
                                        selectedDates
                                    );

                                    const mergedHourSlotsData = removeUnavailableHourSlots(
                                        hourSlotsFromListing,
                                        hourSlotsFromReservation
                                    );

                                    const [
                                        selectedStartDate,
                                        selectedEndDate,
                                    ] = selectedDates;

                                    // retrieve all listings within the selected date range
                                    const currentListings = data.queryListings.filter(
                                        listing => {
                                            const listingEnd = moment(
                                                listing.localEndTime
                                            );
                                            const listingStart = moment(
                                                listing.localStartTime
                                            );

                                            // the argument [] means isBetween includes
                                            // items at the boundary
                                            // if selected start date is between the
                                            // listing start date or the listing start date
                                            // is between the selected interval, they intersect,
                                            // so we include that listing
                                            return (
                                                listingStart.isBetween(
                                                    selectedStartDate,
                                                    selectedEndDate,
                                                    null,
                                                    []
                                                ) ||
                                                selectedStartDate.isBetween(
                                                    listingStart,
                                                    listingEnd,
                                                    null,
                                                    []
                                                )
                                            );
                                        }
                                    );

                                    return (
                                        <SelectReservationView
                                            hourSlotsData={mergedHourSlotsData}
                                            priceRange={getHourlyChairPriceRange(
                                                currentListings
                                            )}
                                            selectedHoursHandler={
                                                this.selectedHoursHandler
                                            }
                                            makeReservationHandler={() => {
                                                this.makeReservationHandler(
                                                    client
                                                );
                                            }}
                                            summaryDetailsData={
                                                this.state.summaryDetailsData
                                            }
                                            totalPrice={this.state.totalPrice}
                                            onChairCounterHandler={
                                                this.onChairCounterHandler
                                            }
                                            officeEquipment={officeEquipment}
                                            onSelectEquipment={
                                                this.onSelectEquipment
                                            }
                                        />
                                    );
                                }}
                            </Query>
                        )}
                    </Query>
                )}
            </ApolloConsumer>
        );
    }
}

SelectReservation.defaultProps = {
    triggerQuery: false,
    onChangeCurrentDisplay: () => {},
};

SelectReservation.propTypes = {
    officeId: PropTypes.string.isRequired,
    selectedDates: PropTypes.string.isRequired,
    triggerQuery: PropTypes.bool.isRequired,
    onChangeCurrentDisplay: PropTypes.func.isRequired,
    onMakeReservation: PropTypes.func.isRequired,
    updateEquipmentDetailsData: PropTypes.func.isRequired,
    updateSummaryDetailsData: PropTypes.func.isRequired,
    updateSummarySectionData: PropTypes.func.isRequired,
};

export default SelectReservation;
