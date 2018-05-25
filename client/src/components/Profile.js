import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactFilestack from 'filestack-react';
import moment from 'moment';

import ReviewContainer from './ReviewContainer';
import * as actions from '../actions';
import {
    USER,
    OFFICES,
    LISTINGS,
    RESERVATIONS,
    REVIEWS,
    HOST_ID,
    RESERVED_BY
} from '../util/strings';

class Profile extends Component {
    componentWillMount() {
        this.loadDentist();
    }

    async loadDentist() {
        const { auth } = this.props;
        if (!auth.dentist) {
            return null;
        }
        await this.props.getDentist(
            auth.dentist.id,
            USER,
            OFFICES,
            LISTINGS,
            RESERVATIONS,
            REVIEWS
        );
        const { dentist } = this.props;
        return dentist;
    }

    renderProfileDetails() {
        const { auth, dentist } = this.props;
        return (
            <div>
                <h4>Welcome back {auth.name}!</h4>
                <p>
                    {`${
                        dentist && dentist.location
                            ? `${dentist.location} - `
                            : ''
                    }Member since ${moment(auth.date_created).format(
                        'MMMM `YY'
                    )}`}
                </p>
            </div>
        );
    }

    // TODO access listings from office object instead
    getSortedListings(office) {
        const { listings } = this.props;
        if (listings && listings.length) {
            let filteredListings = listings.filter(
                listing => listing.office.id === office.id
            );

            filteredListings = filteredListings.sort((listing_a, listing_b) =>
                moment(listing_a.startTime).isAfter(moment(listing_b.startTime))
            );

            if (filteredListings.length === 0) {
                return (
                    <li>
                        <strong>No listings available</strong>
                    </li>
                );
            }

            filteredListings = filteredListings.map((listing, index) => (
                <li className="profile_listing" key={index}>
                    <div className="listing_content">
                        <Link
                            className="blue-text text-darken-2"
                            to={`/offices/${office.id}/listings/${listing.id}`}
                        >
                            <p>
                                {moment(listing.startTime).format(
                                    'MMM D, h:mm a - '
                                )}
                                {moment(listing.endTime).format('h:mm a')}
                            </p>
                        </Link>
                        <div className="listing_btns">
                            <Link
                                className="btn-small light-blue lighten-2"
                                to={`/offices/${office.id}/listings/${
                                    listing.id
                                }/edit`}
                            >
                                <i className="material-icons">edit</i>
                            </Link>
                            <button
                                type="button"
                                onClick={this.deleteListing.bind(this, listing)}
                                className="btn-small red lighten-2"
                            >
                                <i className="material-icons">delete_forever</i>
                            </button>
                        </div>
                    </div>
                </li>
            ));

            return filteredListings;
        }
        return [];
    }

    async deleteOffice(office) {
        // eslint-disable-next-line
        if (confirm(`Delete ${office.name} and all associated listings?`)) {
            await this.props.deleteOffice(office.id);
            await this.props.queryOffices(HOST_ID, office.id);
        }
    }

    async deleteListing(listing) {
        if (
            // eslint-disable-next-line
            confirm(
                `Delete listing for ${moment(listing.startTime).format(
                    'MMM D, h a'
                )}?`
            )
        ) {
            await this.props.deleteListing(listing.id);
            await this.props.queryListings(HOST_ID, this.props.dentist.id);
            await this.props.queryReservations(
                RESERVED_BY,
                this.props.dentist.id
            );
        }
    }

    // TODO create a component for profile offices, apply this to other
    // dentist fields
    renderUserOffices() {
        const { offices } = this.props;

        let userOffices = offices;

        if (!userOffices) {
            return;
        }

        if (!userOffices.length) {
            return (
                <div>
                    {'No offices yet - '}
                    <Link
                        className="blue-text text-darken-2"
                        to={'/offices/new'}
                    >
                        create a new office to begin hosting today
                    </Link>
                </div>
            );
        }

        return userOffices.map((office, index) => {
            const officeListings = this.getSortedListings(office);
            return (
                <div className="office card-panel" key={index}>
                    <div className="office_header">
                        <Link
                            className="blue-text text-darken-2"
                            to={`/offices/${office.id}`}
                        >
                            <h5>{office.name}</h5>
                        </Link>
                        <div className="office_btns">
                            <Link
                                className="btn-small light-blue lighten-2 waves-effect"
                                to={`/offices/${office.id}/edit`}
                            >
                                Edit Office
                            </Link>
                            <button
                                type="button"
                                onClick={this.deleteOffice.bind(this, office)}
                                className="btn-small red lighten-2"
                            >
                                <i className="material-icons">delete_forever</i>
                            </button>
                        </div>
                    </div>
                    <p>{office.location}</p>
                    <h6>Upcoming listings:</h6>
                    <ul className="profile_listings browser-default">
                        {officeListings}
                    </ul>
                </div>
            );
        });
    }

    renderActions() {
        const { dentist } = this.props;
        const dentistProfileExists =
            dentist && Object.keys(dentist).length !== 0;

        return (
            <ul className="collection">
                {/* Display Create if no dentist profile or Edit if profile exists */}
                {dentistProfileExists ? (
                    <Link className="link" to={'/dentist/edit'}>
                        Edit Dentist Profile
                    </Link>
                ) : (
                    <Link className="link red-text" to={'/dentist/new'}>
                        Create Dentist Profile
                    </Link>
                )}

                <ReactFilestack
                    apikey={'Aj4gwfCaTS2Am35P0QGrbz'}
                    buttonText="Upload New Image"
                    buttonClass="link"
                    options={{
                        accept: ['image/*'],
                        imageMin: [300, 300],
                        fromSources: [
                            'local_file_system',
                            'url',
                            'imagesearch',
                            'facebook',
                            'instagram'
                        ],
                        storeTo: { container: 'user-photos' }
                    }}
                    onSuccess={result => this.setNewProfileImage(result)}
                />

                {dentistProfileExists ? (
                    <Link className="link" to={`/dentist/${dentist.id}`}>
                        View public profile
                    </Link>
                ) : (
                    ''
                )}

                {dentistProfileExists ? (
                    <Link className="link" to={'/offices/new'}>
                        Create a new office
                    </Link>
                ) : (
                    ''
                )}

                {dentistProfileExists ? (
                    <Link className="link" to={'/listings/new'}>
                        Create a new listing
                    </Link>
                ) : (
                    ''
                )}

                <Link className="link" to={'/offices/search'}>
                    Browse listings
                </Link>
            </ul>
        );
    }

    setNewProfileImage(result) {
        const upload = result.filesUploaded[0];
        const userId = this.props.auth.id;
        if (upload) {
            this.props.updateProfileImage(userId, upload.url);
        }
    }

    renderOptions = max => {
        const options = [];
        for (let i = 0; i <= max; i++) {
            options.push(
                <option value={Number(i)} key={i}>
                    {i}
                </option>
            );
        }
        return options;
    };

    async cancelReservation(reservation) {
        if (
            // eslint-disable-next-line
            confirm(
                `Delete reservation for ${moment(reservation.startTime).format(
                    'MMM D, h a'
                )}?`
            )
        ) {
            await this.props.cancelReservation(reservation.id);
            await this.props.queryReservations(
                RESERVED_BY,
                this.props.dentist.id
            );
        }
    }

    renderReservations() {
        const { reservations } = this.props;

        if (!reservations) {
            return;
        }
        if (reservations.length === 0) {
            return (
                <div>
                    <h6>
                        {'No reservations yet - '}
                        <Link
                            className="blue-text text-darken-2"
                            to={'/offices/search'}
                        >
                            search for new listings and make a reservation
                        </Link>
                    </h6>
                </div>
            );
        }

        return reservations.map((reservation, index) => (
            <div key={index} className="reservation card-panel grey lighten-5">
                <Link
                    className="blue-text text-darken-2"
                    to={`/offices/${reservation.office.id}`}
                >
                    <div className="office_detail">
                        <img src={reservation.office.imageUrls[0]} alt="" />
                        <h6>{reservation.office.name}</h6>
                    </div>
                </Link>
                <div className="content">
                    <Link
                        className="blue-text text-darken-2"
                        to={`/offices/${reservation.office.id}/listings/${
                            reservation.listing.id
                        }`}
                    >
                        <p>
                            {moment(reservation.startTime).format(
                                'MMM D, h:mm a - '
                            )}
                            {moment(reservation.endTime).format('h:mm a')}
                        </p>
                    </Link>
                    <h6
                        onClick={this.cancelReservation.bind(this, reservation)}
                        className="red-text valign-wrapper"
                        style={{ cursor: 'pointer' }}
                    >
                        <i
                            className="material-icons"
                            style={{ fontSize: '18px' }}
                        >
                            delete_forever
                        </i>
                        Cancel Reservation
                    </h6>
                </div>
            </div>
        ));
    }

    render() {
        const { auth, dentistLoading, dentist, reviews } = this.props;

        // TODO consider reducing number of conditions
        if (dentistLoading) return <div>Loading...</div>;
        return (
            <div className="profile_container">
                <div className="sidebar">
                    <img
                        className="profile_img"
                        src={auth.imageUrl}
                        alt="user"
                    />
                    {this.renderActions()}
                </div>
                <div className="main">
                    {this.renderProfileDetails()}
                    {dentist ? (
                        <div className="offices profile-section">
                            <h5>Your Offices</h5>
                            {this.renderUserOffices()}
                        </div>
                    ) : (
                        ''
                    )}
                    {dentist ? (
                        <div className="offices profile-section">
                            <h5>Upcoming Reservations</h5>
                            {this.renderReservations()}
                        </div>
                    ) : (
                        ''
                    )}
                    {dentist ? (
                        <div className="reviews profile-section">
                            <h5>{`Reviews for ${auth.name}`}</h5>
                            <ReviewContainer
                                revieweeId={dentist.id}
                                revieweeName={auth.name}
                                reviews={reviews}
                            />
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        dentist: state.dentists.selectedDentist,
        offices: state.offices.all,
        reservations: state.reservations.selected,
        listings: state.listings.all,
        reviews: state.reviews.all
    };
}
export default connect(mapStateToProps, actions)(Profile);
