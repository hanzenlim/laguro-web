import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ReactStars from 'react-stars';

import OfficeListing from './OfficeListing';
import { Typography, Grid, Button } from './common';
import { Padding } from './common/Spacing';

class UserOffice extends Component {
    state = {
        expanded: null
    };

    handleExpansion = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false
        });
    };

    getSortedListings(office) {
        if (!office || !office.listings || !office.listings.length) {
            return (
                <li>
                    <strong>No listings available</strong>
                </li>
            );
        }

        let sortedListings = office.listings.sort((listing_a, listing_b) =>
            moment(listing_a.startTime).isAfter(moment(listing_b.startTime))
        );

        return sortedListings.map((listing, index) => (
            <OfficeListing
                listing={listing}
                office={office}
                key={listing.id}
                index={index}
                deleteListing={this.props.deleteListing}
                expandListing={this.handleExpansion}
                expanded={this.state.expanded}
            />
        ));
    }

    confirmDeleteOffice(office) {
        // eslint-disable-next-line
        if (confirm(`Delete ${office.name} and all associated listings?`)) {
            this.props.deleteOffice(office);
        }
    }

    calculateAverageRating(reviews) {
        this.avg_rating =
            reviews
                .map(review => review.rating)
                .reduce((acc, rating) => acc + rating, 0) / reviews.length;
        this.rating_count = reviews.length;
    }

    render() {
        const { office } = this.props;
        const { reviews } = office;

        if (reviews && reviews.length) {
            this.calculateAverageRating(reviews);
        } else {
            this.avg_rating = 0;
            this.rating_count = 0;
        }

        const officeListings = this.getSortedListings(office);
        return (
            <Grid container withborder="true" direction="column">
                <Padding horizontal={20} vertical={10}>
                    <Grid container direction="column">
                        <Grid container wrap="nowrap" justify="space-between">
                            <Grid item xs={9}>
                                <Grid container direction="column">
                                    <Link
                                        className="blue-text text-darken-2"
                                        to={`/office/${office.id}`}
                                    >
                                        <Typography color="black" size="t2">
                                            {office.name}
                                        </Typography>
                                    </Link>
                                    <Typography size="t4">
                                        {office.location}
                                    </Typography>
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
                                            <small>{`${
                                                this.rating_count
                                            } Reviews`}</small>
                                        </Padding>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={3}>
                                <Grid
                                    container
                                    direction="column"
                                    alignItems="center"
                                >
                                    <Link
                                        to={`/listing/new`}
                                        style={{ width: '100%' }}
                                    >
                                        <Grid
                                            container
                                            wrap="nowrap"
                                            alignItems="center"
                                            justify="flex-start"
                                        >
                                            <Typography color="black">
                                                <i className="material-icons tiny">
                                                    playlist_add
                                                </i>
                                            </Typography>
                                            <Padding horizontal={6} />
                                            <Typography size="t5" color="black">
                                                Add Listing
                                            </Typography>
                                        </Grid>
                                    </Link>
                                    <Link
                                        to={`/office/${office.id}/edit`}
                                        style={{ width: '100%' }}
                                    >
                                        <Grid
                                            container
                                            wrap="nowrap"
                                            alignItems="center"
                                            justify="flex-start"
                                        >
                                            <Typography color="black">
                                                <i className="material-icons tiny">
                                                    edit
                                                </i>
                                            </Typography>
                                            <Padding horizontal={6} />
                                            <Typography size="t5" color="black">
                                                Edit Office
                                            </Typography>
                                        </Grid>
                                    </Link>
                                    <Button
                                        disabled={!!officeListings.length}
                                        onClick={this.confirmDeleteOffice.bind(
                                            this,
                                            office
                                        )}
                                        style={{ width: '100%', padding: 0 }}
                                    >
                                        <Grid
                                            container
                                            wrap="nowrap"
                                            alignItems="center"
                                            justify="flex-start"
                                        >
                                            <Typography>
                                                <i className="material-icons tiny">
                                                    delete_forever
                                                </i>
                                            </Typography>
                                            <Padding horizontal={6} />
                                            <Typography size="t5">
                                                Delete
                                            </Typography>
                                        </Grid>
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Padding vertical={8} />

                        <Typography size="t3" weight="bold">
                            Upcoming listings:
                        </Typography>

                        <Padding vertical={4} />

                        <Grid>{officeListings}</Grid>
                    </Grid>

                    <Padding vertical={6} />
                </Padding>
            </Grid>
        );
    }
}

export default UserOffice;
