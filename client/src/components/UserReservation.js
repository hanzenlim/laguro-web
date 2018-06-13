import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ReactStars from 'react-stars';
import styled from 'styled-components';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Typography, Grid, Card, Divider } from './common';
import { Padding, Margin } from './common/Spacing';
import { formatListingTime } from '../util/timeUtil';

const ListingImage = styled.img`
    height: 140px;
    max-width: 140px;
    width: 100%;
    border-radius: 2px;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24);
    object-fit: cover;
`;

class UserOffice extends Component {
    confirmCancelReservation(reservation) {
        if (
            // eslint-disable-next-line
            confirm(
                `Delete reservation for ${moment(reservation.startTime).format(
                    'MMM D, h:mm a'
                )}?`
            )
        ) {
            this.props.cancelReservation(reservation);
        }
    }

    calculateAverageRating(reviews) {
        this.avg_rating =
            reviews
                .map(review => review.rating)
                .reduce((acc, rating) => acc + rating, 0) / reviews.length;
        this.rating_count = reviews.length;
    }

    generateListItems(set) {
        if (set.length === 0) {
            return (
                <ListItem>
                    <ListItemText secondary="None Selected" />
                </ListItem>
            );
        }
        return set.map((item, index) => (
            <ListItem key={index}>
                <ListItemText
                    primary={item.role || item.name}
                    secondary={item.count ? `(${item.count} selected)` : null}
                />
            </ListItem>
        ));
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
                        <Grid container wrap="nowrap">
                            <Grid item container direction="column" sm={4}>
                                <ListingImage
                                    src={
                                        office.imageUrls[0] ||
                                        'http://via.placeholder.com/250x250'
                                    }
                                    alt="office"
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
                                        onClick={this.confirmCancelReservation.bind(
                                            this,
                                            reservation
                                        )}
                                    >
                                        Cancel Reservation
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid item container direction="column" sm={8}>
                                <Grid
                                    container
                                    wrap="nowrap"
                                    justify="space-between"
                                    alignItems="center"
                                >
                                    <Link to={`/office/${office.id}`}>
                                        <Typography
                                            fontSize={4}
                                            underline
                                            color="#039be5"
                                        >
                                            {office.name}
                                        </Typography>
                                    </Link>
                                    <Grid item xs={4}>
                                        <Grid
                                            container
                                            wrap="nowrap"
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
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Padding vertical={8} />

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
                                        {office.location}
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
                                        {formatListingTime(startTime, endTime)}
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
                                    <Grid container spacing={16}>
                                        <Grid item xs={12} md={6}>
                                            <Typography variant="title">
                                                Selected Staff
                                            </Typography>
                                            <div>
                                                <List>
                                                    {this.generateListItems(
                                                        reservation.staffSelected
                                                    )}
                                                </List>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography variant="title">
                                                Selected Equipment
                                            </Typography>
                                            <div>
                                                <List>
                                                    {this.generateListItems([])}
                                                </List>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Padding>
                </Card>
            </Margin>
        );
    }
}

export default UserOffice;
