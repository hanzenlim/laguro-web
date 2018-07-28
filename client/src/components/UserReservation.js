import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ReactStars from 'react-stars';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';

import { generateListItems } from './forms/sharedComponents';
import { Typography, Flex, Card, Divider, Box } from './common';
import { Padding, Margin } from './common/Spacing';
import { formatListingTime } from '../util/timeUtil';

const ListingImage = styled.img`
    height: 120px;
    max-width: 120px;
    width: 100%;
    border-radius: 2px;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24);
    object-fit: cover;
`;

const StyledImageContainer = styled(Box)`
    width: 30%;

    @media screen and (max-width: 500px){
        display: none;
    }
`;

const StyledDetails = styled(Box)`
    width: 70%;

    @media screen and (max-width: 500px){
        width: 100%;
    }
`;

class UserReservation extends Component {
    calculateReservationRefund = reservation => {
        const ms = moment().diff(moment(reservation.dateCreated));
        const timeElapsedInHours = moment.duration(ms).asHours();
        if (timeElapsedInHours < 24) {
            return 1;
        }
        if (timeElapsedInHours < 48) {
            return 0.5;
        }

        return 0;
    };

    confirmCancelReservation(reservation) {
        const reservationRefund = this.calculateReservationRefund(reservation);
        if (
            // eslint-disable-next-line
            confirm(
                `Are you sure you want to delete reservation for ${moment(
                    reservation.startTime
                ).format('MMM D, h:mm a')}? ${reservationRefund *
                    100}% of your total amount will be refunded, a total amount of $${
                    ((reservation.totalPaid * reservationRefund) / 100).toFixed(2)
                }`
            )
        ) {
            this.props.cancelUserReservation(reservation);
        }
    }

    calculateAverageRating(reviews) {
        this.avg_rating =
            reviews
                .map(review => review.rating)
                .reduce((acc, rating) => acc + rating, 0) / reviews.length;
        this.rating_count = reviews.length;
    }

    renderAppointmentList(reservation) {
        if (!reservation.appointments || reservation.appointments.length === 0)
            return (
                <Typography fontSize={2} color="darkGray">
                    No appointments have been scheduled yet
                </Typography>
            );
        const reservationAppointments = reservation.appointments.map(appt => {
            const patientFirst = appt.patient && appt.patient.firstName;
            const patientLast = appt.patient && appt.patient.lastName;
            const procedure = appt.procedure && appt.procedure.name;
            const startTime = moment(appt.startTime).format('h:mm');
            const endTime = moment(appt.endTime).format('h:mm a');

            return `${patientFirst} ${patientLast} - ${procedure} - ${startTime} - ${endTime}`;
        });

        return generateListItems(reservationAppointments);
    }

    render() {
        const { reservation } = this.props;
        const { office } = reservation;
        const { startTime, endTime } = reservation;

        const { reviews } = office;

        if (reviews && reviews.length) {
            this.calculateAverageRating(reviews);
        } else {
            this.avg_rating = 0;
            this.rating_count = 0;
        }

        return (
            <Margin vertical={20}>
                <Card key={reservation.id}>
                    <Padding horizontal={20} vertical={20}>
                        <Flex flexDirection="row">
                            <StyledImageContainer>
                                <ListingImage
                                    src={
                                        office.imageUrls[0] ||
                                        'http://via.placeholder.com/250x250'
                                    }
                                    alt="office"
                                />
                            </StyledImageContainer>

                            <StyledDetails>
                                <Flex
                                    flexDirection="row"
                                    flexWrap="wrap"
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    <Link
                                        to={`/office/${
                                            office.id
                                        }?referrer=profile`}
                                    >
                                        <Typography
                                            fontSize={4}
                                            underline
                                            color="link_blue"
                                        >
                                            {office.name}
                                        </Typography>
                                    </Link>

                                    <Flex
                                        flexDirection="row"
                                        alignItems="center"
                                    >
                                        <ReactStars
                                            count={5}
                                            value={this.avg_rating}
                                            size={12}
                                            edit={false}
                                        />
                                        <Padding horizontal={4}>
                                            <small>{`(${
                                                this.rating_count
                                            })`}</small>
                                        </Padding>
                                    </Flex>
                                </Flex>

                                <Padding vertical={4} />

                                <Flex flexDirection="row">
                                    <i className="material-icons tiny">
                                        location_on
                                    </i>

                                    <Padding right={4} />

                                    <Typography fontSize={2}>
                                        {office.location}
                                    </Typography>
                                </Flex>

                                <Padding vertical={6}>
                                    <Divider />
                                </Padding>

                                <Flex flexDirection="row">
                                    <i className="material-icons tiny">
                                        date_range
                                    </i>

                                    <Padding right={4} />

                                    <Typography fontSize={2}>
                                        {formatListingTime(startTime, endTime)}
                                    </Typography>
                                </Flex>

                                <Padding vertical={6}>
                                    <Divider />
                                </Padding>

                                <Flex flexDirection="row">
                                    <i className="material-icons tiny">
                                        delete_forever
                                    </i>

                                    <Padding right={4} />

                                    <Typography
                                        fontSize={2}
                                        cursor="pointer"
                                        onClick={this.confirmCancelReservation.bind(
                                            this,
                                            reservation
                                        )}
                                    >
                                        Cancel Reservation
                                    </Typography>
                                </Flex>
                            </StyledDetails>
                        </Flex>

                        <Padding vertical={6} />

                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={
                                    <i className="material-icons">
                                        keyboard_arrow_down
                                    </i>
                                }
                            >
                                <Typography variant="title">
                                    Selected Equipment
                                </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Flex
                                    width={1}
                                    flexDirection="row"
                                    justifyContent="space-between"
                                >
                                    <Box width={2 / 3}>
                                        <List id="equipment_list">
                                            {generateListItems(
                                                reservation.equipmentSelected
                                            )}
                                        </List>
                                    </Box>
                                </Flex>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>

                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={
                                    <i className="material-icons">
                                        keyboard_arrow_down
                                    </i>
                                }
                            >
                                <Typography variant="title">
                                    Appointments for this reservation
                                </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <List id="appointment_list">
                                    {this.renderAppointmentList(reservation)}
                                </List>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Padding>
                </Card>
            </Margin>
        );
    }
}

export default UserReservation;
