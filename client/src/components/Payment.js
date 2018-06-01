import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import queryString from 'query-string';
import StripeCheckout from 'react-stripe-checkout';
import styled from 'styled-components';

import { Typography, Card, Button, Divider, Link, Grid } from './common';
import { Padding } from './common/Spacing';
import * as actions from '../actions';
import { PAYMENT_OPTIONS, APPOINTMENT } from '../util/strings';
import { stripeKey } from '../config/keys';

const Wrapper = styled.div`
    background-color: #F8F9FA;
    min-height: 100vh;
    min-width: 100vw;
    width: 100%
    height: 100%;
`;

const Container = styled.div`
    max-width: 825px;
    padding: 0 10px;
    margin: 0 auto;
`;

const ListingImage = styled.img`
    height: 104px;
    max-width: 112px;
    width: 100%;
    background-color: #c8c7c7;
    border-radius: 2px;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24);
    object-fit: cover;
`;

const ListingInfo = styled.div`
    flex: 1;
`;

const PaymentOption = styled.div`
    height: 51px;
    width: 100%;
    border: 1px solid #c8c7c7;
    border-radius: 2px;
    background-color: #ffffff;
`;

class Payment extends Component {
    constructor(props) {
        super(props);

        const { location } = this.props;
        this.urlParams = queryString.parse(location.search);

        this.state = {
            isButtonLoading: false
        };
    }

