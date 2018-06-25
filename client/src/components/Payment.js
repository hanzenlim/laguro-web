import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import StripeCheckout from 'react-stripe-checkout';
import styled from 'styled-components';

import {
    Typography,
    Card,
    Button,
    Divider,
    Link,
    Grid,
    Flex,
    Box,
    Container
} from './common';
import { Padding } from './common/Spacing';
import * as actions from '../actions';
import { PAYMENT_OPTIONS, APPOINTMENT, DENTIST } from '../util/strings';
import { stripeKey } from '../config/keys';
import { formatListingTime } from '../util/timeUtil';
import { renderPrice } from '../util/paymentUtil';

const StyledWrapper = styled.div`
    background-color: #F8F9FA;
    min-height: 100vh;
    min-width: 100vw;
    width: 100%
    height: 100%;
`;

const StyledListingImage = styled.img`
    height: 104px;
    max-width: 112px;
    width: 100%;
    background-color: #c8c7c7;
    border-radius: 2px;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24);
    object-fit: cover;
`;

const StyledListingInfo = styled.div`
    flex: 1;
`;

const StyledPaymentOption = styled.div`
    height: 51px;
    width: 100%;
    border: 1px solid #c8c7c7;
    border-radius: 2px;
    background-color: ${props => props.theme.colors.white};
`;

class Payment extends Component {
    constructor(props) {
        super(props);

        const { location } = this.props;
        this.urlParams = queryString.parse(location.search);

        this.state = {
            isButtonLoading: false,
            isFetching: true
        };
    }

    componentDidMount() {
        this.loadData();
    }

    async loadData() {
        this.setState({ isFetching: true });
        if (this.urlParams.type === APPOINTMENT) {
            await this.props.getReservation(this.urlParams.reservationId);
        } else {
            await this.props.getListing(this.urlParams.listingId);
        }

        await this.props.fetchUser(DENTIST, PAYMENT_OPTIONS);
        this.setState({ isFetching: false });
    }

    async onSuccess(response) {
        const { auth } = this.props;

        if (auth.paymentOptions.length) {
            await this.props.removePaymentOption(
                auth.id,
                auth.paymentOptions[0].id
            );
        }

        await this.props.addPaymentOption(auth.id, response.id);
        await this.props.fetchUser(DENTIST, PAYMENT_OPTIONS);
    }

    handleCheckout = () => {
        this.setState({ isButtonLoading: true });

        if (this.urlParams.type === APPOINTMENT) {
            this.handleCreateAppointment();
        } else {
            this.handleCreateReservation();
        }
    };

    handleCreateReservation = () => {
        const { startTime, endTime } = this.urlParams;

        const reservationPayload = {
            numChairsSelected: this.urlParams.numChairs,
            equipmentSelected: JSON.parse(this.urlParams.equipmentSelected),
            listingId: this.urlParams.listingId,
            reservedBy: this.urlParams.reservedBy,
            startTime,
            endTime,
            paymentOptionId: this.props.auth.paymentOptions[0].id,
            totalPaid: this.urlParams.totalPaid
        };

        this.props.createReservation(reservationPayload);
    };

    handleCreateAppointment = () => {
        const { startTime, endTime } = this.urlParams;

        const appointmentPayload = {
            reservationId: this.urlParams.reservationId,
            patientId: this.urlParams.patientId,
            procedure: JSON.parse(this.urlParams.procedure),
            startTime,
            endTime,
            paymentOptionId: this.props.auth.paymentOptions[0].id
        };

        this.props.createAppointment(appointmentPayload);
    };

    renderTime = (startTime, endTime) => {
        return formatListingTime(startTime, endTime);
    };

    renderPaymentOptions = () => {
        if (!this.props.auth.paymentOptions) return null;

        return this.props.auth.paymentOptions.map(paymentOption => (
            <StyledPaymentOption key={paymentOption.id}>
                <Padding vertical={15} left={10} right={30}>
                    <Grid container justify="space-between">
                        <Typography fontSize={2}>VISA</Typography>
                        <Typography fontSize={2} color="silver">
                            ••••••••{paymentOption.last4}
                        </Typography>
                    </Grid>
                </Padding>
            </StyledPaymentOption>
        ));
    };

    renderListingCard = () => {
        const office =
            this.urlParams.type === APPOINTMENT
                ? this.props.reservation.office
                : this.props.listing.office;
        const { totalPaid } = this.urlParams;
        const parsed = queryString.parse(window.location.search);

        return (
            <Card>
                <Padding horizontal={20} vertical={20}>
                    <Grid container alignItems="flex-start">
                        <StyledListingImage
                            src={
                                office.imageUrls[0] ||
                                'http://via.placeholder.com/250x250'
                            }
                            alt="office"
                        />

                        <Padding right={15} />

                        <StyledListingInfo>
                            <Grid container direction="column">
                                <Grid container justify="space-between">
                                    <Typography fontSize={4} fontWeight="bold">
                                        {office.name}
                                    </Typography>

                                    <Typography
                                        fontSize={3}
                                        fontWeight="bold"
                                        color="black"
                                    >
                                        {renderPrice(totalPaid)}
                                    </Typography>
                                </Grid>

                                <Padding bottom={11} />

                                <Grid container wrap="nowrap">
                                    <i className="material-icons tiny">
                                        location_on
                                    </i>

                                    <Padding right={4} />

                                    <Typography fontSize={3}>
                                        {`Location: ${office.location}`}
                                    </Typography>
                                </Grid>

                                <Padding vertical={8}>
                                    <Divider />
                                </Padding>

                                <Grid container wrap="nowrap">
                                    <i className="material-icons tiny">
                                        access_time
                                    </i>

                                    <Padding right={4} />

                                    <Typography fontSize={3}>
                                        {`Time: ${this.renderTime(
                                            parsed.startTime,
                                            parsed.endTime
                                        )}`}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </StyledListingInfo>
                    </Grid>
                </Padding>
            </Card>
        );
    };

