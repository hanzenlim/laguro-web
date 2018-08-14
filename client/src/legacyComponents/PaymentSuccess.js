import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import moment from 'moment';
import queryString from 'query-string';
import styled from 'styled-components';
import { Typography, Box, Card, Button, Divider, Link, Grid } from './common';
import { Padding } from './common/Spacing';
import { formatListingTime } from '../util/timeUtil';
import * as actions from '../actions';
import officeImagePlaceholder from './images/office-placeholder-thumbnail.png';

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
        this.state = { type: undefined };
        this.urlParams = queryString.parse(location.search);
    }

    componentDidMount() {
        this.fetchSuccessDetails();
    }

    async fetchSuccessDetails() {
        const { reservationId, appointmentId, procedureIds } = this.urlParams;
        if (appointmentId) {
            await this.props.getAppointment(appointmentId);
            this.setState({ type: 'appointment' });
        } else if (reservationId) {
            await this.props.getReservation(reservationId);
            this.setState({ type: 'reservation' });
        } else {
            await this.props.getProcedures(JSON.parse(procedureIds));
        }
    }

    renderTime = () => {
        const { reservation, appointment, procedures } = this.props;
        if (!isEmpty(procedures)) {
            return '';
        }

        const { type } = this.state;

        let { startTime, endTime } =
            type === 'appointment' ? appointment : reservation;

        return formatListingTime(startTime, endTime);
    };

    renderDate = startDate => {
        return moment(startDate).format('ll');
    };

    renderProcedure = (pc, index, length) => {
        return (
            <ListingInfo key={index}>
                <Grid container direction="column">
                    <Grid container>
                        <Typography fontSize={4} fontWeight="bold">
                            {pc.definition}
                        </Typography>
                    </Grid>

                    <Padding bottom={11} />

                    <Grid container wrap="nowrap">
                        <Typography fontSize={3}>
                            {`Procedure: ${pc.name}`}
                        </Typography>
                    </Grid>

                    <Grid container wrap="nowrap">
                        <i className="material-icons tiny">date_range</i>

                        <Padding right={4} />

                        <Typography fontSize={3}>
                            {`Date prescribed: ${this.renderDate(
                                pc.dateCreated
                            )}`}
                        </Typography>
                    </Grid>

                    {index + 1 !== length && (
                        <Padding vertical={8}>
                            <Divider />
                        </Padding>
                    )}
                </Grid>
            </ListingInfo>
        );
    };

    renderProceduresCard = () => {
        const { procedures } = this.props;
        return (
            <Wrapper>
                <Container>
                    <Box pb={[3, 5]} />
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography fontSize={5} fontWeight="bold">
                                Thank you! Your procedures are all set.
                            </Typography>
                        </Grid>
                    </Grid>
                    <Box pb={3} />
                    <Card>
                        <Padding horizontal={20} vertical={20}>
                            {procedures.map((pc, index) =>
                                this.renderProcedure(
                                    pc,
                                    index,
                                    procedures.length
                                )
                            )}
                        </Padding>
                    </Card>
                    <Padding bottom={24} />
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        spacing={16}
                    >
                        <Grid item>
                            <Link to={'/'}>
                                <Button variant="raised" color="primary">
                                    Home
                                </Button>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to={'/profile'}>
                                <Button variant="raised" color="secondary">
                                    Profile
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Container>
            </Wrapper>
        );
    };

    renderApptResCard = () => {
        const { type } = this.state;
        let { appointment, reservation } = this.props;
        let office = {};

        // if the store is not fully loaded, wait
        if (
            appointment &&
            reservation &&
            !Object.keys(appointment).length &&
            !Object.keys(reservation).length
        )
            return <div />;

        // if this is the appointment PaymentSuccess page, then the reservation object must be loaded from the appointment object
        if (type === 'appointment') {
            office = appointment.reservation.office;
        } else if (type === 'reservation') {
            office = reservation.office;
        }

        return (
            <Wrapper>
                <Container>
                    <Padding top={60} bottom={20}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography fontSize={5} fontWeight="bold">
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
                                        office &&
                                        office.imageUrls &&
                                        office.imageUrls.length
                                            ? office.imageUrls[0]
                                            : officeImagePlaceholder
                                    }
                                    alt="office"
                                />

                                <Padding right={15} />

                                <ListingInfo>
                                    <Grid container direction="column">
                                        <Grid container>
                                            <Typography
                                                fontSize={4}
                                                fontWeight="bold"
                                            >
                                                {office.name}
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
                                                {`Time: ${this.renderTime()}`}
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

                                            <Typography fontSize={3}>
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

                    <Grid
                        container
                        direction="row"
                        justify="center"
                        spacing={16}
                    >
                        <Grid item>
                            <Link to={'/'}>
                                <Button variant="raised" color="primary">
                                    Home
                                </Button>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to={'/profile'}>
                                <Button variant="raised" color="secondary">
                                    Profile
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Container>
            </Wrapper>
        );
    };

    render() {
        const { procedures } = this.props;
        if (isEmpty(procedures)) {
            return this.renderApptResCard();
        } else {
            return this.renderProceduresCard();
        }
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        reservation: state.reservations.selected,
        appointment: state.appointments.selected,
        procedures: state.patientProcedures.selectedProcedures
    };
}

export default connect(mapStateToProps, actions)(PaymentSuccess);