    componentDidMount() {
        if (this.urlParams.type === APPOINTMENT) {
            this.props.getReservation(this.urlParams.reservationId);
        } else {
            this.props.getListing(this.urlParams.listingId);
        }

        this.props.fetchUser(PAYMENT_OPTIONS);
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
        await this.props.fetchUser(PAYMENT_OPTIONS);
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
        const [startTime, endTime] = this.urlParams.time
            .substring(1, this.urlParams.time.length - 1)
            .replace(/ /g, '+')
            .split(',');

        const reservationPayload = {
            numChairsSelected: this.urlParams.numChairs,
            staffSelected: JSON.parse(this.urlParams.staffSelected),
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
        const [startTime, endTime] = this.urlParams.time
            .substring(1, this.urlParams.time.length - 1)
            .replace(/ /g, '+')
            .split(',');

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

    renderPrice = totalPaid => {
        if (!totalPaid) return '$0';

        return `$${totalPaid.substring(
            0,
            totalPaid.length - 2
        )}.${totalPaid.substring(totalPaid.length - 2)}`;
    };

    renderTime = time => {
        const [startTime, endTime] = time
            .substring(1, time.length - 1)
            .replace(/ /g, '+')
            .split(',');

        const timeFormat = 'hh:mma';

        const formattedOpeningTime = moment(startTime).format(timeFormat);
        const formattedClosingTime = moment(endTime).format(timeFormat);

        return `${formattedOpeningTime} - ${formattedClosingTime}`;
    };

    renderDate = time => {
        const [opening] = time
            .substring(1, time.length - 1)
            .replace(/ /g, '+')
            .split(',');

        return moment(opening).format('ll');
    };

    renderPaymentOptions = () => {
        if (!this.props.auth.paymentOptions) return null;

        return this.props.auth.paymentOptions.map(paymentOption => (
            <PaymentOption key={paymentOption.id}>
                <Padding vertical={15} left={10} right={30}>
                    <Grid container justify="space-between">
                        <Typography size="t4">VISA</Typography>
                        <Typography size="t4" color="silver">
                            ••••••••{paymentOption.last4}
                        </Typography>
                    </Grid>
                </Padding>
            </PaymentOption>
        ));
    };

    renderListingCard = () => {
        const office =
            this.urlParams.type === APPOINTMENT
                ? this.props.reservation.office
                : this.props.listing.office;
        const { time, totalPaid } = this.urlParams;

        return (
            <Card>
                <Padding horizontal={20} vertical={20}>
                    <Grid container alignItems="flex-start">
                        <ListingImage
                            src={
                                office.imageUrls[0] ||
                                'http://via.placeholder.com/250x250'
                            }
                            alt="office"
                        />

                        <Padding right={15} />

                        <ListingInfo>
                            <Grid container direction="column">
                                <Grid container justify="space-between">
                                    <Typography size="t2" weight="bold">
                                        {office.name}
                                    </Typography>

                                    <Typography
                                        size="t3"
                                        weight="bold"
                                        color="carribean-green"
                                    >
                                        {this.renderPrice(totalPaid)}
                                    </Typography>
                                </Grid>

                                <Padding bottom={11} />

                                <Grid container wrap="nowrap">
                                    <i className="material-icons tiny">
                                        location_on
                                    </i>

                                    <Padding right={4} />

                                    <Typography size="t3">
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

                                    <Typography size="t3">
                                        {`Time: ${this.renderTime(time)}`}
                                    </Typography>
                                </Grid>

                                <Padding vertical={8}>
                                    <Divider />
                                </Padding>

                                <Grid container wrap="nowrap">
                                    <i className="material-icons tiny">
                                        date_range
                                    </i>

                                    <Padding right={4} />

                                    <Typography size="t3">
                                        {`Date: ${this.renderDate(time)}`}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </ListingInfo>
                    </Grid>
                </Padding>
            </Card>
        );
    };

    renderSummaryCard = () => {
        const { type, totalPaid } = this.urlParams;

        return (
            <Card>
                <Padding vertical={20} horizontal={20}>
                    <Grid container direction="column">
                        <Padding bottom={14}>
                            <Grid container>
                                <Typography size="t2" weight="bold" capitalize>
                                    {`${type} Summary`}
                                </Typography>
                            </Grid>
                        </Padding>

                        <Divider />

                        <Padding vertical={4}>
                            <Grid container justify="space-between">
                                <Typography size="t3" color="abbey" capitalize>
                                    {`${type}`}
                                </Typography>
                                <Typography size="t3" color="abbey">
                                    {this.renderPrice(totalPaid)}
                                </Typography>
                            </Grid>
                        </Padding>

                        <Divider />

                        <Padding vertical={4}>
                            <Grid container justify="space-between">
                                <Typography size="t3" color="abbey">
                                    Discount Applied
                                </Typography>
                                <Typography size="t3" color="abbey">
                                    None
                                </Typography>
                            </Grid>
                        </Padding>

                        <Divider />

                        <Padding vertical={4}>
                            <Grid container justify="space-between">
                                <Typography
                                    size="t3"
                                    color="abbey"
                                    weight="bold"
                                >
                                    Total
                                </Typography>
                                <Typography
                                    size="t3"
                                    color="abbey"
                                    weight="bold"
                                >
                                    {this.renderPrice(totalPaid)}
                                </Typography>
                            </Grid>
                        </Padding>

                        <Divider />
                    </Grid>
                </Padding>
            </Card>
        );
    };

    renderPaymentCard = () => {
        const { auth } = this.props;
        const hasPaymentOptions =
            auth.paymentOptions && auth.paymentOptions.length;

        return (
            <Card>
                <Padding vertical={20} horizontal={20}>
                    <Grid container direction="column">
                        <Padding bottom={14}>
                            <Grid container>
                                <Typography size="t2" weight="bold">
                                    Payment Information
                                </Typography>
                            </Grid>
                        </Padding>

                        {this.renderPaymentOptions()}

                        <Padding bottom={12} />

                        <StripeCheckout
                            token={this.onSuccess.bind(this)}
                            stripeKey={stripeKey}
                            currency="USD"
                            panelLabel="Add card"
                        >
                            <Link>
                                <Typography size="t4" color="abbey" underline>
                                    Add payment method
                                </Typography>
                            </Link>
                        </StripeCheckout>

                        <Padding bottom={14} />

                        <Button
                            onClick={this.handleCheckout}
                            variant="raised"
                            color="secondary"
                            disabled={
                                !hasPaymentOptions || this.state.isButtonLoading
                            }
                            fullWidth
                        >
                            <Typography size="t2" weight="medium">
                                Checkout
                            </Typography>
                        </Button>
                    </Grid>
                </Padding>
            </Card>
        );
    };

    render() {
        const listing =
            this.urlParams.type === APPOINTMENT
                ? this.props.reservation.listing
                : this.props.listing;
        const { type } = this.urlParams;

        if (!listing) {
            return <div>Loading...</div>;
        }

        return (
            <Wrapper>
                <Container>
                    <Padding top={60} bottom={20}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography size="t1" weight="bold">
                                    Review and place your {`${type}`}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Padding>

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
            </Wrapper>
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
