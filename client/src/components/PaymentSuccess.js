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
        const { reservationId } = params;

        this.props.getReservation(reservationId);
    }

    renderTime = (startTime, endTime) => {
        return `${moment(startTime).format('h:mm a')} - ${moment(
            endTime
        ).format('h:mm a')}`;
    };

    renderDate = startDate => {
        return moment(startDate).format('ll');
    };

    render() {
        const { reservation } = this.props;

        if (!reservation || !reservation.office) {
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
                                            src={
                                                reservation.office
                                                    .imageUrls[0] ||
                                                'http://via.placeholder.com/250x250'
                                            }
                                            alt="office"
                                        />
                                    </div>
                                    <div className="col s12 m8">
                                        <div className="row">
                                            <div className="col s12">
                                                <div className="card-title">
                                                    {reservation.office.name}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col s12">
                                                <h6 className="valign-wrapper">
                                                    <i className="material-icons listing_card__detail_icon">
                                                        location_on
                                                    </i>
                                                    Location:{' '}
                                                    {
                                                        reservation.office
                                                            .location
                                                    }
                                                </h6>
                                            </div>
                                            <div className="col s12">
                                                <h6 className="valign-wrapper">
                                                    <i className="material-icons listing_card__detail_icon">
                                                        access_time
                                                    </i>
                                                    Time:{' '}
                                                    {this.renderTime(
                                                        reservation.startTime,
                                                        reservation.endTime
                                                    )}
                                                </h6>
                                            </div>

                                            <div className="col s12">
                                                <h6 className="valign-wrapper">
                                                    <i className="material-icons listing_card__detail_icon">
                                                        date_range
                                                    </i>
                                                    Date:{' '}
                                                    {this.renderDate(
                                                        reservation.startTime
                                                    )}
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
        reservation: state.reservations.selected
    };
}

export default connect(mapStateToProps, actions)(PaymentSuccess);
