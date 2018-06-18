import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import styled from 'styled-components';

import { Typography, Card, Grid, Divider } from './common';
import { Padding, Margin } from './common/Spacing';

const ListingImage = styled.img`
    height: 140px;
    max-width: 140px;
    width: 100%;
    border-radius: 2px;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24);
    object-fit: cover;
`;

class AppointmentDetails extends Component {
    render() {
        const { appointment } = this.props;
        const { office } = appointment.reservation;
        const { dentist } = appointment;

        const formattedTime =
            moment(appointment.startTime).format('M/D, h:mm - ') +
            moment(appointment.endTime).format('h:mm a');

        return (
            <Margin vertical={20}>
                <Card key={appointment.id}>
                    <Padding horizontal={20} vertical={20}>
                        <Grid container wrap="nowrap">
                            <Grid item container direction="column" sm={4}>
                                <ListingImage
                                    src={
                                        dentist.user.imageUrl ||
                                        'http://via.placeholder.com/250x250'
                                    }
                                    alt="dentist"
                                />
                                <Padding vertical={6} />

                                <Grid
                                    container
                                    wrap="nowrap"
                                    alignItems="center"
                                >
                                    <i
                                        className="material-icons tiny"
                                        style={{ color: 'silver' }}
                                    >
                                        delete_forever
                                    </i>

                                    <Padding right={4} />

                                    <Typography
                                        fontSize={1}
                                        color="silver"
                                        cursor="pointer"
                                        underline
                                        onClick={this.props.cancelAppointment}
                                    >
                                        Cancel Appointment
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid item container direction="column" sm={8}>
                                <Link to={`/dentist/${dentist.id}`}>
                                    <Typography
                                        fontSize={4}
                                        fontWeight="bold"
                                        color="link_blue"
                                        underline
                                    >
                                        Dr. {dentist.user.name}
                                    </Typography>
                                </Link>

                                <Padding vertical={8} />

                                <Grid
                                    container
                                    wrap="nowrap"
                                    alignItems="center"
                                >
                                    <i className="material-icons tiny">
                                        business
                                    </i>

                                    <Padding right={4} />

                                    <Link to={`/dentist/${dentist.id}`}>
                                        <Typography fontSize={2} color="black">
                                            {office.name}
                                        </Typography>
                                    </Link>
                                </Grid>

                                <Padding vertical={6}>
                                    <Divider />
                                </Padding>

                                <Grid
                                    container
                                    wrap="nowrap"
                                    alignItems="center"
                                >
                                    <i className="material-icons tiny">
                                        location_on
                                    </i>

                                    <Padding right={4} />

                                    <Typography fontSize={2}>
                                        {appointment.location}
                                    </Typography>
                                </Grid>

                                <Padding vertical={6}>
                                    <Divider />
                                </Padding>

                                <Grid
                                    container
                                    wrap="nowrap"
                                    alignItems="center"
                                >
                                    <i className="material-icons tiny">
                                        date_range
                                    </i>

                                    <Padding right={4} />

                                    <Typography fontSize={2}>
                                        {formattedTime}
                                    </Typography>
                                </Grid>

                                <Padding vertical={6}>
                                    <Divider />
                                </Padding>

                                <Grid
                                    container
                                    wrap="nowrap"
                                    alignItems="center"
                                >
                                    <i className="material-icons tiny">
                                        add_circle_outline
                                    </i>

                                    <Padding right={4} />

                                    <Typography fontSize={2}>
                                        {appointment.procedure.name}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Padding>
                </Card>
            </Margin>
        );
    }
}

export default AppointmentDetails;
