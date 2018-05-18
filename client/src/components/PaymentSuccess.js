import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import queryString from 'query-string';
import styled from 'styled-components';

import * as actions from '../actions';

const Container = styled.div`
    max-width: 768px;
    width: 100%;
    height: calc(100vh - 64px);
    margin: 100px auto;
`;

class PaymentSuccess extends Component {
    componentDidMount() {
        const params = queryString.parse(this.props.location.search);
        const { listing_id } = params;

        this.props.getListing(listing_id);
    }

    renderTime = time => {
        const [opening, closing] = time
            .substring(1, time.length - 1)
            .split(',');

        return `${opening} - ${closing}`;
    };

    renderDate = date => {
        return moment(date).format('ll');
    };

    render() {
        const { location, listing } = this.props;
        const params = queryString.parse(location.search);
        const { date, time } = params;

        if (!listing) {
            return <div>Loading...</div>;
        }

        return (
            <Container>
                <div className="row">
                    <div className="col s12">
                        <h4>Thank you! Your reservation is confirmed.</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <div className="card">
                            <div className="card-content">
                                <div className="row">
                                    <div className="col s12 m4">
                                        <img
                                            src={listing.office.imageUrls[0] || 'http://via.placeholder.com/250x250'}
                                            alt="office"
                                        />
                                    </div>
                                    <div className="col s12 m8">
                                        <div className="row">
                                            <div className="col s12">
                                                <div className="card-title">
                                                    {listing.office.name}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col s12">
                                                <h6 className="valign-wrapper">
                                                    <i class="material-icons listing_card__detail_icon">
                                                        location_on
                                                    </i>
                                                    Location: {listing.office.location}
                                                </h6>
                                            </div>
                                            <div className="col s12">
                                                <h6 className="valign-wrapper">
                                                    <i class="material-icons listing_card__detail_icon">
                                                        access_time
                                                    </i>
                                                    Time: {this.renderTime(time)}
                                                </h6>
                                            </div>

                                            <div className="col s12">
                                                <h6 className="valign-wrapper">
                                                    <i class="material-icons listing_card__detail_icon">
                                                        date_range
                                                    </i>
                                                    Date: {this.renderDate(date)}
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12 center-align">
                                <Link to={'/'} className="btn-large">
                                    Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        listing: state.listings.selected,
    };
}

export default connect(mapStateToProps, actions)(PaymentSuccess);
