import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import queryString from 'query-string';
import StripeCheckout from 'react-stripe-checkout';
import styled from 'styled-components';

import { Typography, Card, Button, Divider, Link, Grid } from './common';
import { Padding } from './common/Spacing';
import * as actions from '../actions';
import { PAYMENT_OPTIONS } from '../util/strings';

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
    componentDidMount() {
        const params = queryString.parse(this.props.location.search);
        const { listingId } = params;

        this.props.getListing(listingId);
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
        await this.handleCreateReservation();
    }

    handleCheckout = () => {
        this.handleCreateReservation();
    };

    handleCreateReservation = () => {
        const params = queryString.parse(this.props.location.search);
        const { time } = params;

        const [opening, closing] = time
            .substring(1, time.length - 1)
            .replace(/ /g, '+')
            .split(',');

        const timeFormat = 'YYYY-MM-DDTHH:mm:ss.SSSSZ';

        const formattedOpeningTime = moment(opening).format(timeFormat);
        const formattedClosingTime = moment(closing).format(timeFormat);

        const payload = {
            numChairsSelected: params.numChairs,
            staffSelected: JSON.parse(params.staffSelected),
            equipmentSelected: JSON.parse(params.equipmentSelected),
            listingId: params.listingId,
            reservedBy: params.reservedBy,
            startTime: formattedOpeningTime,
            endTime: formattedClosingTime,
            paymentOptionId: this.props.auth.paymentOptions[0].id,
            totalPaid: params.totalPaid,
        };

        this.props.createReservation(payload);
    };

    handleCreateAppointment = () => {
        // console.warn('handleCreateAppointment');
    };

    renderPrice = totalPaid => {
        if (!totalPaid) return '$0';

        return `$${totalPaid.substring(
            0,
            totalPaid.length - 2
        )}.${totalPaid.substring(totalPaid.length - 2)}`;
    };

    renderTime = time => {
        const [opening, closing] = time
            .substring(1, time.length - 1)
            .replace(/ /g, '+')
            .split(',');

        const timeFormat = 'hh:mma';

        const formattedOpeningTime = moment(opening).format(timeFormat);
        const formattedClosingTime = moment(closing).format(timeFormat);

        return `${formattedOpeningTime} - ${formattedClosingTime}`;
    };

    renderDate = date => {
        return moment(date).format('ll');
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
        const { location, listing } = this.props;
        const params = queryString.parse(location.search);
        const { date, time, totalPaid } = params;

        return (
            <Card>
                <Padding horizontal={20} vertical={20}>
                    <Grid container alignItems="flex-start">
                        <ListingImage
                            src={
                                listing.office.imageUrls[0] ||
                                'http://via.placeholder.com/250x250'
                            }
                            alt="office"
                        />

                        <Padding right={15} />

                        <ListingInfo>
                            <Grid container direction="column">
                                <Grid container justify="space-between">
                                    <Typography size="t3" weight="bold">
                                        {listing.office.name}
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

                                    <Typography size="t6">
                                        {`Location: ${listing.office.location}`}
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

                                    <Typography size="t6">
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

                                    <Typography size="t6">
                                        {`Date: ${this.renderDate(date)}`}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </ListingInfo>
                    </Grid>

                    <Padding bottom={22} />

                    <Grid container>
                        <Typography size="t5" weight="medium">
                            Note: Lorem Ipsum is simply dummy text of the
                            printing and typesetting industry.
                        </Typography>
                    </Grid>
                </Padding>
            </Card>
        );
    };

    renderSummaryCard = () => {
        const { location } = this.props;
        const params = queryString.parse(location.search);
        const { totalPaid } = params;

        return (
            <Card>
                <Padding vertical={20} horizontal={20}>
                    <Grid container direction="column">
                        <Padding bottom={14}>
                            <Grid container>
                                <Typography size="t3" weight="bold">
                                    Reservation Summary
                                </Typography>
                            </Grid>
                        </Padding>

                        <Divider />

                        <Padding vertical={4}>
                            <Grid container justify="space-between">
                                <Typography size="t3" color="abbey">
                                    Reservation
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
        const { location, auth } = this.props;
        const params = queryString.parse(location.search);
        const { totalPaid } = params;
        const hasPaymentOptions =
            auth.paymentOptions && auth.paymentOptions.length;

        return (
            <Card>
                <Padding vertical={20} horizontal={20}>
                    <Grid container direction="column">
                        <Padding bottom={14}>
                            <Grid container>
                                <Typography size="t3" weight="bold">
                                    Payment Information
                                </Typography>
                            </Grid>
                        </Padding>

                        {this.renderPaymentOptions()}

                        <Padding bottom={12} />

                        <StripeCheckout
                            token={this.onSuccess.bind(this)}
                            stripeKey="pk_test_z6zaOFhsmnBHG6WCN8LH6wTR"
                            currency="USD"
                            amount={Number(totalPaid)}
                        >
                            {hasPaymentOptions ? (
                                <Link>
                                    <Typography
                                        size="t5"
                                        color="abbey"
                                        underline
                                    >
                                        Add new payment method
                                    </Typography>
                                </Link>
                            ) : (
                                <Button
                                    variant="raised"
                                    color="primary"
                                    fullWidth
                                >
                                    <Typography size="t2" weight="medium">
                                        Checkout
                                    </Typography>
                                </Button>
                            )}
                        </StripeCheckout>

                        <Padding bottom={14} />

                        {hasPaymentOptions ? (
                            <Button
                                onClick={this.handleCheckout}
                                variant="raised"
                                color="primary"
                                fullWidth
                            >
                                <Typography size="t2" weight="medium">
                                    Checkout
                                </Typography>
                            </Button>
                        ) : null}
                    </Grid>
                </Padding>
            </Card>
        );
    };

    render() {
        const { listing } = this.props;

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
                                    Review and place your reservation
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
        auth: state.auth,
    };
}

export default connect(mapStateToProps, actions)(Payment);
