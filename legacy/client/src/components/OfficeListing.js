import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import moment from 'moment';

import { generateListItems } from './forms/sharedComponents';
import { Chip, Typography, Grid, Button, Divider } from './common';
import { Padding, Margin } from './common/Spacing';
import { formatListingTime, calculateTimeslots } from '../util/timeUtil';
import { renderPrice } from '../util/paymentUtil';
import { ACTIVE } from '../util/strings';

class OfficeListing extends Component {
    confirmDeleteListing(listing) {
        if (
            // eslint-disable-next-line
            confirm(
                `Delete listing for ${moment(listing.startTime).format(
                    'MMM D, h:mm a'
                )}?`
            )
        ) {
            this.props.cancelUserListing(listing);
        }
    }

    renderReservationList(listing) {
        if (
            listing &&
            listing.reservations &&
            listing.reservations.length > 0
        ) {
            const dentistReservations = listing.reservations.map(res => {
                const firstName =
                    res &&
                    res.reservedBy &&
                    res.reservedBy.user &&
                    res.reservedBy.user.firstName;
                const lastName =
                    res &&
                    res.reservedBy &&
                    res.reservedBy.user &&
                    res.reservedBy.user.lastName;
                const listingTime = formatListingTime(
                    res.startTime,
                    res.endTime
                );

                return `Dr. ${firstName} ${lastName}  -  ${listingTime}`;
            });

            return generateListItems(dentistReservations);
        } else {
            return '';
        }
    }

    renderDetails(reservationsAvailable, listing) {
        if (!reservationsAvailable) {
            return (
                <ExpansionPanelDetails>
                    <Grid container spacing={16}>
                        <Grid item xs={12}>
                            <Typography variant="title">
                                Reservations for this listing:
                            </Typography>
                            <div>{this.renderReservationList(listing)}</div>
                        </Grid>
                    </Grid>
                </ExpansionPanelDetails>
            );
        } else {
            return (
                <ExpansionPanelDetails>
                    <Grid container justify="space-between" alignItems="center">
                        <Grid item xs={12} md={8}>
                            <Grid container direction="column">
                                <Typography>
                                    {`Listing Price - ${renderPrice(
                                        listing.chairHourlyPrice
                                    )}/hr`}
                                </Typography>
                                <Margin vertical={2} />
                                <Typography>
                                    {`Available Chairs - ${
                                        listing.numChairsAvailable
                                    }`}
                                </Typography>
                            </Grid>
                        </Grid>
                        {listing &&
                            listing.reservations &&
                            listing.reservations.length === 0 && (
                            <Grid item xs={12} md={4}>
                                <Button
                                    onClick={this.confirmDeleteListing.bind(
                                        this,
                                        listing
                                    )}
                                >
                                    <Grid
                                        container
                                        wrap="nowrap"
                                        alignItems="center"
                                        justify="flex-end"
                                    >
                                        <Typography color="black">
                                            <i className="material-icons tiny">
                                                    delete_forever
                                            </i>
                                        </Typography>
                                        <Padding horizontal={6} />
                                        <Typography size="t5" color="black">
                                                Delete Listing
                                        </Typography>
                                    </Grid>
                                </Button>
                            </Grid>
                        )}
                        {listing &&
                            listing.reservations &&
                            listing.reservations.length > 0 && (
                            <Grid item xs={12}>
                                <Margin vertical={10} />
                                <Divider />
                                <Margin vertical={10} />

                                <Typography variant="title">
                                        Reservations for this listing:
                                </Typography>
                                <div>
                                    {this.renderReservationList(listing)}
                                </div>
                            </Grid>
                        )}
                    </Grid>
                </ExpansionPanelDetails>
            );
        }
    }

    checkAvailability(listing) {
        const filteredReservations = listing.reservations.filter(
            res => res.status === ACTIVE
        );
        const timeSlots = calculateTimeslots(listing, filteredReservations);

        const openSlots = timeSlots.filter(
            durationToNext => durationToNext >= 60
        );
        return !!openSlots.length;
    }

    render() {
        const { listing, index, expandListing, expanded } = this.props;
        const reservationsAvailable = this.checkAvailability(listing);

        return (
            <ExpansionPanel
                expanded={expanded === `panel${index}`}
                onChange={expandListing(`panel${index}`)}
            >
                <ExpansionPanelSummary
                    expandIcon={
                        <i className="material-icons">keyboard_arrow_down</i>
                    }
                >
                    <Grid container justify="space-between">
                        <Typography>
                            {formatListingTime(
                                listing.startTime,
                                listing.endTime
                            )}
                        </Typography>
                        {reservationsAvailable ? (
                            <Chip label="Available" />
                        ) : (
                            <Chip label="Reserved" />
                        )}
                    </Grid>
                </ExpansionPanelSummary>
                {this.renderDetails(reservationsAvailable, listing)}
            </ExpansionPanel>
        );
    }
}

export default OfficeListing;
