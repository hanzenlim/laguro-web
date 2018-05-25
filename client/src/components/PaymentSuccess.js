import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import queryString from 'query-string';
import styled from 'styled-components';

import { Typography, Card, Button, Divider, Link, Grid } from './common';
import { Padding } from './common/Spacing';

import * as actions from '../actions';

const Wrapper = styled.div`
    background-color: #F8F9FA;
    min-height: 100vh;
    min-width: 100vw;
    width: 100%
    height: 100%;
`;

const Container = styled.div`
    max-width: 535px;
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

class PaymentSuccess extends Component {
    constructor(props) {
        super(props);

        const { location } = this.props;
        this.urlParams = queryString.parse(location.search);
    }

    componentDidMount() {
        const { reservationId, appointmentId } = this.urlParams;

        if (appointmentId) {
            this.props.getAppointment(appointmentId);
        } else if (reservationId) {
            this.props.getReservation(reservationId);
        }
    }

    renderTime = (startTime, endTime) => {
        return `${moment(startTime).format('h:mm a')} - ${moment(
            endTime
        ).format('h:mm a')}`;
    };

    renderDate = startDate => {
        return moment(startDate).format('ll');
    };

    render() {
        const { reservation } = this.props;

        if (!reservation || !reservation.office) {
            return <div>Loading...</div>;
        }

        return (
            <Wrapper>
                <Container>
                    <Padding top={60} bottom={20}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography size="t1" weight="bold">
                                    Thank you! Your reservation is confirmed.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Padding>

                    <Card>
                        <Padding horizontal={20} vertical={20}>
                            <Grid container alignItems="flex-start">
                                <ListingImage
                                    src={
                                        reservation.office.imageUrls[0] ||
                                        'http://via.placeholder.com/250x250'
                                    }
                                    alt="office"
                                />

                                <Padding right={15} />

                                <ListingInfo>
                                    <Grid container direction="column">
                                        <Grid container>
                                            <Typography size="t3" weight="bold">
                                                {reservation.office.name}
                                            </Typography>
                                        </Grid>

                                        <Padding bottom={11} />

                                        <Grid container wrap="nowrap">
                                            <i className="material-icons tiny">
                                                location_on
                                            </i>

                                            <Padding right={4} />

                                            <Typography size="t6">
                                                {`Location: ${
                                                    reservation.office.location
                                                }`}
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
                                                {`Time: ${this.renderTime(
                                                    reservation.startTime,
                                                    reservation.endTime
                                                )}`}
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
                                                {`Date: ${this.renderDate(
                                                    reservation.startTime
                                                )}`}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </ListingInfo>
                            </Grid>
                        </Padding>
                    </Card>

                    <Padding bottom={24} />

                    <Grid container justify="center">
                        <Link to={'/'}>
                            <Button variant="raised" color="primary">
                                Home
                            </Button>
                        </Link>
                    </Grid>
                </Container>
            </Wrapper>
        );
    }
}

function mapStateToProps(state) {
    return {
        reservation: state.reservations.selected
    };
}

export default connect(mapStateToProps, actions)(PaymentSuccess);
