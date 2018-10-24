import React, { Component, Fragment } from 'react';
import { message } from 'antd';
import { compose, graphql, withApollo } from 'react-apollo';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import _reduce from 'lodash/reduce';
import _get from 'lodash/get';
import _debounce from 'lodash/debounce';
import { Box } from '../../../components';
import ReserveOfficeView from './view';
import {
    getUserQuery,
    createReservationMutation,
    checkUserDentistVerifiedQuery,
} from './queries';
import {
    SELECT_APPOINTMENT_VIEW,
    CONFIRMATION_VIEW,
    BOOKING_FEE_PERCENTAGE,
    PAYMENT_VIEW,
} from '../../../util/strings';
import DentistVerificationModal from '../Modals/DentistVerificationModal';
import { stripTimezone } from '../../../util/timeUtil';

class ReserveOffice extends Component {
    constructor(props) {
        super(props);

        this.state = {
            triggerFindReservations: false,
            selectedDates: '',
            currentDisplay: SELECT_APPOINTMENT_VIEW,
            summaryDetailsData: '',
            equipmentSummaryDetailsData: '',
            totalPrice: '',
            summaryList: [],
            paymentConfirmationH2Text: '',
            paymentConfirmationH3Text: '',
            showVerificationModal: false,
            onPayBtnText: 'Pay',
            isSubmitting: false,
        };

        this.reservationObject = '';
    }

    findAvailabilityHandler = selectedDates => {
        if (_get(this, 'props.data.activeUser') === null) {
            if (_get(this, 'props.client.writeData')) {
                this.props.client.writeData({
                    data: { visibleModal: 'login' },
                });
                return null;
            }
        }

        this.setState({
            triggerFindReservations: true,
            selectedDates,
        });

        return null;
    };

    onChangeCurrentDisplay = display => {
        this.setState({
            currentDisplay: display,
        });
    };

    onPay = _debounce(
        async cardId => {
            // Iterate over the reservation list to make api call.
            // Reservation object shape
            // {
            //     "reservation":{
            //        "704a2a40-bad1-11e8-a1d6-df4539fbc4cc":[
            //           {
            //              "startDate":"2018-09-24T13:00:00-07:00",
            //              "endDate":"2018-09-24T14:00:00-07:00",
            //              "cleaningFee":1500,
            //              "price":40000,
            //              "listingId":"704a2a40-bad1-11e8-a1d6-df4539fbc4cc"
            //           },
            //           {
            //              "startDate":"2018-09-26T12:00:00-07:00",
            //              "endDate":"2018-09-26T13:00:00-07:00",
            //              "cleaningFee":1500,
            //              "price":40000,
            //              "listingId":"704a2a40-bad1-11e8-a1d6-df4539fbc4cc"
            //           }
            //        ]
            //     },
            //     "selectedEquipment":[
            //        {
            //           "name":"Digital X-Ray",
            //           "price":2000
            //        }
            //     ],
            //     "chairCount":1
            //  }

            this.setState({
                isSubmitting: true,
            });

            const reservations = this.reservationObject.reservation;

            // Gets the total equipment cost.
            const totalEquipmentPrice = _reduce(
                this.reservationObject.selectedEquipment,
                (sum, n) => sum + n.price,
                0
            );

            const errors = [];
            let earliestReservationStartTime = '';
            let earliestReservationEndTime = '';
            await Promise.all(
                Object.keys(reservations).map(async listingId => {
                    let totalPrice = 0;
                    const numChairsSelected = this.reservationObject.chairCount;
                    const equipmentSelected = this.reservationObject.selectedEquipment.map(
                        value => value.name
                    );
                    const reservedBy = _get(
                        this,
                        'props.data.activeUser.dentistId'
                    );

                    // calculate all the time slots.
                    const availableTimes = reservations[listingId].map(
                        value => {
                            // Calculate the earliest and latest end time.
                            // This is used to show the date range on the confirmation page.
                            if (!earliestReservationStartTime) {
                                earliestReservationStartTime = moment(
                                    value.startDate
                                );
                            } else if (
                                earliestReservationStartTime.isBefore(
                                    value.startDate
                                )
                            ) {
                                earliestReservationStartTime = moment(
                                    value.startDate
                                );
                            }

                            if (!earliestReservationEndTime) {
                                earliestReservationEndTime = moment(
                                    value.endDate
                                );
                            } else if (
                                earliestReservationEndTime.isBefore(
                                    value.endDate
                                )
                            ) {
                                earliestReservationEndTime = moment(
                                    value.endDate
                                );
                            }

                            const hours = moment(value.endDate).diff(
                                moment(value.startDate),
                                'hours'
                            );

                            const totalChairCost = Math.round(
                                value.price * hours * numChairsSelected
                            );
                            const bookingFeeCost =
                                totalChairCost * BOOKING_FEE_PERCENTAGE;
                            const timeSlotTotalPrice =
                                totalChairCost +
                                bookingFeeCost +
                                value.cleaningFee +
                                totalEquipmentPrice;

                            totalPrice += timeSlotTotalPrice;

                            return {
                                startTime: stripTimezone(value.startDate),
                                endTime: stripTimezone(value.endDate),
                            };
                        }
                    );

                    let result;

                    try {
                        result = await this.props.mutate({
                            variables: {
                                input: {
                                    numChairsSelected,
                                    equipmentSelected,
                                    listingId,
                                    reservedBy,
                                    paymentOptionId: cardId,
                                    totalPaid: Math.round(totalPrice),
                                    availableTimes,
                                },
                            },
                        });

                        return result;
                    } catch (error) {
                        errors.push(error.graphQLErrors[0].message);
                        return Promise.resolve(error.graphQLErrors[0].message);
                    }
                })
            );

            if (errors.length > 0) {
                const msg = errors.join(':');
                message.error(msg);
                this.setState({ isSubmitting: false });
            } else {
                this.setState({
                    currentDisplay: CONFIRMATION_VIEW,
                    paymentConfirmationH2Text: `${earliestReservationStartTime.format(
                        'MMM D, YYYY'
                    )} - ${earliestReservationEndTime.format('MMM D, YYYY')}`,
                    paymentConfirmationH3Text: `${earliestReservationStartTime.format(
                        'ha'
                    )} - ${earliestReservationEndTime.format('ha')}`,
                    isSubmitting: false,
                });
            }
        },
        5000,
        { leading: true, maxWait: 5000 }
    );

