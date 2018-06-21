import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import moment from 'moment';

import { generateListItems } from './forms/sharedComponents';
import { Chip, Typography, Grid, Button } from './common';
import { Padding, Margin } from './common/Spacing';
import { formatListingTime } from '../util/timeUtil';

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

    renderDetails(reservationsExist, listing) {
        if (reservationsExist) {
            return (
                <ExpansionPanelDetails>
                    <Grid container spacing={16}>
                        <Grid item xs={12}>
                            <Typography variant="title">
                                Reservations for this listing:
                            </Typography>
                            <div>
                                {generateListItems(
                                    listing.reservations.map(
                                        res =>
                                            `Dr. ${
                                                res.reservedBy.user.name
                                            }  -  ${formatListingTime(
                                                res.startTime,
                                                res.endTime
                                            )}`
                                    )
                                )}
                            </div>
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
                                    {`Listing Price - $${listing.chairHourlyPrice.toFixed(
                                        2
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
                    </Grid>
                </ExpansionPanelDetails>
            );
        }
    }

    render() {
        const { office, listing, index, expandListing, expanded } = this.props;
        const reservationsExist = listing.reservations.length > 0;
        const reservations = listing.reservations;

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
                        {reservationsExist ? (
                            <Chip label="Reserved" />
                        ) : (
                            <Chip label="Available" />
                        )}
                    </Grid>
                </ExpansionPanelSummary>
                {this.renderDetails(
                    reservationsExist,
                    listing,
                    office,
                    reservations
                )}
            </ExpansionPanel>
        );
    }
}

export default OfficeListing;