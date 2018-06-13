import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactFilestack from 'filestack-react';
import moment from 'moment';
import { Modal } from './common';
import ReviewContainer from './ReviewContainer';
import PatientAppointments from './PatientAppointments';
import UserOfficeIndex from './UserOfficeIndex';
import UserReservationIndex from './UserReservationIndex';
import CreateDentistProfile from './forms/CreateDentistProfile';
import { filestackKey } from '../config/keys';
import * as actions from '../actions';
import {
    USER,
    OFFICES,
    LISTINGS,
    RESERVATIONS,
    REVIEWS,
    HOST_ID
} from '../util/strings';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isModalOpen: false
        };

        this.loadOffices = this.loadOffices.bind(this);
        this.handleCreateDentist = this.handleCreateDentist.bind(this);
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

    handleCreateDentist() {
        this.setState({ isModalOpen: true });
    }

    closeModal = () => {
        this.setState({ isModalOpen: false });
    };

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
                    <a
                        className="link red-text"
                        onClick={this.handleCreateDentist}
                    >
                        Create Dentist Profile
                    </a>
                )}

                <Modal
                    closable
                    open={this.state.isModalOpen}
                    onClose={this.closeModal}
                >
                    <CreateDentistProfile
                        handleSubmission={this.closeModal.bind(this)}
                    />
                </Modal>

                <ReactFilestack
                    apikey={filestackKey}
                    buttonText="Upload New Image"
                    buttonClass="link blue-text text-lighten-1"
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

                {dentistProfileExists ? (
                    <Link className="link" to={'/office/search'}>
                        Browse listings
                    </Link>
                ) : (
                    <Link className="link" to={'/dentist/search'}>
                        Browse dentists
                    </Link>
                )}
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

    render() {
        const {
            auth,
            dentistLoading,
            dentist,
            reviews,
            reservations,
            offices
        } = this.props;
        if (this.state.isLoading || dentistLoading) {
            return <div />;
        }

        if (dentistLoading) return <div className="stretch_height" />;

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
                    {auth.dentist ? (
                        <div className="offices profile-section">
                            <h5>Your Offices</h5>
                            <UserOfficeIndex
                                offices={offices}
                                dentist={auth.dentist}
                                reloadOffices={this.loadOffices}
                            />
                        </div>
                    ) : (
                        ''
                    )}
                    {auth.dentist ? (
                        <div className="offices profile-section">
                            <h5>Upcoming Reservations</h5>
                            <UserReservationIndex
                                reservations={reservations}
                                dentist={auth.dentist}
                            />
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
