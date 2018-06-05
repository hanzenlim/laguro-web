import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import moment from 'moment';

import { Chip, Typography, Grid, Button } from './common';
import { Padding } from './common/Spacing';
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
            this.props.deleteListing(listing);
        }
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

    renderDetails(reservationsExist, listing, office) {
        if (reservationsExist) {
            return (
                <ExpansionPanelDetails>
                    <Grid container spacing={16}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="title">
                                Selected Staff
                            </Typography>
                            <div>
                                <List>
                                    {this.generateListItems(
                                        listing.staffAvailable
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
                                    {this.generateListItems(office.equipment)}
                                </List>
                            </div>
                        </Grid>
                    </Grid>
                </ExpansionPanelDetails>
            );
        } else {
            return (
                <ExpansionPanelDetails>
                    <Grid container justify="space-between" alignItems="center">
                        <Typography>
                            {`Listing Price - $${listing.chairHourlyPrice.toFixed(
                                2
                            )}`}
                        </Typography>
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
                                justify="flex-start"
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
                </ExpansionPanelDetails>
            );
        }
    }

    render() {
        const { office, listing, index, expandListing, expanded } = this.props;
        const reservationsExist = listing.reservations.length > 0;

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
                {this.renderDetails(reservationsExist, listing, office)}
            </ExpansionPanel>
        );
    }
}

export default OfficeListing;