    renderSummaryCard = () => {
        const {
            type,
            totalPaid,
            equipmentFee,
            bookingFee,
            cleaningFee,
            reservationFee
        } = this.urlParams;

        return (
            <Card>
                <Flex p={3} flexDirection="column">
                    <Box pb={3}>
                        <Typography fontSize={4} fontWeight="bold" capitalize>
                            {`${type} Summary`}
                        </Typography>
                    </Box>

                    <Divider />

                    <Box py={2}>
                        <Flex justify="space-between">
                            <Typography fontSize={3} color="abbey" capitalize>
                                {`${type} Cost`}
                            </Typography>
                            <Typography fontSize={3} color="abbey">
                                {renderPrice(reservationFee)}
                            </Typography>
                        </Flex>
                    </Box>

                    {equipmentFee &&
                        equipmentFee > 0 && (
                            <Box py={2}>
                                <Flex justify="space-between">
                                    <Typography
                                        fontSize={3}
                                        color="abbey"
                                        capitalize
                                    >
                                        Equipment Fee
                                    </Typography>
                                    <Typography fontSize={3} color="abbey">
                                        {renderPrice(equipmentFee)}
                                    </Typography>
                                </Flex>
                            </Box>
                        )}

                    {cleaningFee &&
                        cleaningFee > 0 && (
                            <Box py={2}>
                                <Flex justify="space-between">
                                    <Typography
                                        fontSize={3}
                                        color="abbey"
                                        capitalize
                                    >
                                        Cleaning Fee
                                    </Typography>
                                    <Typography fontSize={3} color="abbey">
                                        {renderPrice(cleaningFee)}
                                    </Typography>
                                </Flex>
                            </Box>
                        )}

                    {bookingFee &&
                        bookingFee > 0 && (
                            <Box py={2}>
                                <Flex justify="space-between">
                                    <Typography
                                        fontSize={3}
                                        color="abbey"
                                        capitalize
                                    >
                                        Booking Fee
                                    </Typography>
                                    <Typography fontSize={3} color="abbey">
                                        {renderPrice(bookingFee)}
                                    </Typography>
                                </Flex>
                            </Box>
                        )}

                    <Divider />

                    <Box py={2}>
                        <Flex justify="space-between">
                            <Typography
                                fontSize={3}
                                color="black"
                                fontWeight="bold"
                            >
                                Total
                            </Typography>
                            <Typography
                                fontSize={3}
                                color="black"
                                fontWeight="bold"
                            >
                                {renderPrice(totalPaid)}
                            </Typography>
                        </Flex>
                    </Box>
                </Flex>
            </Card>
        );
    };

    renderPaymentCard = () => {
        const { auth } = this.props;
        const hasPaymentOptions =
            auth.paymentOptions && auth.paymentOptions.length;

        return (
            <Card>
                <Flex p={3} flexDirection="column">
                    <Box pb={3}>
                        <Typography fontSize={4} fontWeight="bold">
                            Payment Information
                        </Typography>
                    </Box>

                    <Box pb={3}>{this.renderPaymentOptions()}</Box>

                    <Box pb={3}>
                        <StripeCheckout
                            token={this.onSuccess.bind(this)}
                            stripeKey={stripeKey}
                            currency="USD"
                            panelLabel="Add card"
                        >
                            <Link>
                                <Typography
                                    fontSize={2}
                                    color="abbey"
                                    underline
                                >
                                    Add payment method
                                </Typography>
                            </Link>
                        </StripeCheckout>
                    </Box>

                    <Button
                        fullWidth
                        onClick={this.handleCheckout}
                        variant="raised"
                        color="secondary"
                        disabled={
                            !hasPaymentOptions || this.state.isButtonLoading
                        }
                    >
                        <Typography fontSize={4} fontWeight="medium">
                            Checkout
                        </Typography>
                    </Button>
                </Flex>
            </Card>
        );
    };

    render() {
        const { type } = this.urlParams;
        if (this.state.isFetching) return <div className="stretch_height" />;

        return (
            <StyledWrapper>
                <Container>
                    <Flex>
                        <Padding top={60} bottom={20}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography fontSize={5} fontWeight="bold">
                                        Review and place your {`${type}`}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Padding>
                    </Flex>

                    <Grid container spacing={16}>
                        <Grid item xs={12} lg={8}>
                            {this.renderListingCard()}
                        </Grid>

                        <Grid item xs={12} lg={4}>
                            <Grid container spacing={16}>
                                <Grid item xs={12} sm={6} lg={12}>
                                    {this.renderSummaryCard()}
                                </Grid>
                                <Grid item xs={12} sm={6} lg={12}>
                                    {this.renderPaymentCard()}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </StyledWrapper>
        );
    }
}

function mapStateToProps(state) {
    return {
        listing: state.listings.selected,
        reservation: state.reservations.selected,
        auth: state.auth
    };
}

export default connect(mapStateToProps, actions)(Payment);
