import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import moment from 'moment';
import _uniqWith from 'lodash/uniqWith';
import _filter from 'lodash/filter';
import _uniq from 'lodash/uniq';
import _isEqual from 'lodash/isEqual';
import _remove from 'lodash/remove';
import _min from 'lodash/min';
import _max from 'lodash/max';
import _findIndex from 'lodash/findIndex';
import _indexOf from 'lodash/indexOf';
import _reduce from 'lodash/reduce';
import get from 'lodash/get';
import { Loading } from '../../../../components';
import SelectReservationView from './view';
import { getListingQuery, getOfficeEquipments } from './queries';
import {
    OFFICE_ID,
    END_TIME,
    STATUS,
    ACTIVE,
    BOOKING_FEE_PERCENTAGE,
} from '../../../../util/strings';

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
    removePastHourTimeSlot = false
) => {
    // Filter out past hour time slot
    let startTime;
    if (removePastHourTimeSlot) {
        startTime = moment()
            .startOf('hour')
            .add(1, 'hours');
    } else {
        startTime = moment(start);
    }

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
    listingId
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
        listingId
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
                const shortenedHourSlot = getPriceAndHourSlot(
                    moment(listingStartDate),
                    moment(listingEndDate),
                    chairHourlyPrice,
                    cleaningFee,
                    listingId,
                    true
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
 * Iterate over the listings and returns an array of type listingUIData object
 */
const getHourSlotsFromListings = (listings, userSelectedDates) => {
    let accumulatedData = {};
    const [userSelectedStartDate, userSelectedEndDate] = userSelectedDates;
    for (let i = 0; i < listings.length; i++) {
        const listingStartDate = `${listings[i].availability.startDay}T${
            listings[i].availability.startTime
        }`;
        const listingEndDate = `${listings[i].availability.endDay}T${
            listings[i].availability.endTime
        }`;

        const { chairHourlyPrice, cleaningFee } = listings[i];

        const data = getListingUIData(
            listingStartDate,
            listingEndDate,
            userSelectedStartDate,
            userSelectedEndDate,
            chairHourlyPrice,
            cleaningFee,
            listings[i].id
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
            const reservations = listings[i].reservations[y];

            if (
                reservations.availableTimes &&
                reservations.availableTimes.length > 0
            ) {
                for (let z = 0; z < reservations.availableTimes.length; z++) {
                    const data = getListingUIData(
                        reservations.availableTimes[z].startTime,
                        reservations.availableTimes[z].endTime,
                        userSelectedStartDate,
                        userSelectedEndDate,
                        listings[i].chairHourlyPrice,
                        listings[i].cleaningFee,
                        listings[i].id
                    );
                    accumulatedData = mergeListingUIData(accumulatedData, data);
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
                // Check if the reservation hour slot exists in the listing hour slot.
                // If so, remove the hour slot from the listing hour slot
                const reservationHourList = reservations[keys[i]];

                const index = _findIndex(
                    reservationHourList,
                    obj => obj.time === n.time
                );

                return index !== -1;
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
            equipmentsSummaryDetailsData: [],
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
    createReservationObject = () => {
        // clear the object everytime. This handles the case when user reselected time slot.
        this.reservationObject = {};

        // get all the listings
        const selectedListingsId = [];
        //
        Object.keys(this.selectedDatesAndHours).forEach(key => {
            this.selectedDatesAndHours[key].map(value => {
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

        this.props.onMakeReservation({
            reservation: this.reservationObject,
            selectedEquipment: this.selectedEquipment,
            chairCount: this.chairCount,
        });

        this.props.updateSummarySectionData({
            totalPrice: this.state.totalPrice,
            summaryList: [
                ...this.state.summaryDetailsData,
                ...this.state.equipmentsSummaryDetailsData,
            ],
        });
    };

    makeReservationHandler = e => {
        e.preventDefault();

        this.createReservationObject();
    };

    updateSummaryDetails = selectedDatesAndHours => {
        const summaryList = [];
        const totalEquipmentPrice = _reduce(
            this.selectedEquipment,
            (sum, n) => sum + n.price,
            0
        );

        let totalPrice = totalEquipmentPrice;
        Object.keys(selectedDatesAndHours).map(key => {
            // Iterate over the dates.
            selectedDatesAndHours[key].map(value => {
                const hours = moment(value.endDate).diff(
                    moment(value.startDate),
                    'hours'
                ); // calculate the diff in hours.
                const { price } = value;
                const { cleaningFee } = value;

                // Total = (price * chair cost * numChair) + booking fee + cleaning fee
                const totalChairCost = Math.round(
                    price * hours * this.chairCount
                );
                const bookingFeeCost = totalChairCost * BOOKING_FEE_PERCENTAGE;
                const timeSlotTotalPrice =
                    totalChairCost + bookingFeeCost + cleaningFee;

                totalPrice += timeSlotTotalPrice;

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
                            cost: `${totalChairCost}`,
                        },
                        {
                            description:
                                'Booking Fee (20% of the total hourly chair price)',
                            cost: `${bookingFeeCost}`,
                        },
                        {
                            description: 'Cleaning fee',
                            cost: `${cleaningFee}`,
                        },
                    ],
                };

                summaryList.push(obj);

                return null;
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

            return null;
        });
    };

    onChairCounterHandler = chairCount => {
        this.chairCount = chairCount;
        this.updateSummaryDetails(this.selectedDatesAndHours);
    };

    onSelectEquipment = selectedEquipment => {
        this.selectedEquipment = selectedEquipment;

        const equipmentsSummaryDetailsData = [];
        selectedEquipment.map(value => {
            equipmentsSummaryDetailsData.push({
                headerText: value.name,
                headerCost: value.price,
            });

            return null;
        });
        this.setState({
            equipmentsSummaryDetailsData: [...equipmentsSummaryDetailsData],
        });

        // Updates the summary details data
        this.updateSummaryDetails(this.selectedDatesAndHours);

        // This is to update the parent state. This data is used in the payment page.
        this.props.updateEquipmentDetailsData(equipmentsSummaryDetailsData);
    };

    render() {
        const { officeId, triggerQuery, selectedDates } = this.props;
        window.selectedDates = selectedDates;
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
                        {({ loading: loadingListingQuery, error, data }) => {
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
                                return <div>Error</div>;
                            }

                            const officeEquipment = get(
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

                            window.chair = getHourlyChairPriceRange(
                                data.queryListings
                            );

                            return (
                                <SelectReservationView
                                    hourSlotsData={mergedHourSlotsData}
                                    priceRange={getHourlyChairPriceRange(
                                        data.queryListings
                                    )}
                                    selectedHoursHandler={
                                        this.selectedHoursHandler
                                    }
                                    makeReservationHandler={
                                        this.makeReservationHandler
                                    }
                                    summaryDetailsData={
                                        this.state.summaryDetailsData
                                    }
                                    totalPrice={this.state.totalPrice}
                                    equipmentsSummaryDetailsData={
                                        this.state.equipmentsSummaryDetailsData
                                    }
                                    onChairCounterHandler={
                                        this.onChairCounterHandler
                                    }
                                    officeEquipment={officeEquipment}
                                    onSelectEquipment={this.onSelectEquipment}
                                />
                            );
                        }}
                    </Query>
                )}
            </Query>
        );
    }
}

SelectReservation.defaultProps = {
    triggerQuery: false,
    onChangeCurrentDisplay: () => {},
};

SelectReservation.PropTypes = {
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