    onPayBackButton = () => {
        this.setState({
            currentDisplay: SELECT_APPOINTMENT_VIEW,
        });
    };

    onMakeReservation = async data => {
        this.reservationObject = data;

        const {
            client,
            data: { activeUser },
        } = this.props;

        const result = await client.query({
            query: checkUserDentistVerifiedQuery,
            variables: {
                id: activeUser.id,
            },
            fetchPolicy: 'network-only',
        });

        window.scrollTo({
            top: 500,
            left: 0,
            behavior: 'smooth',
        });
        // If user is verified go to payment page.
        if (
            _get(result, 'data.getUser.dentist.isVerified') ||
            _get(result, 'data.getUser.dentist.sentVerificationDocuments')
        ) {
            return this.setState({
                currentDisplay: PAYMENT_VIEW,
            });
        }

        return this.setState({ showVerificationModal: true });
    };

    updateSummaryDetailsData = data => {
        this.setState({
            summaryDetailsData: data,
        });
    };

    updateEquipmentDetailsData = data => {
        this.setState({
            equipmentSummaryDetailsData: data,
        });
    };

    updateTotalPrice = totalPrice => {
        this.setState({
            totalPrice,
        });
    };

    updateSummarySectionData = summarySectionData => {
        const { summaryList } = summarySectionData;
        const { totalPrice } = summarySectionData;
        this.setState({
            summaryList,
            totalPrice,
        });
    };

    handleDentistVerificationModalClose = () => {
        this.setState({
            showVerificationModal: false,
        });
    };

    handleDentistVerificationComplete = ({ verified }) => {
        if (verified) {
            return this.setState({
                currentDisplay: PAYMENT_VIEW,
                showVerificationModal: false,
            });
        }

        this.setState({
            showVerificationModal: false,
        });

        return null;
    };

    updateSubmittingState = isSubmitting => {
        this.setState({ isSubmitting });
    };

    render() {
        const { officeId, startLoading } = this.props;
        const { showVerificationModal } = this.state;

        return (
            <Fragment>
                <DentistVerificationModal
                    onCancel={this.handleDentistVerificationModalClose}
                    onComplete={this.handleDentistVerificationComplete}
                    visible={showVerificationModal}
                />
                {startLoading && (
                    <Box>
                        <ReserveOfficeView
                            findAvailabilityHandler={
                                this.findAvailabilityHandler
                            }
                            triggerFindReservations={
                                this.state.triggerFindReservations
                            }
                            selectedDates={this.state.selectedDates}
                            officeId={officeId}
                            currentDisplay={this.state.currentDisplay}
                            onChangeCurrentDisplay={this.onChangeCurrentDisplay}
                            onPay={this.onPay}
                            onPayBackButton={this.onPayBackButton}
                            onMakeReservation={this.onMakeReservation}
                            summaryDetailsData={this.state.summaryDetailsData}
                            equipmentSummaryDetailsData={
                                this.state.equipmentSummaryDetailsData
                            }
                            totalPrice={this.state.totalPrice}
                            summaryList={this.state.summaryList}
                            updateSummaryDetailsData={
                                this.updateSummaryDetailsData
                            }
                            updateEquipmentDetailsData={
                                this.updateEquipmentDetailsData
                            }
                            updateTotalPrice={this.updateTotalPrice}
                            updateSummarySectionData={
                                this.updateSummarySectionData
                            }
                            paymentConfirmationH3Text={
                                this.state.paymentConfirmationH3Text
                            }
                            paymentConfirmationH2Text={
                                this.state.paymentConfirmationH2Text
                            }
                            onPayBtnText={this.state.onPayBtnText}
                            isSubmitting={this.state.isSubmitting}
                            updateSubmittingState={this.updateSubmittingState}
                        />
                    </Box>
                )}
            </Fragment>
        );
    }
}

ReserveOffice.propTypes = {
    officeId: PropTypes.string.isRequired,
    startLoading: PropTypes.bool.isRequired,
};

export default compose(
    withApollo,
    graphql(createReservationMutation),
    graphql(getUserQuery)
)(ReserveOffice);
