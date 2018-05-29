import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import ReactStars from 'react-stars';

import ReservationOptions from './forms/ReservationOptions';
import * as actions from '../actions';

// TODO change route to just be /listings:id and not /office/listings
// with graphql integration, latter is unnecessary
class OfficeResultIndex extends Component {
    componentDidMount() {
        this.listing_id = this.props.match.params.id;

        this.props.getListing(this.listing_id);
    }

    renderEquipment(office) {
        if (office.equipment && office.equipment.length) {
            return office.equipment.map(equipment => (
                <li className="listingRow" key={equipment.name}>
                    {equipment.name} - ${equipment.price}
                </li>
            ));
        }
        return <li className="listingRow">No Equipment Available</li>;
    }

    renderStaff(listing) {
        if (listing.staffAvailable && listing.staffAvailable.length) {
            return listing.staffAvailable.map(staff => (
                <li className="listingRow" key={staff.role}>
                    {staff.role} - ${staff.price} ({staff.count} available)
                </li>
            ));
        }
        return <li className="listingRow">No Staff Available</li>;
    }

    renderImages(office) {
        if (office.imageUrls && office.imageUrls.length) {
            return office.imageUrls.map(url => (
                <img className="officeImg" key={url} src={url} alt="office" />
            ));
        }
    }

    openModal(modal_id) {
        const modal = document.getElementById(modal_id);
        const modal_overlay = document.getElementById('modal-overlay');
        modal.classList.add('open');
        modal_overlay.classList.add('open');
    }

    closeModals() {
        const modals = document.getElementsByClassName('modal');
        const modal_overlay = document.getElementById('modal-overlay');
        for (const modal of modals) {
            modal.classList.remove('open');
        }
        modal_overlay.classList.remove('open');
    }

    handleBookNow = () => {
        const { auth } = this.props;

        if (auth) {
            this.openModal('reservation_options');
        } else {
            this.props.toggleLoginModal();
        }
    };

    render() {
        const { listing, auth } = this.props;
        // if dentist still hasn't loaded, wait for render
        if (!listing) {
            return <div>Loading...</div>;
        }
        const { office } = listing;
        const { reviews } = office;
        
        // Disable book now button if listing has been reserved or
        // if user does not have a dentit profile.
        const disableBookNowBtn = !!listing.reservations.length || (auth && !auth.dentist)

        // calculate avg rating
        if (reviews && reviews.length) {
            this.avg_rating =
                reviews
                    .map(review => review.rating)
                    .reduce((acc, rating) => acc + rating, 0) / reviews.length;
            this.rating_count = reviews.length;
        } else {
            this.avg_rating = 0;
            this.rating_count = 0;
        }

        this.formatted_time =
            moment(listing.startTime).format('MMM D, h:mm a - ') +
            moment(listing.endTime).format('h:mm a');

        return (
            <div className="listing">
                <div className="officeImgs">{this.renderImages(office)}</div>

                <div className="listingDetails">
                    <div className="listingHeader">
                        <div>
                            <h3>{office.name}</h3>
                            <h5>{office.location}</h5>
                            <blockquote>
                                <h6>Rental Window: {this.formatted_time}</h6>
                                {listing.reservations.length ? (
                                    <span className="red-text">
                                        This listing has been reserved
                                    </span>
                                ) : (
                                    ''
                                )}
                            </blockquote>
                        </div>
                        <Link
                            className="btn light-blue lighten-2 waves-effect"
                            to={'/office/search'}
                        >
                            Go back to listings
                        </Link>
                    </div>

                    <div className="availableRow">
                        <div>
                            <h5>Staff Available</h5>
                            {this.renderStaff(listing)}
                        </div>
                        <div>
                            <h5>Equipment Available</h5>
                            {this.renderEquipment(office)}
                        </div>
                    </div>

                    <div>
                        {
                            // TODO still need to verify misc fees
                        }
                        <h6>
                            Cleaning Fee - ${listing.cleaning_fee
                                ? listing.cleaning_fee
                                : 10}
                        </h6>
                        <h6>Rental Charge - 15%</h6>
                    </div>
                </div>

                <div
                    id="reservation_options"
                    className="modal"
                    style={{ overflow: 'scroll' }}
                >
                    <ReservationOptions
                        listing={listing}
                        office={office}
                        auth={this.props.auth}
                    />
                </div>
                <div
                    id="modal-overlay"
                    onClick={() => {
                        this.closeModals();
                    }}
                />

                <div className="bookNow">
                    <div className="content">
                        <div>
                            <p>
                                ${listing.chairHourlyPrice}{' '}
                                <small>hourly per chair</small>
                            </p>
                            <div className="rating">
                                <ReactStars
                                    count={5}
                                    value={this.avg_rating}
                                    size={10}
                                />
                                <small>{`(${this.rating_count})`}</small>
                            </div>
                        </div>
                        <div className="right-align">
                            <button
                                className="btn red lighten-2 waves-effect"
                                onClick={this.handleBookNow}
                                disabled={disableBookNowBtn}
                            >
                                Book Now
                            </button>
                            {auth &&
                                !auth.dentist && (
                                <p className="red-text">
                                        Please create a dentist profile
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        listing: state.listings.selected,
        auth: state.auth
    };
}

export default connect(mapStateToProps, actions)(OfficeResultIndex);
