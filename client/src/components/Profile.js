import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactFilestack from 'filestack-react';
import moment from 'moment';

import ReviewContainer from './ReviewContainer';
import PatientAppointments from './PatientAppointments';
import { filestackKey } from '../config/keys';
import UserOfficeIndex from './UserOfficeIndex';
import * as actions from '../actions';
import {
    USER,
    OFFICES,
    LISTINGS,
    RESERVATIONS,
    REVIEWS,
    RESERVED_BY,
    HOST_ID
} from '../util/strings';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: false };

        this.loadOffices = this.loadOffices.bind(this);
    }

    componentWillMount() {
        this.loadDentist();
    }

    async loadDentist() {
        const { auth } = this.props;
        if (!auth.dentist) {
            return null;
        }
        this.setState({ isLoading: true });
        await this.props.getDentist(
            auth.dentist.id,
            USER,
            OFFICES,
            LISTINGS,
            RESERVATIONS,
            REVIEWS
        );
        const { dentist } = this.props;
        this.setState({ isLoading: false });
        return dentist;
    }

    async loadOffices() {
        this.setState({ isLoading: true });
        const { auth } = this.props;
        if (!auth.dentist) {
            return null;
        }
        await this.props.queryOffices(HOST_ID, auth.dentist.id);
        const { offices } = this.props;
        this.setState({ isLoading: false });
        return offices;
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
                    apikey={filestackKey}
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

                <Link className="link" to={`/payment-history`}>
                    View payment history
                </Link>

                <Link className="link" to={'/office/search'}>
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
                            to={'/office/search'}
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
                    to={`/office/${reservation.office.id}`}
                >
                    <div className="office_detail">
                        <img src={reservation.office.imageUrls[0]} alt="" />
                        <h6>{reservation.office.name}</h6>
                    </div>
                </Link>
                <div className="content">
                    <Link
                        className="blue-text text-darken-2"
                        to={`/office/${reservation.office.id}/listing/${
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
        const { auth, dentistLoading, dentist, reviews, offices } = this.props;
        if (this.state.isLoading || dentistLoading) {
            return <div />;
        }

        if (dentistLoading) return <div className="stretch_height"></div>;

        return (
            <div className="profile_container stretch_height">
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
                            <UserOfficeIndex
                                offices={offices}
                                dentist={dentist}
                                reloadOffices={this.loadOffices}
                            />
                        </div>
                    ) : (
                        ''
                    )}
                    {auth.dentist ? (
                        <div className="offices profile-section">
                            <h5>Upcoming Reservations</h5>
                            {this.renderReservations()}
                        </div>
                    ) : (
                        ''
                    )}
                    {!auth.dentist && (
                        <PatientAppointments patientId={auth.id} />
                    )}
                    {auth.dentist &&
                        !!reviews.length && (
                        <div className="reviews profile-section">
                            <h5>{`Reviews for ${auth.name}`}</h5>
                            <ReviewContainer
                                revieweeId={dentist.id}
                                revieweeName={auth.name}
                                reviews={reviews}
                            />
                        </div>
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
        reservations: state.reservations.all,
        listings: state.listings.all,
        reviews: state.reviews.all
    };
}
export default connect(mapStateToProps, actions)(Profile);
