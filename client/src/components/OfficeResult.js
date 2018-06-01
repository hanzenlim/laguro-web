import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import ReactStars from 'react-stars';
import styled from 'styled-components';

import { Typography, Card, Grid, Link } from './common';
import { Padding } from './common/Spacing';

const Container = styled(Card)`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
`;

const ImageContainer = styled.div`
    height: 120px;
    width: 164px;
`;

const Image = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
`;

const AvailableTime = styled(Link)`
    min-height: 17px;
    height: auto;
    display: flex;
    align-items: center;
    background-color: #c8c7c7;
    border-radius: 2px;
    margin: 0 6px 4px 0;
    padding: 0 4px;

    &:hover {
        background-color: #f46b13;
    }
`;

const DetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
`;

class OfficeResult extends Component {
    renderTimes(listings) {
        if (listings) {
            const filteredListings = listings.filter(
                listing => !listing.reserved_by
            );

            if (filteredListings.length === 0) {
                return (
                    <div className="valign-wrapper">
                        <small>No times available</small>
                    </div>
                );
            }
            return filteredListings.map(listing => (
                <AvailableTime
                    key={listing.id}
                    onClick={e => e.stopPropagation()}
                    to={`/office/${listing.officeId}/listing/${listing.id}`}
                >
                    <Typography size="t3" weight="regular" color="white">
                        {moment(listing.time_available).format('MMM D, h a')}
                    </Typography>
                </AvailableTime>
            ));
        }
        return <div />;
    }

    imgUrl() {
        return this.props.img
            ? this.props.img
            : 'http://via.placeholder.com/200x200';
    }

    render() {
        return (
            <Link
                className="blue-text text-darken-2"
                to={`/office/${this.props.office_id}`}
            >
                <Container>
                    <Grid container>
                        <Grid item>
                            <Padding right={5}>
                                <ImageContainer>
                                    <Image src={this.imgUrl()} alt="Office" />
                                </ImageContainer>
                            </Padding>
                        </Grid>

                        <Grid item xs>
                            <DetailsContainer>
                                <Grid container>
                                    <Typography
                                        size="t2"
                                        weight="bold"
                                        color="black"
                                    >
                                        {this.props.name}
                                    </Typography>
                                </Grid>
                                <Padding bottom={5} />
                                <Grid container>
                                    <Typography
                                        size="t3"
                                        weight="regular"
                                        color="black"
                                    >
                                        {this.props.location}
                                    </Typography>
                                </Grid>
                                <Padding bottom={5} />
                                <Grid container alignItems="center">
                                    <ReactStars
                                        count={5}
                                        size="10"
                                        edit={false}
                                        value={this.props.avg_rating}
                                    />
                                    <Padding right={7} />
                                    <Typography
                                        size="t3"
                                        weight="regular"
                                        color="black"
                                    >{`(${
                                            this.props.rating_count
                                        }) Reviews`}</Typography>
                                </Grid>
                                <Padding bottom={7} />
                                <Grid container>
                                    <Typography
                                        size="t3"
                                        weight="regular"
                                        color="black"
                                    >
                                        Available Times:
                                    </Typography>
                                </Grid>
                                <Padding bottom={5} />
                                <Grid container>
                                    {this.renderTimes(this.props.listings)}
                                </Grid>
                            </DetailsContainer>
                        </Grid>
                    </Grid>
                </Container>
            </Link>
        );
    }
}

export default connect(null)(OfficeResult);
